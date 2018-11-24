const camelCase = require("lodash/camelCase");
const kebabCase = require("lodash/kebabCase");
const { readFileSync } = require("fs");
const { format, resolveConfig } = require("prettier");
const { basename, resolve } = require("path");
const upperFirst = require("lodash/upperFirst");

const takeoffStartMarker = "/* @takeoff-sorted start */";
const takeoffStopMarker = "/* @takeoff-sorted stop */";

const pascalCase = str => upperFirst(camelCase(str));

const prettify = ({ filename, template }) => {
  const prettierConfig = resolveConfig.sync(`${__dirname}/${basename(filename)}`, {
    editorconfig: true
  });

  return { filename, template: format(template, prettierConfig) };
};

const insertSorted = (filename, lineToAppend) => {
  const fileContent = readFileSync(resolve(filename))
    .toString()
    .trim();
  const indexOfMarkerStart = fileContent.indexOf(takeoffStartMarker);
  const indexOfHeaderStop = indexOfMarkerStart + takeoffStartMarker.length;
  const indexOfFooterStart = fileContent.indexOf(takeoffStopMarker);
  const header = fileContent.substring(0, indexOfHeaderStop);
  const footer = fileContent.substring(indexOfFooterStart);
  const generatedLines = fileContent.substring(indexOfHeaderStop, indexOfFooterStart);

  // 1. Ensure no empty lines in resulting lines array
  // 2. Remove line breaks or Array.sort will not sort correctly
  const lines = generatedLines
    .trim() /* 1 */
    .split(";\n")
    .map(statement => statement.replace(/\n\s*/g, " ")); /* 2 */
  lines.push(lineToAppend);
  lines.sort();

  return `${header}\n${lines.join(";\n")}\n${footer}`;
};

module.exports = { camelCase, insertSorted, kebabCase, pascalCase, prettify };
