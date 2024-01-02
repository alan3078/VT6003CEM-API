function largestNumber(a: number, b: number): any {
	if (a > b) return a;
	if (b > a) return b;
	return null;
}

const biggest: any = largestNumber(5, 8);
console.log(biggest);

// the code below achieves the same using the 'spread operator', passing with a tuple type
const nums: [number, number] = [5, 8];
const biggest2 = largestNumber(...nums);
console.log(biggest2);



// example using a rest parameter
function add(...values: number[]): number {
	let total:number = 0;
	console.log(values);
	for (let i:number=0; i<values.length; i++) {
		total += values[i];
	}
	return total;
}

const addNums: number = add(1, 2, 3, 4);
console.log(addNums);


// example with default parameter
function divide(dividend: number, divisor: number =1): number {
	const quotient: number = dividend / divisor
	return quotient
}

const quotient: number = divide(42, 2)
console.log(`calling the divide function with '2' paramters: ${quotient}`)

const quotient2: number = divide(42)
console.log(`calling divide function with '1' parameter: ${quotient2}`)

// function expression (1)
let remainder : (dividend: number, divisor: number) => number;
remainder = function(dividend: number, divisor: number) {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}

const rem: number = remainder(8, 5)
console.log(`remainder: ${rem}`)

// function expression (2) - Fat Arrow Function (Preferred)
const remainder2 = (dividend: number, divisor: number) => {
	const quotient = Math.floor(dividend / divisor)
	return dividend - quotient
}

console.log(remainder2(13, 4))
