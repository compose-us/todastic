import { extractLabels } from "../label-extractor";

export const stringifyLabel = label => {
  const labelObject = convertStringLabelToObject(label);
  const labelName = labelObject.name;
  const argsList = labelObject.args.length > 0 ? `(${labelObject.args.map(arg => JSON.stringify(arg)).join(",")})` : "";
  return `#${labelName}${argsList}`;
};

const convertStringLabelToObject = label => {
  if (typeof label === "string") {
    const matches = /(?:^#*)(.*$)/.exec(label);
    const labelName = matches[1];
    return extractLabels(`#${labelName}`).labels[0];
  }

  return label;
};
