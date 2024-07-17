// 콜백함수 동기처리
//1. js 내장함수 기준
setTimeout(() => {
    setTimeout(() => {
        setTimeout(() => {
            console.log('todo: Third work!');
        },1000);
        console.log('todo: Second work!');
    }, 2000);
    console.log('todo: First work');
}, 3000);

// 총 실행시간 == 3+2+1 초
// result => 동기처리됨
// but 가독성 떨어지고 콜백지옥 생김


//2. 사용자 정의 함수 
function fakeSetTimeOut(callback){
    callback();
}

console.log(0);
fakeSetTimeOut(function () {
    console.log("Hello");
});

console.log(1);
// result => 0,Hello,1 동기처리됨
// but 콜백 큐를 거치지 않고 모두 콜 스택만 거쳐서 실행됨
// why? 같은 콜백함수 형태이지만 js 내장함수인 SetTimeOut은 웹 브라우저가 제공하는 API이므로 동작을 외부(백그라운드)에 맡김. 따라서 콜백 큐를 거치게 됨
// 즉, 콜백은 나중에 실행하라고 인자로써 다른 함수에 넘겨주는 것으로 콜백을 받은 함수의 역할에 따라 동기/비동기 처리함
// 내부연산은 동기적 처리, 외부연산은 비동기적 처리
// 외부연산 : 타이머, 서버에서 데이터 받아오기 등 외부 API 사용시.