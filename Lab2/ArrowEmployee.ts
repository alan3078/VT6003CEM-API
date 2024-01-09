class Person2 {
    #first: string;
    #last: string;

    constructor(firstname: string, lastname: string){
        if (firstname === undefined || lastname === undefined) {
			throw new Error('missing parameter');
		}
		this.#first = firstname;
		this.#last = lastname;

    }

    name = () => {
        return `${this.#first}, ${this.#last}`
    }
}

class Employee2 extends Person2 {
    #joinedDate: Date;
    #grade: number;

	constructor(firstname: string, lastname: string, grade: number = 1) {
		super(firstname, lastname);
		this.#joinedDate = new Date();
		this.#grade = grade;
	}

	calculateSalary = (months:number  = 1) => {
		return this.#grade * 1000 * months;
	}

}

const e2 = new Employee2('Luke', 'Skywalker', 20);
console.log(`Employee ${e2.name()}'s 10 months salary is ${e2.calculateSalary(10)}`);
