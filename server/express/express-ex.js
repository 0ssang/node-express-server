const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.static(process.cwd() + '/public'));

/**
 * 응답을 위한 함수
 * res.sned(): 문자열로 응답
 * res.json(): json 객체로 응답
 * res.render(): Jade, Pug와 같은 템플릿을 렌더링하여 응답
 * res.sendFile(): 파일로 응답
 */

app.get('/', (req, res) => {
    const output = `
        <h2>express web</h2><br>
        <p>main page</p><br>
        <img src="./cookie.png" width="400px" height="700px" />
    `;
    res.send(output);
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id + "님의 개인 페이지 입니다.");
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중...');
});