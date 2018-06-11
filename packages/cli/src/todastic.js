const dashboard = require("@todastic/dashboard");
const storage = require("@todastic/storage-file");

function todastic(file) {
  const storePromise = storage.load(file);

  return {
    async tracked({ minTime } = {}) {
      const store = await storePromise;
      const inSeconds = dashboard.trackedTime(store.todos, { minTime });
      const h = nf(Math.floor(inSeconds / 60 / 60));
      const m = nf(Math.floor((inSeconds / 60) % 60));
      const s = nf(Math.floor(inSeconds % 60));
      return `${h}:${m}:${s}`;

      function nf(num) {
        return (num < 10 ? "0" : "") + num;
      }
    }
  };
}

module.exports = todastic;
