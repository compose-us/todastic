const { extractTrackedTimes } = require("./tracked-time-extractor");
const { extractLabels } = require("./label-extractor");

module.exports = { extractDetails };

function extractDetails(inputString) {
  const { labels, text } = extractLabels(inputString);
  const labelsWithoutTrackedTime = labels.filter(label => !/track/i.test(label.name));
  const trackedTimes = labels.filter(label => /track/i.test(label.name));

  return { text, labels: labelsWithoutTrackedTime, trackedTimes };
}
