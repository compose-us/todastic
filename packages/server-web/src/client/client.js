import createSocketConnection from "./socket-connection.js";
import createApp from "./create-app.js";
import { processEvent } from "./store.js";

createSocketConnection(processEvent);
createApp();
