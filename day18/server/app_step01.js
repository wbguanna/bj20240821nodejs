const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const cors = require("cors");

app.set("port", 3000);
console.log("__dirname : ", __dirname);
app.set("views", path.join(__dirname, "views"));
// path, __dirname // 현재 디렉토리를 절대경로로 설정? // 운영체제마다 달자리는 위치 설정
app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors()); // cors 모듈 추가..

// 필터1
// app.use(function (req, res, next) {
//   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//   console.log("미들웨어 호출");
//   res.end("<h1>hello nodejs</h1>");
//   // 다음요청실행
//   next();
// });

// app.use("/", (req, res, next) => {
//   console.log("/ 요청 미들웨어 호출");
//   // 다음 요청 실행
//   next();
// });

app.get("/home", (req, res) => {
  console.log("Get /home 요청 실행");
  const name = req.query.name;
  const age = req.query.age;
  req.app.render("home", { name, age }, (err, html) => {
    // res.end()는 문자열 처리
    res.end(html);
  });
});

// 브라우저 body에 JSON 형식으로 바로 출력
app.get("/home2", (req, res) => {
  console.log("Get /home2 요청 실행");
});

// app.get("/", (req, res) => {
//   res.end("<h1>hello nodejs 2</h1>");
// });

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
