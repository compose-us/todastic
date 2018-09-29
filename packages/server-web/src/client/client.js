import createSocketConnection from "./socket-connection.js";
import createApp from "./create-app.js";
import { store } from "./store.js";

const processEvent = event => store.dispatch("processEvent", event);
const commands = createSocketConnection(processEvent);
createApp(commands);
