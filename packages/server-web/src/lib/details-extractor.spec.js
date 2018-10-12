const { extractDetails } = require("./details-extractor");

describe("DetailsExtractor", () => {
  it("extracts labels and tracked times", () => {
    expect(
      extractDetails(
        'wait for this nice #label do you? #TRACK({"trackedTime": "00:20:00", "tracker": "Steve", "date": "2018-09-18 14:06:00"})'
      )
    ).toMatchSnapshot();
  });
  it("returns undefined labels and tracked times", () => {
    // thank you, mongoose
    expect(extractDetails("wait for this nice label do you?")).toMatchSnapshot();
  });
});
