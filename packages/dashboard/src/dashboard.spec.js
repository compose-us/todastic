const dashboard = require("./dashboard");
describe("Dashboard", () => {
  describe("sums tracked time", () => {
    it("tracks 0 for an empty list", () => {
      const result = dashboard.trackedTime([]);
      expect(result).toEqual(0);
    });

    it("tracks 0 if there are no TRACK tasks in a list", () => {
      const result = dashboard.trackedTime([
        { tags: ["ASSIGN Narigo, 25.05.2018 08:56:23"] },
        { tags: ["ASSIGN Narigo, 25.05.2018 08:56:23"] }
      ]);
      expect(result).toEqual(0);
    });

    it("tracks the correct time for a single element list", () => {
      const result = dashboard.trackedTime([{ tags: ["TRACK 01:20:30, Narigo, 25.05.2018 08:45:34"] }]);
      expect(result).toEqual(1 * 60 * 60 + 20 * 60 + 30);
    });

    it("tracks the correct time for multiple track elements in a list", () => {
      const result = dashboard.trackedTime([
        { tags: ["TRACK 00:30:00, Narigo, 25.05.2018 08:45:34", "TRACK 01:30:30, Narigo, 25.05.2018 08:45:34"] }
      ]);
      expect(result).toEqual(30 * 60 + 1 * 60 * 60 + 30 * 60 + 30);
    });

    it("tracks the correct time for multiple track elements in a list", () => {
      const result = dashboard.trackedTime([
        {
          tags: [
            "TRACK 00:30:00, Narigo, 25.05.2018 08:45:34",
            "ASSIGN Narigo, 25.05.2018 08:56:23",
            "TRACK 01:30:30, Narigo, 25.05.2018 08:45:34"
          ]
        }
      ]);
      expect(result).toEqual(30 * 60 + 1 * 60 * 60 + 30 * 60 + 30);
    });

    it("tracks the correct time for multiple track elements in multiple tag list", () => {
      const result = dashboard.trackedTime([
        {
          tags: [
            "TRACK 00:30:00, Narigo, 25.05.2018 08:45:34",
            "ASSIGN Narigo, 25.05.2018 08:56:23",
            "TRACK 01:30:30, Narigo, 25.05.2018 08:45:34"
          ]
        },
        {
          tags: ["TRACK 00:30:00, Narigo, 25.05.2018 08:45:34"]
        }
      ]);
      expect(result).toEqual(30 * 60 + 1 * 60 * 60 + 30 * 60 + 30 + 30 * 60);
    });

    describe("minTime option", () => {
      const todoList = [
        {
          tags: [
            "TRACK 00:10:00, Narigo, 25.05.2018 08:45:34",
            "TRACK 00:20:00, Narigo, 25.05.2018 08:45:35",
            "TRACK 00:30:00, Narigo, 26.05.2018 06:05:32",
            "TRACK 00:40:00, Narigo, 28.05.2018 18:15:14"
          ]
        }
      ];

      it("will complain if minTime filter is not in a correct format", () => {
        expect(() => dashboard.trackedTime(todoList, { minTime: "whatever" })).toThrow(/format/i);
      });

      describe("wrong times", () => {
        testTime("10.13.2010 10:10:10");
        testTime("32.10.2010 25:10:10");
        testTime("10.10.2010 10:61:10");
        testTime("10.10.2010 10:10:61");

        function testTime(minTime) {
          it(`will complain if minTime filter is set to wrong time ${minTime}`, () => {
            expect(() => dashboard.trackedTime(todoList, { minTime })).toThrow(/date.*time/i);
          });
        }
      });

      it("can filter tracked times by time", () => {
        const result = dashboard.trackedTime(todoList, { minTime: "25.05.2018 08:45:35" });
        expect(result).toEqual((20 + 30 + 40) * 60);
      });
    });
  });

  describe("groups by status", () => {
    it("results in an empty object if there are no todos", () => {
      expect(dashboard.groupByStatus([])).toEqual({});
    });

    it("results in an object containing a list grouped by a single status", () => {
      expect(
        dashboard.groupByStatus([{ status: "open", title: "First task" }, { status: "open", title: "Second task" }])
      ).toEqual({ open: [{ status: "open", title: "First task" }, { status: "open", title: "Second task" }] });
    });

    it("can group by any status", () => {
      expect(
        dashboard.groupByStatus([
          { status: "open", title: "First task" },
          { status: "done", title: "Second task" },
          { status: "open", title: "Another open task" },
          { status: "n/a", title: "Third task" }
        ])
      ).toEqual({
        done: [{ status: "done", title: "Second task" }],
        "n/a": [{ status: "n/a", title: "Third task" }],
        open: [{ status: "open", title: "First task" }, { status: "open", title: "Another open task" }]
      });
    });
  });
});
