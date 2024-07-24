const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(process.cwd(), "/.env") });
const morgan = require('morgan');
const axios = require('axios');

/* express app generate */
const express = require('express');
const app = express();

/* redis connect */
const redis = require('redis');
const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});
let clientConnected = false;
client.on('error', (err) => {
    console.log('Redis Error : ' + err);
});
client.on('ready', () => {
    clientConnected = true;
    console.log('Redis client connected');
});


/* 포트 설정 */
app.set('port', process.env.PORT);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/redis/test', async (req, res) => {
  if (!clientConnected) {
    await client.connect();
    clientConnected = true;
  }
  try{
    const cachedItems = await client.lRange('airItems', 0, -1);
    if(cachedItems.length){
      res.send(`데이터가 캐시에 존재합니다. <br>
        관측 지역: ${cachedItems[0]} / 관측 시간: ${cachedItems[1]} <br>
        미세먼지: ${cachedItems[2]} 초미세먼지: ${cachedItems[3]} 입니다.`);
    } else {
      const airItem = {
        "location": "마포구",
        "time": "2024-07-24 20:14:12",
        "pm10": "12",
        "pm25": "15"
      };
      const badAir = [];
      if(airItem.pm10 <= 30) {
        badAir.push("좋음👍👍");
    }else if(airItem.pm10 > 30 && airItem.pm10 <= 80){
        badAir.push("보통😐😐");
    }else {
        badAir.push("나쁨☹️☹️");
    }
    if(airItem.pm25 <= 15){
        badAir.push("좋음");
    }else if(airItem.pm25 > 15 && airItem.pm25 <= 35){
        badAir.push("보통");
    }else {
        badAir.push("나쁨");
    }
    
    const airItems = [airItem.location, airItem.time, badAir[0], badAir[1]];
    for (const val of airItems) {
      await client.rPush('airItems', val);
    }
    await client.expire('airItems', 60 * 60);
    res.send('캐시된 데이터가 없습니다.')
    }
  } catch (error) {
    console.error('Error reading from Redis:', error);
    res.status(500).send('Internal Server Error');
  }
});


/* 서버와 포트 연결 */
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행중...');
});

