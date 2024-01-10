class Coffee {
  #roast: string;
  #ounces: number;
  #shots: number;

  constructor(roast?: string, ounces = 8, shots = 0) {
    if (roast === undefined) {
      throw Error('No roast defined');
    }

    this.#roast = roast;
    this.#ounces = ounces;
    this.#shots = shots;
  }

  getSize = () => {
    switch (true) {
      case this.#ounces === 8:
        return 'Small';
      case this.#ounces > 9 && this.#ounces <= 12:
        return 'Medium';
      case this.#ounces > 12:
        return 'Large';
      default:
        return 'undefined';
    }
  };

  order = () => {
    let msg;
    msg = `You've ordered a ${this.getSize()} ${this.#roast} ${
      this.#shots >= 2 ? 'strong' : ''
    }coffee.`;
    return msg;
  };
}

export default Coffee;
