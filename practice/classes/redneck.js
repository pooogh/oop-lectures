import TribeMember from './tribes.js';

class Redneck extends TribeMember {
  constructor(name) {
    // обращаемся к конструктору TribeMember
    super(name);
    this.className = 'redneck';
    this.warSkill = 60 + Math.round(Math.random() * 40);
    if (this.health <= 40) {
      this.health = 60 + Math.round(Math.random() * 40);
    }
  }

  getDescription() {
    this.getInfo();
    console.log(`Абориген ${this.name} живет в племени Реднек, имеет навык войны ${this.warSkill}`);
  }
}

export default Redneck;
