// Express 기본 모듈 불러오기
const express = require("express");
const http = require("http");
const path = require("path");

// Express의 미들웨어 불러오기
const bodyParser = require("body-parser");
const static = require("serve-static");
// const errorHandler = require("errorhandler");
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
  limit: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

// router.route("/process/photo").post((req, res) => {
//   console.log("POST - /process/photo 호출");
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end("파일 업로드 완료");
// });

router.route("/process/photo").post(upload.array("photo", 1), (res, req) => {
  console.log("POST - /process/photo 호출");
  // console.log("/process/photo 호출됨.");
  try {
    var files = req.files;

    console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
    console.dir(req.files);
    console.dir(req.files[0]);
    console.dir("#=====#");

    // 현재의 파일 정보를 저장할 변수 선언
    var originalname = "",
      filename = "",
      mimetype = "",
      size = 0;

    if (Array.isArray(files)) {
      // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
      console.log("배열에 들어있는 파일 갯수 : %d", files.length);

      for (var index = 0; index < files.length; index++) {
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      } // end of  for
    } else {
      res.end("파일 업로드 완료");
      // else  부분 계속 이어서 작성 ....
      // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
      console.log("파일 갯수 : 1 ");

      originalname = files[index].originalname;
      filename = files[index].name;
      mimetype = files[index].mimetype;
      size = files[index].size;
    } // end  of  if~else

    console.log(
      "현재 파일 정보 : " +
        originalname +
        ", " +
        filename +
        ", " +
        mimetype +
        ", " +
        size
    );

    // 클라이언트에 응답 전송
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h3>파일 업로드 성공</h3>");
    res.write("<hr/>");
    res.write(
      "<p>원본 파일명 : " +
        originalname +
        " -> 저장 파일명 : " +
        filename +
        "</p>"
    );
    res.write("<p>MIME TYPE : " + mimetype + "</p>");
    res.write("<p>파일 크기 : " + size + "</p>");
    res.end();
  } catch (err) {
    console.dir(err.stack);
    res.error(err);
  } // end of try~catch
}); // end of router.route('/process/photo')

app.use("/", router);
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`서버 실행 중 >>> http://localhost:${app.get("port")}`);
});
