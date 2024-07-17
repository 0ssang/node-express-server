const people = {
    name : 'youngsang',
    say : function () {
        console.log(this);
    }
}

people.say();

// this를 객체로 고정하고 싶다면 bind(object)를 사용하여 주입 가능
// **But 화살표 함수에서는 bind()를 사용해도 this 주입 불가능
const sayPeople = people.say.bind(people);
sayPeople();