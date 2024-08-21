var http = require("http");

var server = http.createServer();
server.listen(3000, () => {
  console.log("server started http://localhost:3000");
});

// html 템플릿
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Node.js 응답</title>
</head>
<body>
    <h1>Node.js 응답</h1>
</body>
</html>
`;

let count = 0;
server.on("request", (req, res) => {
  console.log("클라이언트 요청이 들어왔습니다.");

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(html);
  // console.log(++count);
  // res.end();
  // res.write()는 여러번 호출 가능,
});
