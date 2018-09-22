import createSocketConnection from "./socket-connection.js";
import createApp from "./create-app.js";
import { processEvent } from "./todo-store.js";

const commands = createSocketConnection(processEvent);
createApp(commands);
