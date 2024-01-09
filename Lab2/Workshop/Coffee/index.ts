import Coffee from "./coffee";

try {
	const coffee: Coffee = new Coffee('House Blend', 12);
	console.log(coffee.order());

	const darkRoast: Coffee = new Coffee('Dark Roast', 16);
	console.log(darkRoast.order());

	const specialBlend: Coffee = new Coffee('Special Blend', 200);
	console.log(specialBlend.order())

	const kenyan: Coffee = new Coffee('Kenyan')
	console.log(kenyan.order())

	const anon: Coffee = new Coffee()
	console.log(anon.order())
} catch(err) {
	console.log(`ERROR: ${err}`)
}
