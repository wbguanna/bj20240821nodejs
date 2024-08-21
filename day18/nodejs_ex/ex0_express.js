var express = require("express");
var http = require("http");
var app = express();

app.set("port", 3000);

// 필터1
app.use(function (req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  console.log("미들웨어 호출");
  res.end("<h1>hello nodejs</h1>");
  // 다음요청실행
  next();
});

app.get("/", (req, res) => {
  res.end("<h1>hello nodejs 2</h1>");
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
