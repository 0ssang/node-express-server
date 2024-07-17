const animal = {
    leg : 4,
    tail : 1,
    say() {
        console.log("I have 4 legs 1 tail");
    }
}

const dog = {
    sound: "mung"
}

const cat = {
    sound: "yaong"
}

dog.__proto__ = animal;
cat.__proto__ = animal;

console.log(dog.leg);
console.log(cat.tail);