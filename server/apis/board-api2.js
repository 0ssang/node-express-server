const morgan = require("morgan");
const url = require("url");
const uuidAPIkey = require("uuid-apikey");
const cors = require('cors');

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors()); // 모든 라우터에 cors 적용

const key = {
    apiKey: "1EVRN2R-31W4XPY-HCFJR1T-6ZZDSBD",
    uuid: "0bb78a8b-1878-4edb-8b1f-2c0737fedcad"
};

let boardList = [];
let numOfBoard = 0;

app.get('/', (req, res) => {
    res.send('This is api.js');
});

// 게시글 api
app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        "id" : ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // 리스트에 새로운 요소 추가
    const board = {
        "id": +req.params.id,
        "user_id": req.params.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
    // req.params 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);
    res.redirect('/board');
});

/* 게시글 검색 API using uuid-key */
app.get('/board/:apikey/:type', (req, res) => {
    let {type, apikey} = req.params;
    const queryData = url.parse(req.url, true).query;

    if(uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)){
        if(type === 'search'){
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                return e.title.includes(keyword)
            })
            res.send(result);
        }else if (type === 'user'){
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        }else {
            res.send('Wrong URL');
        }
    } else {
        res.send('Wrong API Key');
    }
});

// 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중 ...');
});