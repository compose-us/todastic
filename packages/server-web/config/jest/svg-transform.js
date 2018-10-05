const path = require('path');

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
