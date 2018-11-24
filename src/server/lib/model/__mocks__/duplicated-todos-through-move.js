module.exports = [
  {
    data: {
      parentId: null,
      status: "open",
      todoId: "id-3",
      title: "Give the curious todastic team feedback",
      position: 0
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-3",
      status: "open",
      todoId: "id-3-1",
      title: "Find email address via (?) at the upper right",
      position: 0
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-3",
      status: "open",
      todoId: "id-3-2",
      title: "Play with Todastic for 2 minutes",
      position: 1
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: null,
      status: "open",
      todoId: "id-4",
      title: "Explore time tracking",
      position: 1
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4",
      status: "open",
      todoId: "id-4-1",
      title: "Add a time entry",
      position: 0
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4",
      status: "open",
      todoId: "id-4-2",
      title: "Change time entry",
      position: 1
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4",
      status: "open",
      todoId: "id-4-3",
      title: "See the tracked time via a script",
      position: 2
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4-3",
      status: "open",
      todoId: "id-4-3-1",
      title: "Copy script from the wiki (https://github.com/compose-us/todastic/wiki/User-scripts)",
      position: 0
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4-3",
      status: "open",
      todoId: "id-4-3-2",
      title: "Run the script",
      position: 1
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: "id-4-3",
      status: "open",
      todoId: "id-4-3-3",
      title: "Look at results",
      position: 2
    },
    eventType: "ADDED_TODO"
  },
  {
    data: {
      parentId: null,
      status: "open",
      title: "See the tracked time via a script",
      todoId: "id-4-3",
    },
    eventType: "CHANGED_TODO"
  },
  {
    data: {
      parentId: "id-3-1",
      status: "open",
      todoId: "id-4-3",
      position: 2
    },
    eventType: "MOVED_TODO"
  }
];
