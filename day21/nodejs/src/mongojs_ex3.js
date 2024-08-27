// node.js <-> mongodb 연동테스트
// 이제 결과 웹브라우저 출력해보기

const http = require("http");
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);

// src는 프로젝트 안에서는 절대경로로 쓸 수 잇다
app.set("port", 3000);
app.set("view engine", "ejs"); // .ejs 접미사로 사용
app.set("views", path.join(__dirname, "../views")); // 접두사 : 절대경로 + 상대경로

// const resetMongo =
// 예전에는 콜백함수로 만들어서 사용하는 것을 선호했지만
// 이제는 async, await 같은 promise 형으로 바뀌었다..

// db.car.find(function (err, data) {
//     console.log(data);
//   });
app.get("/", async (req, res) => {
  if (db) {
    // 몽고js 는 콜백함수로 처리해줘야함 // 옛날기술임
    db.car.find((err, result) => {
      if (err) throw err;
      // 접두사와 접미사 생략 파일명만 사용
      req.app.render("CarList", { carList: result }, (err2, html) => {
        if (err2) throw err2;
        res.end(html);
      });
    });
  } else {
    res.end("db가 연결되지 않았습니다!.");
  }
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  // 白虎の剣を喰らえ！
  console.log(`mongodb test serve on: http://localhost:${app.get("port")} `);
});
