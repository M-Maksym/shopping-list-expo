import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ noServer: true });
const rooms = new Map();

wss.on("connection", (ws, request) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  console.log(`Client connected to ${pathname}`);

  if (!rooms.has(pathname)) {
    rooms.set(pathname, new Set());
    console.log(`Created new room for ${pathname}`);
  }
  const room = rooms.get(pathname);
  room.add(ws);

  ws.on("message", (data) => {
    console.log(`Message received from ${pathname}:`, data.toString());
    room.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(data.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log(`Client disconnected from ${pathname}`);
    room.delete(ws);
    if (room.size === 0) {
      rooms.delete(pathname);
      console.log(`Removed empty room ${pathname}`);
    }
  });
});

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  console.log(`Upgrade request for ${pathname}`);

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at ws://localhost:${PORT}`);
});
