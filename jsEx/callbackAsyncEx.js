// 콜백함수의 비동기 처리

setTimeout(() => {
    console.log('todo: First work!');
}, 3000);

setTimeout(() => {
    console.log('todo: Second work!');
}, 2000);

setTimeout(() => {
    console.log('todo: Third work!');
}, 1000);

setTimeout(() => {
    console.log('todo: Fourth work!');
}, 4000);

// 결과 => 작업을 마치는 순서대로 처리됨 => 콜백함수는 비동기로 처리됨
// 실행 1초 후 : Third work!
// 실행 2초 후 : Second work!
// 실행 3초 후 : First work!
// 실행 4초 후 : Fourth work!