const path = require('path');

// This is a custom Jest transformer turning svg imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    const viewBoxMatch = /viewBox="([^"]*?)"/.exec(src);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '';
    return `module.exports = {
      id: ${JSON.stringify(path.basename(filename))},
      viewBox: '${viewBox}'
    };`;
  }
};
