const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
// const bodyParser = require("body-parser");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views")); // 절대경로 // 작업디렉토리가 바뀐다면 이게 나을 수 있음
app.set("views", "views"); // 상대경로 // 보안?
app.set("view engine", "ejs");

app.use(express.static("public")); // public 폴더 정적 제공

// 4.16.1 버전 이후로 bodyParser가 내장되어있다함..
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const memberList = [
  {
    no: 101,
    id: "user01",
    password: "1234",
    name: "홍길동",
    email: "hong@gmail.com",
  },
  {
    no: 102,
    id: "user01",
    password: "1234",
    name: "홍길동",
    email: "hong@gmail.com",
  },
  {
    no: 103,
    id: "user01",
    password: "1234",
    name: "홍길동",
    email: "hong@gmail.com",
  },
  {
    no: 104,
    id: "user01",
    password: "1234",
    name: "홍길동",
    email: "hong@gmail.com",
  },
];

let noCnt = 105;

app.get("/home", (req, res) => {
  req.app.render("home/Home", {}, (err, html) => {
    res.end(html);
  });
});

app.get("/gallery", (req, res) => {
  req.app.render("gallery/Gallery", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/member", (req, res) => {
  req.app.render("member/Member", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/profile", (req, res) => {
  req.app.render("profile/Profile", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/shop", (req, res) => {
  req.app.render("shop/Shop", {}, (err, html) => {
    res.end(html);
  });
});

app.get("/login", (req, res) => {
  req.app.render("member/Login", {}, (err, html) => {
    res.end(html);
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  //todo: 검증 넣기

  const idx = memberList.findIndex((member) => member.id === req.body.id);
  if (idx !== -1) {
    if (memberList[idx].password === req.body.password)
      console.log("로그인 성공");
    // 로그인 성공 확인후 세션에 로그인정보를 저장하게
    else console.log("로그인 실패!");
  }
  req.app.render("member/Login", {}, (err, html) => {
    res.end(html);
  });
});
app.get("/join", (req, res) => {
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});

app.post("/join", (req, res) => {
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`server start: http://localhost:${app.get("port")}`); // 최신문법 쓸때는 호환이 되ㅡㄴ지 확인해보자
});
