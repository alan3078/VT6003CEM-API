class Coffee {
	#roast: string;
	#ounces: number;	

	constructor(roast?: string, ounces = 8) { 
		if(roast === undefined) {
			throw Error('No roast defined');
		}

		this.#roast = roast;
		this.#ounces = ounces;
	}

	getSize = () => {
		if (this.#ounces === 8) {
			return 'Small';
		} else if (this.#ounces === 12) {
			return 'Medium';
		} else if (this.#ounces === 16) {
			return 'Large';
		} else 
			return 'undefined';
	}

	order = () => {
		let msg;	
		msg = `You've ordered a ${this.getSize()} ${this.#roast} coffee.`;
		return msg;
	}
}

export default Coffee;