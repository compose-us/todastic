function extract(inputString) {
  const { labels: labelsEnd, text: textEnd } = extractLabelsAtTheEnd(inputString);
  const { labels: labelsInBetween, text } = extractLabelsInBetween(textEnd);
  labels = labelsInBetween.concat(labelsEnd);

  return { labels, text };
}

function extractLabelsInBetween(inputString) {
  const labelsRegex = /(\#\w*)\b(?!\#)/g;
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
  // I'm just to dumb to find it.
  const labelsRegex = /(\#\w*)\b$/g;
  const labels = [];
  let text = inputString;
  let matches;
  do {
    matches = text.match(labelsRegex);
    if (matches) {
      for (const match of matches) {
        labels.unshift(match);
        text = text.replace(match, "").trim();
      }
    }
  } while (matches);
  return { labels, text };
}

module.exports = { extract };
