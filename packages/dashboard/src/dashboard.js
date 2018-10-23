export { groupByStatus, trackedTime };

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

function filterByTime(minTime) {
  if (minTime) {
    const timeTrackingRegex = /^TRACK (\d{2,}):(\d\d):(\d\d), (.*?), (\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;
    const minTimeRegex = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;
    const minMatch = minTimeRegex.exec(minTime);
    if (minMatch) {
      const minMatchGroups = {
        year: minMatch[1],
        month: minMatch[2],
        day: minMatch[3],
        hour: minMatch[4],
        minute: minMatch[5],
        second: minMatch[6]
      };
      return tag => {
        const timeTrackingMatch = timeTrackingRegex.exec(tag);
        const timeTrackingGroups = {
          h: timeTrackingMatch[1],
          m: timeTrackingMatch[2],
          s: timeTrackingMatch[3],
          year: timeTrackingMatch[5],
          month: timeTrackingMatch[6],
          day: timeTrackingMatch[7],
          hour: timeTrackingMatch[8],
          minute: timeTrackingMatch[9],
          second: timeTrackingMatch[10]
        };
        if (!hasCorrectTimeValues(minMatchGroups)) {
          throw new Error("Incorrect date and time values for 'minTime'.");
        }

        return isSameOrLater(minMatchGroups, timeTrackingGroups);
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
  const [, h, m, s] = /^TRACK (\d\d):(\d\d):(\d\d)/.exec(tag);
  return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
}
