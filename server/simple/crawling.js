/**
 * API가 없거나 제한이 있는 웹 페이지에서 정보를 가져오는 방법
 * 1. 크롤링 : 자동화된 방법으로 웹을 탐색하는 작업. 여러 개의 페이지를 수집해서 분류하는 것.
 * 2. 파싱 : 어떤 페이지에서 내가 원하는 데이터를 특정 패턴이나 순서로 추출하여 정보를 가공하는 작업.
 * 3. 스크래핑 : http를 통해 웹 사이트의 내용을 긁어와 원하는 형태로 가공하는 모든 작업.
 * Node.js에서 크롤링 및 파싱을 하기 위해 axios 모듈과 cheerio모듈이 필요.
 * 
 * cheerio는 axios의 결과로 받은 데이터에서 DOM Selector를 사용해서 필요한 데이터만 추출하는데 사용
 * 
 * cheerio 함수
 *  load(): html 문자열을 cheerio 객체로 반환한다.
 *  children(): html selector를 파라미터로 받은 뒤 cheerio 객체에서 선택된 html 문자열에 해당하는 모든 태그를 반환한다.
 *  each(): 콜백 함수를 파라미터로 받아 태그들이 담긴 배열을 순회하면서 콜백 함수를 실행한다.
 *  find(): html selector를 문자열로 받아 해당 태그를 반환한다.
 */

const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async () => {
    try{
        return await axios.get("https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C");
    } catch(error){
        console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div#searchList ol").children("li");

        $bodyList.each(function (i, elem){
            ulList[i] = {
                bookList: $(this).find('a').text(),
                url: $(this).find('a').attr('href'),
            };
        });

        const data = ulList.filter(n => n.bookList );
        return data;
    })
    .then(res => console.log(res));
