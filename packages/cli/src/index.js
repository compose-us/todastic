const dashboard = require("@todastic/dashboard");
const storage = require("@todastic/storage-file");

function todastic(file) {
  const storePromise = storage.load(file);

  return {
    async tracked() {
      const store = await storePromise;
      return dashboard.trackedTime(store.todos);
    }
  };
}

module.exports = todastic;
