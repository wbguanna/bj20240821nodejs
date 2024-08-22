const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views")); // 절대경로 // 작업디렉토리가 바뀐다면 이게 나을 수 있음
app.set("views", "views"); // 상대경로 // 보안?
app.set("view engine", "ejs");

app.use(express.static("public")); // public 폴더 정적 제공

// 4.16.1 버전 이후로 bodyParser가 내장되어있다함..
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 쿠키 사용 미들웨어 설정
app.use(cookieParser());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

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

router.route("/home").get((req, res) => {
  req.app.render("home/Home", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/gallery").get((req, res) => {
  req.app.render("gallery/Gallery", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/profile").get((req, res) => {
  req.app.render("profile/Profile", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/shop").get((req, res) => {
  req.app.render("shop/Shop", {}, (err, html) => {
    res.end(html);
  });
});

// 예시 uri 상품정보 라우팅
router.route("/process/product").get((req, res) => {
  console.log("/process/product 호출.");

  if (req.session.user === undefined) {
    res.redirect("/public/login2.html");
  } else {
    res.redirect("/public/product.html");
  }
});

router.route("/member").get((req, res) => {
  // 로그인이 되어있다면 member 페이지를 보여준다.
  // 쿠키는 사용자쪽에 전달(res), 세션은 요청 들어올때 생성(req)
  if (req.session.user !== undefined) {
    const user = req.session.user;
    req.app.render("member/Member", { user }, (err, html) => {
      res.end(html);
    });
  } else {
    res.redirect("/login");
  }
});

router.route("/login").get((req, res) => {
  req.app.render("member/Login", {}, (err, html) => {
    // TODO: 클라에서 받은거 저장시켜 전달하기
    // 사용자(접속자)의 로컬에 쿠키가 저장된다.
    res.cookie("user", {
      id: "TestUser",
      name: "테스트 유저",
      authorized: true,
    });
    res.end(html);
  });
});

router.route("/login").post((req, res) => {
  console.log(req.body);
  //todo: 검증 넣기

  const idx = memberList.findIndex((member) => member.id === req.body.id);
  if (idx !== -1) {
    if (memberList[idx].password === req.body.password) {
      console.log("로그인 성공");
      // 로그인 성공 확인후 세션에 로그인정보를 저장하게
      // 세션에 로그인 정보 등록후 메인 페이지로 이동
      req.session.user = {
        id: req.body.id,
        name: memberList[idx].name,
        email: memberList[idx].email,
        no: memberList[idx].no,
      };
      res.redirect("/member");
    } else {
      console.log("로그인 실패!");
      res.redirect("/login");
    }
  }
  req.app.render("member/Login", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/logout").get((req, res) => {
  console.log("/process/logout 호출됨.");
  if (req.session.user) {
    //로그인 된 상태
  } else {
    //로그인 안된 상태
    req.session.destroy();
  }
});

router.route("/join").get((req, res) => {
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/join").post((req, res) => {
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});

app.use("/", router);

// 라우터 설정이 끝나고 나서 들어가야 됨
// 등록되지 않은 패스에 대해
app.use("*", (req, res) => {
  res.status(404).send(`<h1>Error - 페이지를 찾을 수 없습니다</h1>`);
});

const expressErrorHandler = require("express-error-handler");

const errorHandler = expressErrorHandler({
  static: {
    404: ["./public/404.html", "./public/resources/images/img404.PNG"],
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`server start: http://localhost:${app.get("port")}`); // 최신문법 쓸때는 호환이 되ㅡㄴ지 확인해보자
});
