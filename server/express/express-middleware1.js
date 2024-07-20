const express = require('express');
const app = express();

/**
 * middleware는 위에서 아래로 실행되므로 순서가 중요함
 * res.send()가 끝나고 응답을 종료해버리기 때문에 myLogger()까지 도달하기 위해 next() 함수를 추가함
 * 
 * next(): 다음 미들웨어로 가는 역할
 * next(error): 오류 처리 미들웨어로 가는 역할
 * next('route'): 같은 라우터에서 분기처리를 할 때 사용
 */


app.get('/', (req, res, next) => {
    res.send('Hello world');
    next();
});

const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
};

app.use(myLogger);

app.listen(8080);