const { extractTrackedTimes } = require("./tracked-time-extractor");

describe("TrackedTimeExtractor", () => {
  it("doesn't change anything when no tracked time is in the string", () => {
    expect(extractTrackedTimes("no time #really")).toMatchSnapshot();
  });
  it("can parse a simple example", () => {
    expect(
      extractTrackedTimes(
        'worked on #TRACK({"trackedTime": "01:00:00", "tracker": "Jörn", "date": "2018-09-13 17:27:00"})'
      )
    ).toMatchSnapshot();
  });
  it("can parse more than one entry", () => {
    expect(
      extractTrackedTimes(
        'worked on #TRACK({"trackedTime": "00:10:00", "tracker": "Udo", "date": "2018-09-15 18:20:15"}) #TRACK({"trackedTime": "01:00:00", "tracker": "Jörn", "date": "2018-09-13 17:27:00"}) #great'
      )
    ).toMatchSnapshot();
  });
  it("discards broken entries", () => {
    expect(extractTrackedTimes('worked on #TRACK({"trackedTime"}) #great')).toMatchSnapshot();
  });
});
