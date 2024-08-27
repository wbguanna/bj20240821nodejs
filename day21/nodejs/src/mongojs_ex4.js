// node.js <-> mongodb 연동테스트
// 이제 결과 웹브라우저 출력해보기

const http = require("http");
const express = require("express");
const app = express();
// const ejs = require("ejs");
const { MongoClient } = require("mongodb");
const path = require("path");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const mongojs = require("mongojs");
// const db = mongojs("vehicle", ["car"]);
const db = client.db();
// console.dir(db);

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
    // const car = db.collection("car").find({});
    const cursor = db.collection("car").find({});
    // req.app.render("CarList", { carList: result }, (err2, html) => {
    //   if (err2) throw err2;
    //   res.end(html);
    // });
    for await (const doc of cursor) {
      console.dir(doc);
    }

    // const carList = await cars.find({}).toArray();
    // const cursor = car.find({}, { projection: { _id: 0 } });
    // await cursor.foreach((e) => console.log(JSON.stringify(e)));
    for await (const c of car) {
      res.send(c);
    }
    res.end("finish...");
  } else {
    res.end("db가 연결되지 않았습니다!.");
  }
});

const server = http.createServer(app);
server.listen(app.get("port"), async () => {
  // 白虎の剣を喰らえ！
  console.log(`mongodb test serve on: http://localhost:${app.get("port")} `);

  run().catch(console.dir);
});
