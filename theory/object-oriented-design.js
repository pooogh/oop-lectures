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