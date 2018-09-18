const { extractLabels } = require("./label-extractor");

describe("LabelExtractor", () => {
  it("simply returns the plain string when there's no label", () => {
    expect(extractLabels("no label, really")).toMatchSnapshot();
  });
  it("extracts and removes a label when it's at the end", () => {
    expect(extractLabels("wait for it. #label")).toMatchSnapshot();
  });
  it("extracts and removes several labels when they're at the end", () => {
    expect(extractLabels("wait for it. #label #nice")).toMatchSnapshot();
  });
  it("extracts labels with a hyphen", () => {
    expect(extractLabels("wait #for-this cool thing. #nice-label")).toMatchSnapshot();
  });
  it("extracts a label when it's in-between", () => {
    expect(extractLabels("wait for this nice #label do you?")).toMatchSnapshot();
  });
  it("extracts multiple labels when they're in-between", () => {
    expect(extractLabels("wait for this #nice #label do you?")).toMatchSnapshot();
  });
  it("extracts and removes several labels within and at the end", () => {
    expect(extractLabels("#fancy wait #for it. #label #nice")).toMatchSnapshot();
  });
  it("extracts and removes several unicode labels within and at the end", () => {
    expect(extractLabels("#fancy wait #fôr it laís. #läbel #niçe")).toMatchSnapshot();
  });
});
