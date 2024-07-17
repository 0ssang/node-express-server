const people = {
    name : 'youngsang',
    say : function () {
        console.log(this);
    }
}
// people 객체가 호출했으므로 this => people 객체
people.say();

console.log("-----------------------------------------------------");

// 변수에 people.say 를 넣고 호출했으므로 this => Global 객체
const sayPeople = people.say;
sayPeople();

// this의 잘못된 사용을 방지하기 위해 Arrow Function을 적극 사용하자.