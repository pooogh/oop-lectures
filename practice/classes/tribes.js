// абстракция
class TribeMember {
  // создаем конструктор объекта
  constructor(name) {
    this.name = name;
    this.age = Math.round(Math.random() * 100);
    this.health = Math.round(Math.random() * 100);
    this.tools = [];
    this.damage = 7;
  }

  getInfo() {
    console.log(`Абориген ${this.name}, ему ${this.age} лет и его здоровье равно ${this.health}`);
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`${this.name} получил ${damage} урона. Здоровье: ${this.health}`);

    if (this.health <= 0) {
      console.log(`${this.name} умер, соре.`);
      return true;
    }
    return false;
  }

  attack(target) {
    console.log(`\n${this.name} атакует ${target.name}`);
    if (this.tools.length === 0) {
      console.log(`${this.name} пытается атаковать, но теперь руками, соре.`);
    } else {
      console.log(`${this.name} использует инструмент ${this.tools.at(0).name}`);
    }
    const tool = this.tools.at(0) || 0; // выбор предмета (объект)
    const toolDamage = tool.damage; // вытащили урон оружия

    if (tool.use()) {
      const isKilled = target.takeDamage(this.damage + toolDamage);
      // if (isKilled) {
      //   target = null;
      // }
    }
  }

  // loot() {

  // }

  addTool(tool) {
    this.tools.push(tool);
  }

  getToolList() {
    const list = this.tools.map(({ name, durability }) => `${name}, ${durability}`);
    console.log(`${this.name} имеет в багаже: ${list.join('; ')}`);
  }
}

export default TribeMember;
// дочерние классы

// создаем класс реднеков (здоровье выше 60, навык войны)

// создадим класс оружия

// общий класс аборигены - имя, здоровье, возраст, предметы;
// методы: получаем урон, атакуем, лутаем, инфо
// апаче - навык земледелия
// реднеки - навык войны
// общий класс предметы - название, прочность, урон
// инструменты - --//--
// оружие - доп урон
