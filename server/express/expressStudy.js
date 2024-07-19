const express = require('express');
const app = express();

/*
    http 모듈의 res객체 메서드 write() 대신 express의 res객체의 send()메서드를 통해 데이터를 전달함
    write() + end() 기능을 모두 수행하고 기존http 모듈을 상속받으므로 express 모듈 객체를 사용하는 것이 편함
*/

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('8080 포트에서 실행중 ...');
});

