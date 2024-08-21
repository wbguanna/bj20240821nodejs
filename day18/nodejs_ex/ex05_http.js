var http = require("http");

var server = http.createServer();

const port = 3000;

server.on("request", function (request, response) {
  response.end("Hello");
  // console.log(request);
  // response.end("Hello2");
  // console.log(response);
});

server.on("connection", function (session) {
  console.log("connection event");
  // console.log(session);
});
server.on("close", function () {
  console.log("close");
});

server.listen(port, () => {
  console.log("http://localhost:3000");
});
