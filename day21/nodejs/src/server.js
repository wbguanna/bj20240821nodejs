// node.js <-> mongodb 연동테스트
// 이제 결과 웹브라우저 출력해보기

const http = require("http");
const express = require("express");
const app = express();

const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);

// src는 프로젝트 안에서는 절대경로로 쓸 수 잇다
app.set("port", 3000);
app.set("view engine", "ejs"); // .ejs 접미사로 사용
app.set("views", path.join(__dirname, "../views")); // 접두사 : 절대경로 + 상대경로

// 예전에는 콜백함수로 만들어서 사용하는 것을 선호했지만
// 이제는 async, await 같은 promise 형으로 바뀌었다..

// db.car.find(function (err, data) {
//     console.log(data);
//   });
app.get("/", async (req, res) => {
  if (db) {
    const carList = await db.car.find((err, result) => {
      // 몽고js 는 콜백함수로 처리해줘야함 // 옛날기술임?
      if (err) throw err;
      //   res.send(result);
      let html = '<table border="1">';
      result.forEach((car, i) => {
        html += `<tr><td>${car.name}</td><td>${car.price}</td>
        <td>${car.company}</td><td>${car.year}</td></tr>`;
      });

      html += "</table>";
      res.end(html);
      //   return result;
    });
    // res.end(JSON.stringify(carList));
  } else {
    res.end("db가 연결되지 않았습니다!.");
  }
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  // 白虎の剣を喰らえ！
  console.log(`mongodb test serve on: http://localhost:${app.get("port")} `);
});
