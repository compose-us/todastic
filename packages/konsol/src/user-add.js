const config = require("@todastic/config");
const { initDatabase } = require("@todastic/server-web/src/server/lib/database-mongo.js");
const { createUserModel } = require("@todastic/storage-users");
const { createEventModel } = require("@todastic/storage-events");
const parseArgs = require("minimist");

const args = parseArgs(process.argv.slice(2))

if (args.h) {
  console.log("USAGE: user-add -u <username> -p <password> -l <en|de>");
  console.log("Password and language are optional.");
  console.log("If you don't provide one, a password will be generated for you and displayed on the console.");
  console.log(" If you don't provide a language, we assume english.");
  return 0;
}

createUser(args).then(
  c => console.log(c),
  err => {
     console.log("Error!", err);
     process.exit(2);
    });

async function createUser(args) {
  const username = args.u;
  const password = args.p || generatePassword();
  const language = args.l || defaultLanguage();
  
  if (username === undefined) {
    throw "Need username";
  }

  const db = await initDatabase({ config, logger: console })
  const User = createUserModel({ mongoose: db.mongoose });
  const Event = createEventModel({ mongoose: db.mongoose });
  const user = await User.create({ username, password })
  const uid = user._id + "-id-";

  let events;
  if (language === "de") {
    events = eventsDe(user, uid);
  } else if (language === "en") {
    events = eventsEn(user, uid);
  } else {
    throw "Don't know what to do with language entry '" + language + "'";
  }
  await events.map(event => {
    e = Event.create(event)
    process.stdout.write(".")
    return
  });
  console.log("");

  await db.mongoose.disconnect();
  return "All done. User " + username + " with password " + password + " successfully created.";
}

function generatePassword() {
  console.log("No password given, generating one.");
  password = Math.random().toString(36).slice(-8);
  console.log("Using password '" + password + "'");
  return password;
}

function defaultLanguage() {
  console.log("No language flag provided. Defaulting to en");
  return "en";
}

function eventsDe(user, uid){
  return [
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1", title: "Ein erstes Todo erstellen", position: 0 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1", labels: ["power"], title: "Ein erstes Sub Todo erstellen", position: 0, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-1", title: "Auf die drei Punkte klicken", position: 0, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-2", title: "Auf 'plus' klicken", position: 1, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-3", title: "Todo Text in das Feld eintragen", position: 2, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-2", title: "Todo an eine andere Position verschieben", position: 1, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-2-1", title: "Drag and drop verwenden", position: 0, parentId: uid + "2-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "2", labels: ["security"], title: "Passwort ändern", position: 1 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3", labels: ["help-us"], title: "Dem neugierigen Todastic Team tiefgründiges Feedback geben", position: 2 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3-1", title: "Über das Fragezeichen (?) rechts oben die Feedback E-Mailadresse finden", position: 0, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3-2", labels:["#fun"], title: "2 Minuten mit Todastic herumspielen", position: 1, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4", title: "Eine Zeit tracken", position: 3 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-1", title: "Zeit eintragen", position: 0, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-2", title: "Zeit ändern", position: 1, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3", title: "Die getrackte Zeit über ein Skript ausgeben lassen", position: 2, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-1", title: "Skript aus dem Wiki kopieren (https://github.com/compose-us/todastic/wiki/User-scripts)", position: 0, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-2", title: "Skript laufen lassen", position: 1, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-3", labels: ["#yay"], title: "Ergebnis begutachten", position: 2, parentId: uid + "4-3" } }
  ];
}

function eventsEn(user, uid){
  return [
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1", title: "Create a first Todo", position: 0 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1", labels: ["power"], title: "Create a first Sub Todo", position: 0, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-1", title: "Click on the three dots", position: 0, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-2", title: "click on 'plus'", position: 1, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-1-3", title: "Write a sub Todo in the text field", position: 2, parentId: uid + "1-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-2", title: "Move a todo to a different position", position: 1, parentId: uid + "1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "1-2-1", title: "Use drag and drop", position: 0, parentId: uid + "2-1" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "2", labels: ["security"], title: "Change password", position: 1 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3", labels: ["help-us"], title: "Give the curious todastic team feedback", position: 2 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3-1", title: "Find email address via (?) at the upper right", position: 0, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "3-2", labels:["#fun"], title: "Play with Todastic for 2 minutes", position: 1, parentId: uid + "3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4", title: "Explore time tracking", position: 3 } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-1", title: "Add a time entry", position: 0, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-2", title: "Change time entry", position: 1, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3", title: "See the tracked time via a script", position: 2, parentId: uid + "4" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-1", title: "Copy script from the wiki (https://github.com/compose-us/todastic/wiki/User-scripts)", position: 0, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-2", title: "Run the script", position: 1, parentId: uid + "4-3" } },
    { eventType: "ADDED_TODO", userId: user._id, data: { todoId: uid + "4-3-3", labels: ["#yay"], title: "Look at results", position: 2, parentId: uid + "4-3" } }
  ];
}
