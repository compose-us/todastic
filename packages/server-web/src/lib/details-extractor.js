const { extractTrackedTimes } = require("./tracked-time-extractor");
const { extractLabels } = require("./label-extractor");

module.exports = { extractDetails };

function extractDetails(inputString) {
  const { trackedTimes, text: textWithoutTimes } = extractTrackedTimes(inputString);
  const { labels, text } = extractLabels(textWithoutTimes);

  return { text, labels, trackedTimes };
}
