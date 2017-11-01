class Parent {
    constructor() {

    }
    test() {
        console.log("I am the parent");
    }
}

class Child extends Parent {
    constructor(){}

    
}

let myChild = new Child();
myChild.test();