import axios from 'axios';

const addressLocation = async (address: string) => {
  const url = `https://api.maptiler.com/geocoding/${address}.json?key=[Your API Key]`;
  try {
    const {data, status} = await axios.get(url, {});
    console.log(`${status}`);
    console.log(data)  // JSON Object
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return err.message;
    } else {
      return err;
    }
  }
}

try {
	if (process.argv.length < 3) {
		throw 'missing parameter';
	}
  
	let address = process.argv[2];
	/* we need to remove the single quotes from the string */
	address = address.replace(/'/g,'');
	addressLocation(address).then((data)=> {
    console.log(`${data.features[0].center}, ${data.features[0].place_name}`);
  })
} catch(err: any) {
	console.log(err);
}
