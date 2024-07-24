/**
 *  axios 모듈 - Promise반환, async/await 사용가능 --> 비동기 처리 강점
 *  + 부가기능, CSRF 보호기능, JSON 형식 자동 변환 가능.
 * 
 *  axios로 요청을 보내는 방법
 *  case1. axios(url, [, config])
 *      GET 요청 전송
 *      axios('/user/1234')
 * 
 *  case2. axios(config)
 *      POST 요청 전송
 *      axios({
 *          method: 'post',
 *          url: '/user/12345',
 *          data: {
 *              firstname: 'Fn',
 *              lastname: 'Ln'
 *          }
 *      });
 * 
 *  case3. axios.method(url[, data[, config]])
 *      axios.get(url[, config])            // GET
 *      axios.post(url[, data[, config]])   // POST
 *      axios.put(url[, data[, config]])    // PUT
 *      axios.patch(url[, data[, config]])  // PATCH
 *      axios.delete(url[, config])         // DELETE
 *      axios.request(config)
 *      axios.head(url[, config])
 *      axios.options(url[, config])
 * 
 * 
 *  redis v4의 비동기 처리
 *  v4부터는 Promise 객체를 반환한다. 따라서 async/await으로 처리를 반드시 해야 함
 *  
 * forEach() 메서드는 내부에 await 키워드 동작하지 않음 => 각 비동기 호출이 병렬적으로 실행되기 때문.
 * 따라서 for..of 문을 사용하면 내부에 await 키워드가 올바르게 동작함.
 */


// 에어코리아 API 사용
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

/* 라우팅 설정 */
app.get('/airkorea', async (req, res) => {
    if (!clientConnected) {
        await client.connect();
        clientConnected = true;
    }
    try {
        const cachedItems = await client.lRange('airItems', 0, -1);
        if(cachedItems.length){
            res.send(`데이터가 캐시에 있습니다. <br>
                관측 지역: ${cachedItems[0]} / 관측 시간: ${cachedItems[1]} <br>
                미세먼지: ${cachedItems[2]} 초미세먼지: ${cachedItems[3]} 입니다.`);
        } else {
            const serviceKey = process.env.airServiceKey;
            const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
            let params = encodeURI('serviceKey') + '=' + serviceKey;
            params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
            params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
            params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
            params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
            params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
            params += '&' + encodeURI('returnType') + '=' + encodeURI('json');

            const url = airUrl + params;

            try{
                const result = await axios.get(url);
                // ** axios로 받은 결과는 .data를 붙여줘야함
                
                const airItem = {
                    "location": "마포구",
                    "time": result.data.response.body.items[0]["dataTime"],
                    "pm10": result.data.response.body.items[0]["pm10Value"],
                    "pm25": result.data.response.body.items[0]["pm25Value"]
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
                for(const val of airItems){
                    await client.rPush('airItems', val);
                }
                await client.expire('airItems', 60 * 60);
                res.send('캐시된 데이터가 없습니다.');
            } catch(error) {
                console.error('Error fetching data from API:', error);
                res.status(500).send('Internal Server Error');
            }
        }
    } catch (error){
        console.error('Error reading from Redis:', error);
        res.status(500).send('Internal Server Error');
    }
});

/* 서버와 포트 연결 */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중...');
})