import { extractLabels } from "./label-extractor.js";

export function extractDetails(inputString) {
  const { labels, text } = extractLabels(inputString);
  const labelsWithoutTrackedTime = labels.filter(label => !/track/i.test(label.name));
  const trackedTimes = labels
    .filter(label => /track/i.test(label.name))
    .reduce((trackedTimes, label) => [...trackedTimes, ...label.args], []);

  return { text, labels: labelsWithoutTrackedTime, trackedTimes };
}
