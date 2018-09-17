const { extractTrackedTime } = require("./tracked-time-extractor");

describe("TrackedTimeExtractor", () => {
  it(
    "doesn't change anything when no tracked time is in the string",
    testExtraction("no time #really", [], "no time #really")
  );
  it(
    "can parse a simple example",
    testExtraction(
      'worked on #TRACK({"trackedTime": "01:00:00", "tracker": "Jörn", "date": "2018-09-13 17:27:00"})',
      [{ trackedTime: "01:00:00", tracker: "Jörn", date: "2018-09-13 17:27:00" }],
      "worked on"
    )
  );
});

function testExtraction(inputString, expectedEntries, expectedResultString) {
  return () => {
    const result = extractTrackedTime(inputString);
    expect(result.timeEntries).toEqual(expectedEntries);
    expect(result.text).toBe(expectedResultString);
  };
}
