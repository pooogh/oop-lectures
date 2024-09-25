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
        } else {
            return false;
        }
    }

    attack(target) {
        console.log(`\n${this.name} атакует ${target.name}`);
        if (this.tools.length === 0) {
            console.log(`${this.name} пытается атаковать, но теперь руками, соре.`);
        } else {
            console.log(`${this.name} использует инструмент ${this.tools.at(0).name}`);
        }
        let tool = this.tools.at(0) || 0; // выбор предмета (объект)
        let toolDamage = tool.damage; // вытащили урон оружия

        if (tool.use()) {
            let isKilled = target.takeDamage(this.damage + toolDamage);
            if (isKilled) {
                target = null;
            }
        }
    }

    loot() {

    }

    addTool(tool) {
        this.tools.push(tool);
    }

    getToolList() {
        const list = this.tools.map(({name, durability}) => `${name}, ${durability}`)
        console.log(`${this.name} имеет в багаже: ${list.join('; ')}`);
    }

}

// дочерние классы
export class Apache extends TribeMember {
    constructor(name) {
        // обращаемся к конструктору TribeMember
        super(name);
        this.className = 'apache';
        this.farmingSkill = 60 + Math.round(Math.random() * 40);
        if (this.health >= 40) {
            this.health = Math.round(Math.random() * 40)
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
        const list = this.tools.map(({name, durability}) => `${name}, ${durability}`)
        console.log(`${this.name} имеет в багаже: ${list.join('; ')}`);
    }
}

// создаем класс реднеков (здоровье выше 60, навык войны)
export class Redneck extends TribeMember {
    constructor(name) {
        // обращаемся к конструктору TribeMember
        super(name);
        this.className = 'redneck';
        this.warSkill = 60 + Math.round(Math.random() * 40);
        if (this.health <= 40) {
            this.health = 60 + Math.round(Math.random() * 40)
        }
    }

    getDescription() {
        this.getInfo();
        console.log(`Абориген ${this.name} живет в племени Реднек, имеет навык войны ${this.warSkill}`);
    }
}
// создадим класс оружия
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
        } else {
            console.log(`${this.name} сломан, больше не используется.`);
            return false;
        }
    }
}

export class Weapon extends Item {
    constructor(name) {
        super(name);
        this.className = 'weapon';
        this.durability += 3;
        this.damage += Math.round(Math.random() * 5);
    }
}

export class Tools extends Item {
    constructor(name) {
        super(name);
        this.className = 'tool';
    }
}

const Vitaly = new Apache('Vitaly');
Vitaly.getDescription();
const Daniil = new Redneck('Daniil');
Daniil.getDescription();
// console.log(Vitaly);

const motiga = new Tools('motiga');
const shovel = new Tools('shovel');
Vitaly.addTool(motiga);
Vitaly.addTool(shovel);
Vitaly.getToolList();

const axe = new Weapon('axe');
Daniil.addTool(axe);
Daniil.getToolList();

Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
Vitaly.attack(Daniil);
console.log(Daniil);





// общий класс аборигены - имя, здоровье, возраст, предметы; методы: получаем урон, атакуем, лутаем, инфо
// апаче - навык земледелия
// реднеки - навык войны
// общий класс предметы - название, прочность, урон
// инструменты - --//--
// оружие - доп урон