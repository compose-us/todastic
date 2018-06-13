const dashboard = require("@todastic/dashboard");
const storage = require("@todastic/storage-file");

function todastic(file) {
  const storePromise = storage.load(file);
  const filters = [];

  return {
    filter(filter) {
      filters.push(todos => getFilteredTodos(filter, todos));
      return this;
    },
    async tracked({ minTime } = {}) {
      const store = await storePromise;
      const filteredTodos = filters.reduce((todos, filter) => filter(todos), store.todos);
      const inSeconds = dashboard.trackedTime(filteredTodos, { minTime });
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

function getFilteredTodos(filter, todos) {
  if (!filter) {
    return todos;
  }

  const { status } = filter;
  if (!status) {
    return todos;
  }

  return status.reduce((arr, s) => [...arr, ...(dashboard.groupByStatus(todos)[s] || [])], []);
}
