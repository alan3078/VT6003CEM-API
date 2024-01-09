abstract class Words {
    d: string [] = [];

    abstract read(count: number): string;
    abstract write(data: string): void;
  
    delete (idx: number): void {
        this.d.splice(idx, 1);
    }
}

class Drawer extends Words {
    read(count: number): string {
        return this.d[count];
    }

    write(data: string): void {
        this.d.push(data)
    }    
}

const box = new Drawer();

box.write('apple');
box.write('orange');
box.write('banana');
box.write('pear');
console.log(box.d)
box.delete(1);
console.log(box.d);
