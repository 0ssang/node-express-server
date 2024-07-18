const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Node.js Server</h1>');
    res.end('<p>http 모듈 사용한 순정 서버</p>');
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결중 ..');
    });