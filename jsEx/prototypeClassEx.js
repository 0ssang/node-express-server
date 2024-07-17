// 프로토타입과 function, new를 통하여 클래스 흉내내기 가능


function Animal(){}
// 객체.prototype.속성키 = 속성값  을 통해 객체를 공유해서 사용가능
Animal.prototype.legs = 4;
Animal.prototype.tail = 1;

const dog = new Animal();
const cat = new Animal();
console.log(dog.legs);

// prototype을 사용하면 this보다 메모리 공간 절약 가능

