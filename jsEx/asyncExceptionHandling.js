// *** 비동기 상황에서의 예외 처리
// 비동기 상황에서는 오류가 발생하는 시점과 try가 감싸고 있는 시점이 일치하지 않으므로 try catch로 처리할 수 없음

// case 1. Promise의 .catch() 이용
function wait(sec){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

wait(3).catch(e => {
    console.log('1st catch ', e);
});

// chain은 같은 객체를 반환할 때만 가능함
wait(3).catch(e => {
    console.log('2nd catch ', e);
})
    .catch(e => {
        console.log('3rd catch ', e); // 실행 안됨
    });

// chain을 하고 싶을때
wait(3).catch(e => {
    console.log('4th catch ', e);
    throw e;
})
    .catch(e => {
        console.log('5th catch ', e);
    });

// case 2. Promise의 .then() 이용
wait(3).then(() => {
    console.log('Success');
}, e => {
    console.log('Catch in Then ', e);
})


// 3. async/await의 예외 처리
async function myAsyncFunc() {
    throw 'myAsyncFunc Error!';
}

function myPromiseFunc(){
    return new Promise((resolve, reject) => {
        reject('myPromiseFunc Error!')
    });
}

const result = myAsyncFunc().catch(e => console.log(e));
const result2 = myPromiseFunc().catch(e => console.log(e));

// await을 사용한 경우 try가 감싸고 있는 시점과 예외가 발생되는 시점이 일치하기 때문에 try-catch 문 사용 가능함
function wait2(sec){
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            reject('throw Error!!!!!!');
        }, sec * 1000);
    });
} 
async function myAsyncFunc2() {
    console.log(new Date());
    try {
        await wait2(2); //Promise를 기다리는 중....
    } catch(e){
        console.error(e);
    }
    console.log(new Date());
}

const result3 = myAsyncFunc2();

// 의도적으로 발생시킨 예외 말고 오타나 문법 오류에 의한 Uncaught 에러가 있으면서 Promise를 반환하는 함수는
// try catch 구문은 반환하는 Promise에 대한 오류만 잡기 때문에 .catch()를 이용해야 한다.

async function myAsyncFunc3() {
    consolejkdjfa.log(new Date()); // Uncaught
    const result = await wait2(2).catch(e => {
        console.error(e)
    });
    console.log(new Date());
}
// try {myAsyncFunc3();} catch(e) {} => x
myAsyncFunc3().catch(e); // => o