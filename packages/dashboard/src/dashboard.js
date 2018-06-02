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
  const timeTrackingRegex = /^TRACK (?<hours>\d{2,}):(?<minutes>\d\d):(?<seconds>\d\d), (.*?), (?<day>\d\d)\.(?<month>\d\d)\.(?<year>\d\d\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
  const minTimeRegex = /^(?<day>\d\d)\.(?<month>\d\d)\.(?<year>\d\d\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
  if (minTime) {
    return tag => {
      const minMatch = minTimeRegex.exec(minTime);
      if (minMatch) {
        const match = timeTrackingRegex.exec(tag);
        if (match) {
          return (
            minMatch.groups.year < match.groups.year ||
            (minMatch.groups.year === match.groups.year &&
              (minMatch.groups.month < match.groups.month ||
                (minMatch.groups.month === match.groups.month &&
                  (minMatch.groups.day < match.groups.day ||
                    (minMatch.groups.day === match.groups.day &&
                      (minMatch.groups.hour < match.groups.hour ||
                        (minMatch.groups.hour === match.groups.hour &&
                          (minMatch.groups.minute < match.groups.minute ||
                            (minMatch.groups.minute === match.groups.minute &&
                              (minMatch.groups.second < match.groups.second ||
                                minMatch.groups.second === match.groups.second))))))))))
          );
        }
      }
      return false;
    };
  }
  return () => true;
}

function timeFromTrackTag(tag) {
  const {
    groups: { h, m, s }
  } = /^TRACK (?<h>\d\d):(?<m>\d\d):(?<s>\d\d)/.exec(tag);
  return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
}
