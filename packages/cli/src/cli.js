#!/usr/bin/env node

const yargs = require("yargs");
const todastic = require("./todastic");

const argv = yargs
  .usage("Usage: $0 <command> [options]")
  .command("track <file>", "Tracks time from todos")
  .example("$0 track project.todo", "Sums up all tracked time in the 'project.todo' file.")
  .demandCommand(1, "You need to select a command")
  .help("h")
  .alias("h", "help")
  .epilog("Copyright 2018").argv;

run(argv);

async function run(argv) {
  const file = argv.file;
  console.log(`Tracked time for ${file}: ${await todastic(file).tracked()}`);
}
