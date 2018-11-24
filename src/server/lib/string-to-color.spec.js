const { stringToColor } = require("./string-to-color.js");

describe("StringToColor", () => {
  it("generates a valid color", () => {
    const color = stringToColor("test");
    expect(color).toBeDefined();
    expect(color.charAt(0)).toBe("#");
    expect(color.length).toBe(7);
  });
  it("generates different colors for different strings", () => {
    const color1 = stringToColor("test");
    const color2 = stringToColor("test-label");
    expect(color1).not.toBe(color2);
  });
});
