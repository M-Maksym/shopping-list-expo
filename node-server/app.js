import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();
server.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running ✅");
});
const wss = new WebSocketServer({ noServer: true });
const rooms = new Map();

wss.on("connection", (ws, request) => {
  const pathname = new URL(request.url, "http://ws-server.railway.internal")
    .pathname;
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
  const pathname = new URL(request.url, "http://ws-server.railway.internal")
    .pathname;
  console.log(`Upgrade request for ${pathname}`);

  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

const PORT = process.env.PORT || 8080; // використовуємо PORT з Railway або 8080 за замовчуванням
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at ws://ws-server.railway.internal:${PORT}`);
});
