const express = require("express");
const app = express();
const router = require("./routers/userRputer");
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
    origin: "http://localhost:5173/",
  }),
);
app.use("/user", router);
app.use(express.static("public"));

app.listen(3000, () => {
  console.clear();
  console.log("sever is Running");
});
