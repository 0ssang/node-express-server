const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

// html 페이지 내부에서 이미지를 사용할때 경로를 명시할 필요가 없어짐
// 경로를 다 명시하지 않으므로 보안에도 도움이 된다.
app.use(express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/pages/index2.html');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 실행중...');
});