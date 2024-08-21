function task1(callback) {
  console.log("1. Task1 시작");
  let num = 0;
  setTimeout(function () {
    num = 1004;
    // fulfill("Task1 결과", num);
    reject("Task1 에러");
    // 파일 IO
  }, 300);
  console.log("2. 이부분은 언제 실행될까", num);
}

function fullfilled(result, num) {
  console.log("fullfilled 함수", result, num);
}

function rejected(err) {
  console.log("rejected : ", err);
}

new Promise(task1).then(fullfilled, rejected);

console.log("1. 이 부분은 언제 실행 될까?");
