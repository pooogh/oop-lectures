class Item {
  constructor(name) {
    this.name = name;
    this.durability = 100;
    // Math.round(Math.random() * 5);
    this.damage = 5;
  }

  use() {
    if (this.durability > 0) {
      this.durability -= 1;
      console.log(`${this.name} использован. Осталось ${this.durability} использований`);
      return true;
    }
    console.log(`${this.name} сломан, больше не используется.`);
    return false;
  }
}

export default Item;
