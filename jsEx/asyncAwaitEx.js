// async/await 문법을 사용하면 Promise의 가독성을 보완하여 좀 더 동기코드와 유사하게 사용 가능
// try/catch 로 오류 처리 가능

function workP(sec){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('workP function');
        }, sec*1000);
    });
}

async function asyncFunc() {
    const result_workP = await workP(3);
    console.log(result_workP);
    return 'async Function';
}

asyncFunc().then((result) => {
    console.log(result);
});