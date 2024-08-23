const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

app.set("port", 3000);
// app.set("views", path.join(__dirname, "views")); // 절대경로 // 작업디렉토리가 바뀐다면 이게 나을 수 있음
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
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

let cnt = 1;
console.log(`되나? ${cnt++}}`);
// 임시 데이터
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

// 쇼핑몰 상품 목록

// 몽고 db 에서는 primary key를 id // id는 숫자이더라도 문자열로 두긴한다.
// row 라고 안하고 document라고 한다..
// 여기서 carList 는 컬렉션이라고 말한다..
// 물리적 단계? 논리적 단계로 넘어가서 쓸 수 있다..
const carList = [
  {
    _id: 111,
    name: "SM5",
    price: 3000,
    year: 1999,
    company: "SAMSUNG",
    img: "",
  },
  { _id: 112, name: "SM7", price: 5000, year: 2013, company: "SAMSUNG" },
  { _id: 113, name: "SONATA", price: 3000, year: 2023, company: "SAMSUNG" },
  { _id: 114, name: "GRANDEUR", price: 4000, year: 2022, company: "HYUNDAI" },
  { _id: 115, name: "BMW", price: 6000, year: 2019, company: "BMW" },
  { _id: 116, name: "SONATA", price: 3000, year: 2023, company: "SAMSUNG" },
];
let carCnt = 117;

console.log(`되나? ${cnt++}}`);

//뷰 엔진 없이 fs 모듈을 이용한 뷰 렌더링
// router.route("/text").get(function (req, res) {
//   console.log("test ejs");
//   fs.readFile("views/test.ejs", "utf8", function (err, data) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(ejs.render(data));
//   });
// });

router.route("/home").get((req, res) => {
  req.app.render("home/Home", {}, (err, html) => {
    if (err) {
      console.error(err);
      // res.status(500).send("Error rendering the page");
      res.status(500).send(JSON.stringify(err));
      console.log(JSON.stringify(err));
      const test = JSON.stringify(err);
      console.log(test);
    } else {
      res.end(html);
    }
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

// 예시 uri 상품정보 라우팅
// router.route("/process/product").get((req, res) => {
//   console.log("/process/product 호출.");

//   if (req.session.user === undefined) {
//     res.redirect("/public/login2.html");
//   } else {
//     res.redirect("/public/product.html");
//   }
// });

router.route("/member").get((req, res) => {
  // 로그인이 되어있다면 member 페이지를 보여준다.
  // 쿠키는 사용자쪽에 전달(res), 세션은 요청 들어올때 생성(req)
  if (req.session.user !== undefined) {
    const user = req.session.user;
    // TODO: 로그인이 안된상태 처리
    req.app.render("member/Member", { user }, (err, html) => {
      // 렌더링시 객체 전달
      res.end(html);
    });
  } else {
    res.redirect("/login");
  }
});

router.route("/login").get((req, res) => {
  req.app.render("member/Login", {}, (err, html) => {
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
  // console.log(req.body);
  //TODO: 검증 넣기

  // TODO: 클라에서 받은거 저장시켜 전달하기
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
  } else {
    console.log("존재하지 않는 계정입니다.");
    res.redirect("/login");
  }
  // req.app.render("member/Login", {}, (err, html) => {
  //   res.end(html);
  // });
});

router.route("/logout").get((req, res) => {
  console.log("/process/logout 호출됨.");
  //로그인 된 상태
  if (!req.session.user) {
    console.log("아직 로그인 전 상태입니다.");
    res.redirect("/login");
    return;
  }

  // 세션의 user 정보를 제거해서 logout 처리
  req.session.destroy((err) => {
    if (err) throw err;
    console.log("로그아웃 성공!");
    res.redirect("/login");
  });
});

// Promise 방식
// router.route("/logout").get(async (req, res) => {
//   console.log("/process/logout 호출됨.");
//   if (req.session.user) {
//     //로그인 된 상태
//     if (!req.session.user) {
//       console.log("아직 로그인 전 상태입니다.");
//       res.redirect("/login");
//       return;
//     }
//   }

//   // 세션의 user 정보를 제거해서 logout 처리
//   await req.session.destroy();
// });

router.route("/joinus").get((req, res) => {
  // 회원 가입 ejs 페이지 forward
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/joinus").post((req, res) => {
  // 회원 가입 처리 후 목록으로 갱신
  res.redirect("/member");
});

// ----- 쇼핑몰 기능
router.route("/shop").get((req, res) => {
  req.app.render("shop/Shop", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/shop/insert").get((req, res) => {
  req.app.render("shop/Insert", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/shop/modify").get((req, res) => {
  const _id = parseInt(req.query._id);
  console.log(_id);
  const idx = carList.findIndex((car) => _id === car._id);
  console.log(idx);
  if (idx === -1) {
    console.log("상품이 존재 하지 않습니다.");
    res.redirect("/shop");
    return;
  }
  req.app.render("shop/Modify", { car: carList[idx] }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
router.route("/shop/modify").post((req, res) => {
  console.log("POST - /shop/modify 호출");
  console.dir(req.body);
  res.redirect("/shop");
});

router.route("/shop/detail").get((req, res) => {
  // 쿼리로 전송된 데이터는 모두 문자열이다.
  // parseInt() 필수 "56" <-- 이런 문자열 숫자를 numeric 이라 한다..
  const _id = req.query._id;
  const idx = carList.findIndex((car) => _id === car._id);
  if (idx === -1) {
    console.log("상품이 존재 하지 않습니다.");
    res.redirect("/shop");
    return;
  }
  req.app.render("shop/Detail", { car: carList[idx] }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
// router.route("/shop/delete").get((req, res) => {
//   req.app.render("shop/Delete", {}, (err, html) => {
//     res.end(html);
//   });
// });
// router.route("/shop/cart").get((req, res) => {
//   req.app.render("shop/Cart", {}, (err, html) => {
//     res.end(html);
//   });
// });

console.log(`되나? ${cnt++}}`);
app.use("/", router);

console.log(`되나? ${cnt++}}`);
// 라우터 설정이 끝나고 나서 들어가야 됨
// 등록되지 않은 패스에 대해 페이지 오류 응답
// app.use("*", (req, res) => {
//   res.status(404).send(`<h1>Error - 페이지를 찾을 수 없습니다</h1>`);
// });

const expressErrorHandler = require("express-error-handler");

const errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`server start: http://localhost:${app.get("port")}`); // 최신문법 쓸때는 호환이 되ㅡㄴ지 확인해보자
});
