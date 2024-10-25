import { WebSocketServer } from "./server/WebSocketServer";

const server = new WebSocketServer();
const serverInstance = server.start(3000);

console.log(`WebSocket server running on ws://localhost:${serverInstance.port}`);