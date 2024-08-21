function task1(fulfill, reject) {
  console.log("1. Task1 시작");
  let num = 0;
  setTimeout(function () {
    num = 1004;
    fulfill("Task1 결과", num);
  }, 300);
  console.log("2. Task1 끝", num);
}

function fullfilled(result, num) {
  console.log("fullfilled 함수", result, num);
}

function rejected(err) {
  console.log("rejected : ", err);
}

new Promise(task1).then(fullfilled, rejected);
