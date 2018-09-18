module.exports = { extractTrackedTimes };

function extractTrackedTimes(inputString) {
  const regex = /#TRACK\((\{.*?\})\)/gi;

  let text = inputString;
  let trackedTimes = [];
  let match;
  while ((match = regex.exec(inputString)) !== null) {
    text = text.replace(match[0], "");
    try {
      trackedTimes.push(JSON.parse(match[1]));
    } catch (err) {
      console.error(err);
    }
  }
  text = text.replace(/\s+/g, " ").trim();

  return { trackedTimes, text };
}
