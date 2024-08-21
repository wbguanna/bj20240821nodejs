// Promise를 상속받아 만들 수도 있다..

// console.log("then 화살표함수 this, setTimeout 화살표함수");
// new Promise((fulfill, reject) => {
//   console.log("1. Task1 시작");
//   let num = 0;
//   setTimeout(() => {
//     num = 1004;
//     fulfill("Task1 결과", num);
//     // 여기서 this 라면
//     console.log(this);
//   }, 300);
//   console.log("2. Task1 끝", num);
// }).then((result) => {
//   console.log("fullfilled 함수 : ", result.data, result.num);
//   console.log(this);
// });

console.log("then 함수 this, setTimeout 함수");
new Promise((fulfill, reject) => {
  console.log("1. Task1 시작");
  let num = 0;
  setTimeout(function () {
    num = 1004;
    fulfill("Task1 결과", num);
    // 여기서 this 라면
    console.log(this);
  }, 300);
  console.log("2. Task1 끝", num);
}).then(function (result) {
  console.log("fullfilled 함수 : ", result.data, result.num);
  console.log(this);
});
