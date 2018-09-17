module.exports = { extractTrackedTime };

function extractTrackedTime(inputString) {
  const regex = /#TRACK\((\{.*\:.*\})\)/s;
  const matches = inputString.match(regex);
  const timeEntries = [];
  let text = inputString;
  if (matches) {
    match = matches[1];
    text = text.replace(match, "");
    console.log(match);
    timeEntries.unshift(JSON.parse(match));
  }
  text = text.replace("#TRACK()", "").trim();

  return { timeEntries, text };
}
