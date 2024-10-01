import Item from './item.js';

class Weapon extends Item {
  constructor(name) {
    super(name);
    this.className = 'weapon';
    this.durability += 3;
    this.damage += Math.round(Math.random() * 5);
  }
}

export default Weapon;
