import axios from 'axios';
import { API_KEY } from './env';

type CurrencyResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};

const exchange = async (baseSymbol: string, symbol: string) => {
  const url = `https://api.apilayer.com/fixer/latest?base=${baseSymbol}&symbols=${symbol}`;
  const options = {
    url: url,
    headers: {
      apikey: API_KEY,
    },
  };
  try {
    const { data, status } = await axios.get(url, options);
    console.log(`${status}`);
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
  } else {
    const baseSymbol = process.argv[2].toUpperCase();
    const symbol = process.argv[3].toUpperCase();
    exchange(baseSymbol, symbol).then((data: CurrencyResponse) => {
      if (data.success === false)
        throw new Error(`invalid base code ${baseSymbol} with currency code ${symbol}`);

      const rates = {
        [symbol]: data.rates[symbol].toFixed(2),
      };

      const result = { ...data, rates };

      console.log(result);
    });
  }
} catch (err: any) {
  console.log(`${err} Usage: currency [toSymbols]`);
}
