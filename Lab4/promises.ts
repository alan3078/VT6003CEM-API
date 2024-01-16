import axios from 'axios';
import * as readline from 'readline-sync';
import { FIXER_API_KEY } from './env';

const url = 'https://api.apilayer.com/fixer';
const key = FIXER_API_KEY;

const getInput = (question: string) =>
  new Promise<string>((resolve) => {
    const convertTo: string = readline.question(question);
    resolve(convertTo.toUpperCase());
  });

const getAmount = (question: string) =>
  new Promise<number>((resolve) => {
    const amount: string = readline.question(question);
    const amountNum = Number(amount);
    resolve(amountNum);
  });

const checkValidCurrencyCode = (code: string) => {
  console.log('Checking Valid Currency Code...');
  return new Promise<string>((resolve, reject) => {
    axios
      .get(`${url}/symbols`, {
        headers: {
          apikey: key,
        },
      })
      .then(({ data, status }) => {
        if (status === 200) {
          const currency = data.symbols;
          if (!currency.hasOwnProperty(code)) reject(new Error(`invalid currency code ${code}`));
          else resolve(code);
        }
        reject('Connection Error');
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getData = (code: string, amount: number) => {
  console.log('Retrieving the rate...');
  console.log({code, amount});
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/latest?base=HKD&symbols=${code}`, {
        headers: {
          apikey: key,
        },
      })
      .then(({ data, status }) => {
        if (status === 200) {
          const rate = Number(Object.values(data.rates)[0]);
          const convertedAmount = (rate * amount).toFixed(2);
          console.log(convertedAmount);
          resolve(convertedAmount);
        } else {
          reject('Connection Error');
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const printObject = (data: any) =>
  new Promise<any>((resolve) => {
    const indent = 2;
    const str = JSON.stringify(data, null, indent);
    console.log(Object.values(data.rates)[0]);
    resolve(null);
  });

const exit = () =>
  new Promise(() => {
    process.exit();
  });

getInput('enter currency: ')
  .then(checkValidCurrencyCode)
  .then((code) => getAmount('enter amount: ').then((amount) => getData(code, amount)))
  .then(printObject)
  .then(exit)
  .catch((err) => console.error(`error: ${err.message}`))
  .then(exit);
