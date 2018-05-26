function trackedTime(list) {
  return list.reduce(
    (acc, todo) =>
      todo.tags.filter(tag => /^TRACK /.test(tag)).reduce((time, tag) => timeFromTrackTag(tag) + time, 0) + acc,
    0
  );
}

module.exports = {
  trackedTime
};

function timeFromTrackTag(tag) {
  const {
    groups: { h, m, s }
  } = /^TRACK (?<h>\d\d):(?<m>\d\d):(?<s>\d\d)/.exec(tag);
  return parseInt(h) * 60 * 60 + parseInt(m) * 60 + parseInt(s);
}
