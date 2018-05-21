const { promisify } = require("util");
const { readFile } = require("fs");

async function load(filePath) {
  try {
    const file = await promisify(readFile)(filePath);
    const todos = file.toString().split(/\n/).filter(line => !/^\s*$/.test(line));
    if (todos.every(todo => /^\s*\[.\]/.test(todo))) {
      return { todos };
    }
    throw new Error(`Error reading file ${filePath} as todastic format.`);
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
