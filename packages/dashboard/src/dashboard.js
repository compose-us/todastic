function trackedTime(list, { minTime } = {}) {
  return list.reduce(
    (acc, todo) =>
      todo.tags
        .filter(tag => /^TRACK /.test(tag))
        .filter(filterByTime(minTime))
        .reduce((time, tag) => timeFromTrackTag(tag) + time, 0) + acc,
    0
  );
}

function groupByStatus(list) {
  return list.reduce((acc, todo) => {
    acc[todo.status] = acc[todo.status] || [];
    acc[todo.status].push(todo);
    return acc;
  }, {});
}

module.exports = {
  trackedTime,
  groupByStatus
};

function filterByTime(minTime) {
  if (minTime) {
    const timeTrackingRegex = /^TRACK (?<h>\d{2,}):(?<m>\d\d):(?<s>\d\d), (.*?), (?<day>\d\d)\.(?<month>\d\d)\.(?<year>\d\d\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
    const minTimeRegex = /^(?<day>\d\d)\.(?<month>\d\d)\.(?<year>\d\d\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
    const minMatch = minTimeRegex.exec(minTime);
    if (minMatch) {
      return tag => {
        const {
          groups: { year, month, day, hour, minute, second }
        } = timeTrackingRegex.exec(tag);
        if (
          12 < minMatch.groups.month ||
          31 < minMatch.groups.day ||
          24 < minMatch.groups.hour ||
          59 < minMatch.groups.minute ||
          59 < minMatch.groups.second
        ) {
          throw new Error("Incorrect date and time values for 'minTime'.");
        }

        return (
          minMatch.groups.year < year ||
          (minMatch.groups.year === year &&
            (minMatch.groups.month < month ||
              (minMatch.groups.month === month &&
                (minMatch.groups.day < day ||
                  (minMatch.groups.day === day &&
                    (minMatch.groups.hour < hour ||
                      (minMatch.groups.hour === hour &&
                        (minMatch.groups.minute < minute ||
                          (minMatch.groups.minute === minute &&
                            (minMatch.groups.second < second || minMatch.groups.second === second))))))))))
        );
      };
    } else {
      throw new Error("'minTime' is not correctly formatted");
    }
  }
  return () => true;
}

function timeFromTrackTag(tag) {
  const {
    groups: { h, m, s }
  } = /^TRACK (?<h>\d\d):(?<m>\d\d):(?<s>\d\d)/.exec(tag);
  return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
}
