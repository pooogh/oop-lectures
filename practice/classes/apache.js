import TribeMember from './tribes.js';

class Apache extends TribeMember {
  constructor(name) {
    // обращаемся к конструктору TribeMember
    super(name);
    this.className = 'apache';
    this.farmingSkill = 60 + Math.round(Math.random() * 40);
    if (this.health >= 40) {
      this.health = Math.round(Math.random() * 40);
    }
    this.tools = [];
  }

  getDescription() {
    this.getInfo();
    console.log(`Абориген ${this.name} живет в племени Апаче, имеет навык земледелия ${this.farmingSkill}`);
  }

  addTool(tool) {
    this.tools.push(tool);
  }

  getToolList() {
    const list = this.tools.map(({ name, durability }) => `${name}, ${durability}`);
    console.log(`${this.name} имеет в багаже: ${list.join('; ')}`);
  }
}

export default Apache;
