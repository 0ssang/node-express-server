const express = require('express');
const path = require('path');

// path 모듈과 process.pwd()를 사용한 페이지 경로 설정
const app = express();
app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'pages', 'index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중... ');
});