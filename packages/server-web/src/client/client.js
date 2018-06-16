import createSocketConnection from "./socket-connection.js";
import createApp from "./create-app.js";
import { processEvent } from "./store.js";

const commands = createSocketConnection(processEvent);
createApp(commands);
