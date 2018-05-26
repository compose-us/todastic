const { promisify } = require("util");
const { readFile } = require("fs");

const STATUS_MAP = {
  "[ ]": "open",
  "[x]": "done",
  "[-]": "n/a"
};

async function load(filePath) {
  try {
    const file = await promisify(readFile)(filePath);
    const todos = file.toString().split(/\n/);
    const result = todos.reduce(
      (res, line) => {
        const matches = /^( *)(\[.\]) (.+?)((?!\\)\[.*)?$/.exec(line);
        if (!matches) {
          if (/^\s*$/.test(line)) {
            return res;
          } else {
            throw new Error(`Error reading file ${filePath} as todastic format.`);
          }
        }
        if (matches[1].length > res.lastLine + 2) {
          throw new Error(`Error reading file ${filePath} as todastic format.`);
        }

        const todo = getTodoFromLineInfo({ status: matches[2], title: matches[3], tags: matches[4] });
        res.todos.push(todo);
        res.lastLine = matches[1].length;

        return res;
      },
      { todos: [], lastLine: 0 }
    );

    const { lastLine, ...rest } = result;
    return rest;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File ${filePath} is missing or can not be found.`);
    }
    throw error;
  }
}

module.exports = {
  load
};

function getTodoFromLineInfo({ status, title, tags }) {
  return {
    status: extractStatusFromString(status),
    title: extractTitleFromString(title),
    tags: extractTagsFromString(tags)
  };
}

function extractStatusFromString(str) {
  const status = STATUS_MAP[str];
  if (!status) {
    throw new Error(`Cannot extract status from string '${str}'`);
  }

  return status;
}

function extractTitleFromString(str) {
  return str;
}

function extractTagsFromString(str) {
  if (!str) {
    return [];
  }

  const splittedTags = str.split(/\] \[/);
  const tags = splittedTags.map((tag, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === splittedTags.length - 1;
    return tag.slice(isFirst ? 1 : 0, isLast ? -1 : undefined);
  });
  return tags;
}
