const animal = {
    leg : 4,
    tail : 1,
    say() {
        console.log("I have 4 legs 1 tail");
    }
}

const dog = {
    sound: 'mung',
    happy: true
}

dog.__proto__ = animal;

const cat = {
    sound : 'yaong'
}

cat.__proto__ = dog;

// 찾는 프로퍼티가 없으면 프로토타입의 프로퍼티에서 찾는다. (최상위 프로토타입까지 거슬러 올라감) 
console.log(cat.happy);
console.log(cat.leg);