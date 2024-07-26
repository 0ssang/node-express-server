const express = require('express');
const app = express();

// /:뒤에 path는 어떤 것이든 올 수 있음
// 들어온 변수는 req.params에 저장되는 라우트 파라미터임
app.get('/:type', (req, res) => {
    let {type} = req.params;
    res.send(type);
});

app.listen(8080);