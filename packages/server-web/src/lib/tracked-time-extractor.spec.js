const { extractTrackedTimes } = require("./tracked-time-extractor");

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
  it(
    "can parse more than one entry",
    testExtraction(
      'worked on #TRACK({"trackedTime": "00:10:00", "tracker": "Udo", "date": "2018-09-15 18:20:15"}) #TRACK({"trackedTime": "01:00:00", "tracker": "Jörn", "date": "2018-09-13 17:27:00"}) #great',
      [
        { trackedTime: "00:10:00", tracker: "Udo", date: "2018-09-15 18:20:15" },
        { trackedTime: "01:00:00", tracker: "Jörn", date: "2018-09-13 17:27:00" }
      ],
      "worked on #great"
    )
  );
});

function testExtraction(inputString, expectedEntries, expectedResultString) {
  return () => {
    const result = extractTrackedTimes(inputString);
    expect(result.trackedTimes).toEqual(expectedEntries);
    expect(result.text).toBe(expectedResultString);
  };
}
