/* 미들웨어 통합테스트 */

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(express.static(process.cwd() + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234'));
app.use(session({
    secret: 'secret@1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
    // name: 'connect.sid' 세션 쿠키의 Name 지정. default = connect.sid
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* 라우팅 설정 */
app.get('/', (req, res) => {
    if(req.session.name) {
        const output = `
            <h2>로그인한 사용자님</h2><br>
            <p>${req.session.name}님 안녕하세요.</p><br>
        `
        res.send(output);
    } else {
        const output = `
            <h2>로그인하지 않은 사용자입니다.</h2><br>
            <p>로그인 해주세요.</p><br>
        `
        res.send(output);
    }
});

app.get('/login', (req, res) => { // 실제 구현시 post
    console.log(req.session);
    // 쿠키를 사용할 경우 쿠키에 값 설정
    // res.cookie(name, vlaue, options)

    // 세션 쿠키를 사용할 경우
    req.session.name = '조영상';
    res.end('Login Ok');
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid'); // 세션 쿠키 삭제
    res.end('Logout Ok');
});

/* 서버와 포트 연결 */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중...');
});