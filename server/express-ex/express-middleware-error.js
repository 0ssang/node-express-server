const express = require('express');
const app = express();

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('something broke!')
});

app.listen(3000);

/**
 * express로 서버를 만드는 일반적인 순서
 * 1. express 불러오기
 * 2. 포트 설정하기
 * 3. 공통적으로 사용하는 미들웨어 장착하기
 * 4. 라우터 구성
 * 5. 404 처리 미들웨어 구성
 * 6. 오류 처리 미들웨어 구성
 * 7. 생성한 서버 포트 리스닝
 */