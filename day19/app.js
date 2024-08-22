const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views")); // 절대경로 // 작업디렉토리가 바뀐다면 이게 나을 수 있음
app.set("views", "views"); // 상대경로 // 보안?
app.set("view engine", "ejs");

app.use(express.static("public")); // public 폴더 정적 제공

app.get("/home", (req, res) => {
  req.app.render("Home", {}, (err, html) => {
    res.end(html);
  });
});

app.get("/gallery", (req, res) => {
  req.app.render("Home", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/home", (req, res) => {
  req.app.render("Home", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/home", (req, res) => {
  req.app.render("Home", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/home", (req, res) => {
  req.app.render("Home", {}, (err, html) => {
    res.end(html);
  });
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`server start: http://localhost:${app.get("port")}`); // 최신문법 쓸때는 호환이 되ㅡㄴ지 확인해보자
});
