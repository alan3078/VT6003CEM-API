import * as readline from 'readline-sync';

const items: string[] = [];
let input: string;

do {
  input = String(readline.question('enter command: ')).trim();
  if (input.indexOf('add ') === 0 && !items.includes(input.substring(4).trim())) {
    const space: number = input.indexOf(' ');
    const item: string = input.substring(space).trim();
    console.log(`adding "${item}"`);
    items.unshift(item.toLowerCase());
  }

  if (input.indexOf('remove ') === 0 && !items.includes(input.substring(4).trim())) {
    const space: number = input.indexOf(' ');
    const item: string = input.substring(space).trim();
    const index: number = items.indexOf(item);
    if (index !== -1) {
      console.log(`removing "${item}"`);
      items.splice(index, 1);
    }
  }

  if (input.indexOf('list') === 0) {
    for (let i = 0; i < items.length; i++) {
      console.log(`${i}. ${items[i]}`);
    }
  }
} while (input !== 'exit');
