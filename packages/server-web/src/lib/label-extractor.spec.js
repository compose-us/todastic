const { extractLabels } = require("./label-extractor");

describe("LabelExtractor", () => {
  describe("simple lables", () => {
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

  describe("functional labels", () => {
    it("returns function calls when using parentheses", () => {
      console.log("snip");
      expect(extractLabels("A label can - at the end of the text - #call()")).toMatchSnapshot();
      console.log("snap");
      expect(extractLabels("A label can #call() something in the middle of a text")).toMatchSnapshot();
    });
    it("returns function calls with parameters", () => {
      expect(extractLabels(`A label can - at the end of the text - #call("someone")`)).toMatchSnapshot();
      expect(extractLabels(`A label can #call("someone") something in the middle of a text`)).toMatchSnapshot();
    });
    it("returns function calls with multiple parameters", () => {
      expect(
        extractLabels(`A label can - at the end of the text - #call(123, "please", {"ok": "thx, bye"})`)
      ).toMatchSnapshot();
      expect(
        extractLabels(`A label can #call(123, "please", {"ok": "thx, bye"}) something in the middle of a text`)
      ).toMatchSnapshot();
    });
    it("returns function calls with parameters with complex parameters", () => {
      expect(
        extractLabels(
          `A label can - at the end of the text - #call({"someone": "at (555)-1234", "or": "have #strange(\\"sub(sub(things))\\" to #handle()"})`
        )
      ).toMatchSnapshot();
      expect(
        extractLabels(
          `A label can #call({"someone": "at (555)-1234", "or": "have #strange(\\"sub(sub(things))\\" to #handle()"}) something in the middle of a text`
        )
      ).toMatchSnapshot();
    });
    it("returns function calls with parameters multiple times if there are multiple calls", () => {
      expect(
        extractLabels(
          `A label #call("someone") eagerly while #call({"at":"(555)-1234"}) #somewhere in the middle of the #call(true) text`
        )
      ).toMatchSnapshot();
      expect(
        extractLabels(
          `Somewhere at the end of the text #call("someone") #call({"at":"(555)-1234"}) #call(true)`
        )
      ).toMatchSnapshot();
    });
  });
});
