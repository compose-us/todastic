module.exports = { extractLabels };

function extractLabels(inputString) {
  const { labels: labelsEnd, text: textEnd } = extractLabelsAtTheEnd(inputString);
  const { labels: labelsInBetween, text } = extractLabelsInBetween(textEnd);
  const labels = labelsInBetween.concat(labelsEnd);
  if (labels.length === 0) {
    return { labels: undefined, text };
  }

  return { labels, text };
}

function extractLabelsInBetween(inputString) {
  // see https://www.regular-expressions.info/unicode.html
  const labelsRegex = /#(\P{Z}+)/gsu;
  const matches = inputString.match(labelsRegex);
  const labels = [];
  let text = inputString;
  if (matches) {
    for (const match of matches) {
      labels.push(match);
      text = text.replace("#", "").trim();
    }
  }
  return { labels, text };
}

function extractLabelsAtTheEnd(inputString) {
  // I'm pretty sure, there's a regex that captures all
  // ending labels at once.
  const labelsRegex = /#(\P{Z}+)$/gsu;
  const labels = [];
  let text = inputString;
  let match;
  do {
    match = text.match(labelsRegex);
    if (match) {
      labels.unshift(match[0]);
      text = text.replace(match[0], "").trim();
    }
  } while (match);
  return { labels, text };
}
