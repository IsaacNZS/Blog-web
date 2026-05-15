import { io } from "socket.io-client";

export const socket = io("https://blog-web-3l1s.onrender.com", {
  autoConnect: true,
  reconnection: true,
  transports: ["websocket"],
});

// https://blog-web-3l1s.onrender.com
// http://localhost:3000
