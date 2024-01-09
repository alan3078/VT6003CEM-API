class Person1 {
    name: string

    constructor(name: string) {
        this.name = name;
        console.log(`Person constructor called ${name}`);
    }
}

const personInstance = new Person1('John Doe');