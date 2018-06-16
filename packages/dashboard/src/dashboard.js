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
    const timeTrackingRegex = /^TRACK (?<h>\d{2,}):(?<m>\d\d):(?<s>\d\d), (.*?), (?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
    const minTimeRegex = /^(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d) (?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)$/;
    const minMatch = minTimeRegex.exec(minTime);
    if (minMatch) {
      return tag => {
        const { groups } = timeTrackingRegex.exec(tag);
        if (!hasCorrectTimeValues(minMatch.groups)) {
          throw new Error("Incorrect date and time values for 'minTime'.");
        }

        return isSameOrLater(minMatch.groups, groups);
      };
    } else {
      throw new Error("'minTime' is not correctly formatted");
    }
  }
  return () => true;
}

function hasCorrectTimeValues({ month, day, hour, minute, second }) {
  return month <= 12 && day <= 31 && hour <= 24 && minute <= 59 && second <= 59;
}

function isSameOrLater(a, { year, month, day, hour, minute, second }) {
  const timestampA = `${a.year}-${a.month}-${a.day} ${a.hour}:${a.minute}:${a.second}`;
  const timestampB = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return timestampA <= timestampB;
}

function timeFromTrackTag(tag) {
  const {
    groups: { h, m, s }
  } = /^TRACK (?<h>\d\d):(?<m>\d\d):(?<s>\d\d)/.exec(tag);
  return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
}
