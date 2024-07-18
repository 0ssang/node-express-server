// Promise의 인스턴스를 반환하고 then에서 반환한 값을 받는다.
function workP(sec) {
    // Promise 생성시 넘기는 callback함수 : resolve, reject
    // 동작 완료시 resolve 호출, 오류났을 경우 reject
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

// 동기적으로 실행됨
workP(1).then((result) => {
    console.log('첫 번째 작업', result);
    return workP(1);
}).then((result) => {
    console.log('두 번째 작업', result);
});