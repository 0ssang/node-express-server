// 일반 비동기 함수 실행 흐름
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
}

work(1, (result) => {
    console.log('첫 번째 작업', result);
});
work(1, (result) => {
    console.log('두 번째 작업', result);
});
work(1, (result) => {
    console.log('세 번째 작업', result);
});