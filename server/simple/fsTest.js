const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// *** 현재 작업 디렉토리를 콘솔에 출력 ***
console.log('Current working directory:', process.cwd());

http.createServer(async (req, res) => {
    try{
        const filePath = path.join(__dirname, 'fs_test.html');
        const f = await fs.readFile(filePath);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        // 200 이면 요청 성공
        res.end(f); // 요청 종료
    }catch (err){
        console.error(err); // 요청에 실패했을 경우 오류 출력
        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
        // 500 server error
        res.end(err.message); // 오류 메시지와 함께 요청 종료
    }
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중...');
    });