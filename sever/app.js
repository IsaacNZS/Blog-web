const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const userrouter = require("./routers/userRputer");
const commentroute = require("./routers/commentRouter");
const reactroute = require("./routers/reactrouter");

const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
mongoose.connect(process.env.DB_URL);

app.use(fileUpload());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "https://isaac-zls-blog.onrender.com",
  }),
);

app.use("/comment", commentroute);
app.use("/react/", reactroute);
app.use("/user", userrouter);
app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://isaac-zls-blog.onrender.com",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("user-online", (userId) => {
    socket.userId = userId;

    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }

    io.emit("online-users", onlineUsers);

    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((id) => id !== socket.userId);

    io.emit("online-users", onlineUsers);

    console.log("disconnect");
  });
});

server.listen(3000, () => {
  console.clear();
  console.log("server is Running with Socket.io");
});

//https://isaac-zls-blog.onrender.com
//http://localhost:5173
