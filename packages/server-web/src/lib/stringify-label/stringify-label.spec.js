import { stringifyLabel } from "./stringify-label.js";

describe("stringify-label", () => {
  it("returns a non-empty string starting with #", () => {
    const label = "something";
    const result = stringifyLabel(label);
    expect(result.length).toBeGreaterThan(0);
    expect(result.substring(0, 1)).toBe("#");
  });

  it("returns simple strings", () => {
    const label = "something";
    const result = stringifyLabel(label);
    expect(result).toBe("#something");
  });

  it("returns a string with a single # at the beginning", () => {
    const label = "#something";
    const result = stringifyLabel(label);
    expect(result).toBe("#something");
  });

  it("works with simple strings that have arguments", () => {
    const label = `TRACK({"trackedTime":"08:00:00", "tracker": "Jörn", "date":"2018-10-03 19:00:00"})`;
    const result = stringifyLabel(label);
    expect(result).toBe(`#TRACK({"trackedTime":"08:00:00","tracker":"Jörn","date":"2018-10-03 19:00:00"})`);
  });

  it("works with {name, args: []} objects", () => {
    const label = { name: "something", args: [] };
    const result = stringifyLabel(label);
    expect(result).toBe("#something");
  });

  it("works with {name, args} objects", () => {
    const label = { name: "TRACK", args: [{ trackedTime: "08:00:00", tracker: "Jörn", date: "2018-10-03 19:00:00" }] };
    const result = stringifyLabel(label);
    expect(result).toBe(`#TRACK({"trackedTime":"08:00:00","tracker":"Jörn","date":"2018-10-03 19:00:00"})`);
  });
});
