const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

app.set("port", 3000);
console.log("__dirname:", __dirname);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());

// POST 요청 시 파라미터를 body 에서 사용하기 위한 설정
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const employeeList = [
  { no: "1035", name: "박부장", dept: "기획부", rank: "다이아" },
  { no: "1036", name: "손과장", dept: "기획부", rank: "골드" },
  { no: "1037", name: "오수철", dept: "기획부", rank: "실버" },
  { no: "1038", name: "안사원", dept: "기획부", rank: "아이언" },
  { no: "1039", name: "홍박사", dept: "기획부", rank: "골드" },
];
let noCnt = 1001;

// index.html 에서 ajax로 처리
app.get("/saram", (req, res) => {
  console.log("GET - /saram 요청");
  res.send(JSON.stringify(employeeList));
  //   res.send(employeeList);
});

app.post("/saram", (req, res) => {
  console.log("POST - /saram 요청");
  res.send(employeeList);
});

app.delete("/saram", (req, res) => {
  res.send(employeeList);
});

app.put("/saram/:no", (req, res) => {
  console.log(`put - /saram/${no} 한명 수정요청`);
  res.send(employeeList);
});
app.delete("/saram/:no", (req, res) => {
  console.log(`delete - /saram/${no} 한명 삭제 요청`);
  res.send(employeeList);
});

app.get("/saram/search", (req, res) => {
  console.log("GET - /saram 검색 요청");
  res.send(employeeList);
});
// app.patch("/saram", (req, res)=>{
//     console.log("GET - /saram 요청");
// res.send(employeeList);
// });

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`서버 실행 중>>> http://localhost:${app.get("port")}`);
});
