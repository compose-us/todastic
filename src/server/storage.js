const { promisify } = require("util");
const { readFile } = require("fs");

async function load(filePath) {
  try {
    const file = await promisify(readFile)(filePath);
    const todos = file.toString().split(/\n/);
    const result = todos.reduce(
      (res, line) => {
        const matches = /^(\s*\[.\])/.exec(line);
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
        res.lastLine = matches[1].length;
        res.todos.push(line);
        return res;
      },
      { todos: [], lastLine: '[ ]'.length }
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
