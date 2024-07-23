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
 */


// 에어코리아 API 사용
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(process.cwd(), "/.env") });
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
app.get('/airkorea', async (req, res) => {
    const serviceKey = process.env.airServiceKey;
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    let params = encodeURI('serviceKey') + '=' + serviceKey;
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    params += '&' + encodeURI('stationName') + '=' + encodeURI('강서구');
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + params;

    try{
        const result = await axios.get(url);
        // ** axios로 받은 결과는 .data를 붙여줘야함
        res.json(result.data);
    } catch (error) {
        console.log(error);
    }
});

/* 서버와 포트 연결 */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중...');
})