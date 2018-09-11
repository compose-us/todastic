const { extract } = require("./label-extractor");

describe("LabelExtractor", () => {
  it(
    "simply returns the plain string when there's no label",
    testExtraction("no label, really", [], "no label, really")
  );

  it(
    "extracts and removes a label when it's at the end",
    testExtraction("wait for it. #label", ["#label"], "wait for it.")
  );

  it(
    "extracts and removes several labels when they're at the end",
    testExtraction("wait for it. #label #nice", ["#label", "#nice"], "wait for it.")
  );

  it(
    "extracts a label when it's in-between",
    testExtraction("wait for this nice #label do you?", ["#label"], "wait for this nice label do you?")
  );

  it(
    "extracts multiple labels when they're in-between",
    testExtraction("wait for this #nice #label do you?", ["#nice", "#label"], "wait for this nice label do you?")
  );

  it(
    "extracts and removes several labels within and at the end",
    testExtraction("#fancy wait #for it. #label #nice", ["#fancy", "#for", "#label", "#nice"], "fancy wait for it.")
  );

  xit(
    "extracts and removes several unicode labels within and at the end",
    testExtraction(
      "#fancy wait #fôr it #☃︎. #läbel #niçe",
      ["#fancy", "#fôr", "#☃︎", "#läbel", "#niçe"],
      "fancy wait for it."
    )
  );
});

function testExtraction(inputString, expectedLabels, expectedResultString) {
  return () => {
    const result = extract(inputString);
    expect(result.labels).toEqual(expectedLabels);
    expect(result.text).toBe(expectedResultString);
  };
}
