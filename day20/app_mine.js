const http = require("http");
const express = require("express");
const app = express();
const router = express.Router();

// const static = require("serve-static");
const bodyParser = require("body-parser");
const path = require("path");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");

app.set("port", process.env.PORT || 3000);
// 외부 접속이 가능하도록 해준다..
// app.use(express.static("public"));
// app.use(express.static("upload"));
app.use("view", "views");
app.use("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 쿠키 사용 미들웨어 설정
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

router.route("/").get((req, res) => {
  req.app.send("hello");
  res.end();
});

app.use("/", router);
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`서버 실행 중 >>> http://localhost:${app.get("port")}`);
});

module.exports = app;
