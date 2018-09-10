function extract(inputString) {
  const labelsRegex = /(\#\w*)\b/;
  const matches = inputString.match(labelsRegex);
  //console.log(matches);
  let labels = [];
  if (matches) {
    labels.push(matches[0]);
  }
  const text = inputString.replace(labels[0], "").trim();
  return { labels, text };
}

module.exports = { extract };
