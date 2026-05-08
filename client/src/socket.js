import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: true,
  reconnection: true,
  transports: ["websocket"],
});

// https://blog-web-3l1s.onrender.com
