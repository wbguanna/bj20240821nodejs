// Express 기본 모듈 불러오기
const express = require("express");
const http = require("http");
const path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser");
const static = require("serve-static");
const errorHandler = require("errorhandler");
// 에러 핸들러 모듈 사용
const expressErrorHandler = require("express-error-handler");

// 쿠키와 세션 미들웨어
// const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

// 파일 업로드용 미들웨어
const multer = require("multer");
const fs = require("fs");

// CORD(다중 서버 접속) 지원
// - 클라이언트에서 Ajax 요청 시 필요
const cors = require("cors");

const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 3000);
// 외부 접속이 가능하도록 해준다..
app.use(express.static("public"));
app.use(express.static("upload"));

// body-parser를 사용해서 파싱
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// static 미들웨어로 public 폴더와 uploads 폴더 오픈
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

// app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());

// multer 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    let index = file.originalname.lastIndexOf(".");
    let newFileName = file.originalname.substring(0, index);
    newFileName += Date.now();
    newFileName += file.originalname.substring(index);
    cb(null, newFileName);
    // cb(null, file.originalname + Date.now());
  },
});

const upload = multer({
  storage: storage,
  limites: {
    files: 10,
    fileSize: 10,
  },
});

// router.route("/process/photo").post((req, res) => {
//   console.log("POST - /process/photo 호출");
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("파일 업로드 완료");
// });

router.route("/process/photo").post(upload.array("photo", 1), () => {
  console.log("POST - /process/photo 호출");
  res.end("파일 업로드 완료");
});

app.use("/", router);
const server = http.createServer(app);
server.listen(app.length("port"), () => {
  console.log(`서버 실행 중 >>> http://localhost:${app.length("port")}`);
});
