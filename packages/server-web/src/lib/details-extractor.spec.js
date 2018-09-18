const { extractDetails } = require("./details-extractor");

describe("DetailsExtractor", () => {
  it(
    "extracts labels and tracked times",
    testExtraction(
      'wait for this nice #label do you? #TRACK({"trackedTime": "00:20:00", "tracker": "Steve", "date": "2018-09-18 14:06:00"})',
      ["#label"],
      [{ trackedTime: "00:20:00", tracker: "Steve", date: "2018-09-18 14:06:00" }],
      "wait for this nice label do you?"
    )
  );
});
function testExtraction(inputString, expectedLabels, expectedTrackedTimes, expectedResultString) {
  return () => {
    const result = extractDetails(inputString);
    expect(result.labels).toEqual(expectedLabels);
    expect(result.trackedTimes).toEqual(expectedTrackedTimes);
    expect(result.text).toBe(expectedResultString);
  };
}
