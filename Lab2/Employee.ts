class Person {
    #first: string;
    #last: string;

    constructor(firstname: string, lastname: string){
        if (firstname === undefined || lastname === undefined) {
			throw new Error('missing parameter');
		}
		this.#first = firstname;
		this.#last = lastname;

    }

    name(): string {
        return `${this.#first}, ${this.#last}`
    }
}

class Employee extends Person {
    #joinedDate: Date;
    #grade: number;

	constructor(firstname: string, lastname: string, grade: number = 1) {
		super(firstname, lastname);
		this.#joinedDate = new Date();
		this.#grade = grade;
	}

	calculateSalary = (months:number  = 1): number => {
		return this.#grade * 1000 * months;
	}

}

const e1 = new Employee('Luke', 'Skywalker', 20);
console.log(`Employee ${e1.name()}'s 10 months salary is ${e1.calculateSalary(10)}`);
