/**
 *  axios 모듈 - Promise반환, async/await 사용가능 --> 비동기 처리 강점
 *  + 부가기능, CSRF 보호기능, JSON 형식 자동 변환 가능.
 */


// 에어코리아 API 사용
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();
