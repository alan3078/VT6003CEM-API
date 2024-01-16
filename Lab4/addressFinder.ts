import axios from 'axios';
import { MAPTILER_API_KEY } from './env';

type AddressResponse = {
  type: string;
  features: Feature[];
  query: string[];
  attribution: string;
};

type Feature = {
  type: string;
  properties: any[];
  geometry: any[];
  bbox: any[];
  center: any[];
  place_name: string;
  place_type: any[];
  relevance: number;
  matching_text: string;
  matching_place_name: string;
  context: any[];
  id: string;
  text: string;
};

const addressLocation = async (address: string) => {
  const url = `https://api.maptiler.com/geocoding/${address}.json?key=${MAPTILER_API_KEY}`;
  try {
    const { data, status }: { data: AddressResponse; status: any } = await axios.get(url, {});

    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return err.message;
    } else {
      return err;
    }
  }
};

try {
  if (process.argv.length < 3) {
    throw 'missing parameter';
  }

  let address = process.argv[2];
  /* we need to remove the single quotes from the string */
  address = address.replace(/'/g, '');
  addressLocation(address).then((data: AddressResponse) => {
    // console.log(`${data.features[0].center}, ${data.features[0].place_name}`);
    const { center } = data.features[0];
    console.log(`longitude: ${center[0]}, latitude: ${center[1]}, ${data.features[0].place_name}`);

    const result = data.features.map(({ place_name, place_type }) => {
      return {
        place_name,
        place_type,
      };
    });

    console.log(result);
  });
} catch (err: any) {
  console.log(err);
}
