class Person {
    constructor (name) {
        this.name = name;
    }
    hello() {
        if (typeof this.name === 'string') {
            return 'Hello, I am ' + this.name + '!';
        } else {
            return 'Hello!';
        }
    }
}

var person = new Person('David Alberto Jimenez Noguera');

document.write(person.hello() + ', una pelusa!');