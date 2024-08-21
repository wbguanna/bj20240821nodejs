var express = require("express");
var http = require("http");
var app = express();

app.set("port", 3000);
console.log("__dirname : ", __dirname);
app.set("views", path.join(__dirname, "views")); // path, __dirname // 현재 디렉토리를 절대경로로 설정?
app.set("view engine", "ejs");

// 필터1
app.use(function (req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  console.log("미들웨어 호출");
  res.end("<h1>hello nodejs</h1>");
  // 다음요청실행
  next();
});

app.use("/", (req, res, next) => {
  console.log("/ 요청 미들웨어 호출");
  // 다음 요청 실행
  next();
});

app.get("/", (req, res) => {
  res.end("<h1>hello nodejs 2</h1>");
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
