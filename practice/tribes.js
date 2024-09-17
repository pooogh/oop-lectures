// абстракция
class TribeMember {
    // создаем конструктор объекта
    constructor(name) {
        this.name = name;
        this.age = Math.round(Math.random() * 100);
        this.health = Math.round(Math.random() * 100);
    }

    getInfo() {
        console.log(`Абориген ${this.name}, ему ${this.age} лет и его здоровье равно ${this.health}`);
    }    
}

// дочерние классы
class Apache extends TribeMember {
    constructor(name) {
        // обращаемся к конструктору TribeMember
        super(name);
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

// создадим класс оружия
class Item {
    constructor(name) {
        this.name = name;
        this.durability = Math.round(Math.random() * 5);
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

class Weapon extends Item {
    constructor(name) {
        super(name);
        this.durability += 3;
    }
}

class Tools extends Item {
    constructor(name) {
        super(name);
    }
}

const Vitaly = new Apache('Vitaly');
Vitaly.getDescription();
const Daniil = new TribeMember('Daniil');
console.log(Vitaly)

const motiga = new Tools('motiga');
const shovel = new Tools('shovel');
Vitaly.addTool(motiga);
Vitaly.addTool(shovel);
Vitaly.getToolList();
