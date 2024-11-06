// паттерны - шаблоны обработки с какими-то логическими единицами ПО
// логич. единица - поле регистрации

class Registration {
    static def = {
        name: 'Ivan',
        surname: 'Ivanov',
        email: 'kek@kek.com',
        phone: '+79110950000', // регулярные выражения
        password: 'qwerty',
    }

    constructor(props = {}) {
        this.option = {...this.constructor.def, ...props};
    }

    validateName() {
        const {name, surname} = this.option;
        const check = {};
        if (name.length < 2) {
            check.nameLength = 'too small';
        }
        if (surname.length < 2) {
            check.surnameLength = 'too small';
        }

        const numbersName = name.split('').filter((char) => '0123456789'.includes(char));
        const numbersSurname = surname.split('').filter((char) => '0123456789'.includes(char));
        if (numbersName.length > 0) {
            check.nameContainNums = 'ne dolzhno bit cifr';
        }
        if (numbersSurname.length > 0) {
            check.surnameContainNums = 'ne dolzhno bit cifr';
        }
        return check;
    }
}

const natasha = new Registration({name: 'Natalia10', surname: 'Lyamina'});
console.log(natasha);
console.log(natasha.validateName());

// fluent interface (текучий или плавающий интерфейс)
class Gnomik {
    constructor() {
        this.height = Math.round(Math.random() * 70);
        this.entity = true;
        this.negativeEnergy = Math.round(Math.random() * 10);
    };

    setNegative(x) {
        this.negativeEnergy += x;
        return this;
    };

    changeEntity() {
        this.entity = !this.entity;
        return this;
    };
}

const almazIndigo = new Gnomik();
almazIndigo.setNegative(3).changeEntity().changeEntity();
// almazIndigo.changeEntity()
console.log(almazIndigo);


class Kolduni {
    constructor(list) {
        this.list = list;
    };

    filterByAge() {
        const newList = this.list.filter(({age}) => age >= 250);
        return new Kolduni(newList);
    };

    filterByIq() {
        const newList = this.list.filter(({iq}) => iq >= 150);
        return new Kolduni(newList);
    };
}

const listOfKolduni = [
    {name: 'Matvey', age: Math.round(Math.random() * 500), mana:  Math.round(Math.random() * 500), zdorovie:  Math.round(Math.random() * 1000), iq: Math.round(Math.random() * 300)},
    {name: 'Vladislav', age:  Math.round(Math.random() * 500), mana:  Math.round(Math.random() * 500), zdorovie: Math.round(Math.random() * 1000), iq: Math.round(Math.random() * 300)},
    {name: 'Nuray', age:  Math.round(Math.random() * 500), mana: 999, zdorovie: Math.round(Math.random() * 1000), iq: Math.round(Math.random() * 300)},
    {name: 'Natalia Aleksandrovna', age: Infinity, mana: Infinity, zdorovie: Infinity, iq: Infinity},
]

const kolduns = new Kolduni(listOfKolduni);
console.log(kolduns);
// console.log(kolduns.filterByAge());
const newKolduns = kolduns.filterByAge().filterByIq();
console.log(newKolduns);
// console.log(Math.random() * Infinity);