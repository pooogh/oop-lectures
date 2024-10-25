import fs from 'fs';

const student = {
    name: 'Oleg',
    getName: function getName(group='03-23', campus='mira') {
        return `${this.name}, ${group}, ${campus}`;
    }
    // getName: () => this.name, //не работает, увы
};

const student2 = {
    name: 'Vadim',
};
// bind, call, apply -  методы функций для добавления контекста (объекты с ключами)
// bind - создает отдельную функцию для конкретного экземпляра
student.getName.bind(student2)('1234');

// apply - просто вызов конкретного метода с конкретным контекстом 
// (может принимать на вход массивы аргументов)
const showName2 = student.getName.apply(student2, ['05-23', 'bpps']);

// call - просто вызов конкретного метода с конкретным контекстом
const data = ['05-23', 'bpps'];
const showName3 = student.getName.call(student2, ...data);
// console.log(typeof(showName2))
// console.log(student.getName())
// console.log(showName('01-23'))
// const sum = (a, b) => a + b;
// sum.bind(null, 8)(3); // sum(8, 3)

// контекст и стрелочные функции
var obj2 = {
    name: 'var'
}
const fn = () => this;
function fn2() {
    return this;
};

const obj = {
    fn,
    fn2,
    fn3() {
        const x = () => this;
        return x();
    }
};
// console.log(fn(), fn2());
// console.log(obj.fn(), obj.fn2(), obj.fn3());
// // const fn3 = () => {}
// console.log(fn.bind(obj2)());

// конструкторы
// console.log(typeof([]));
// const x = new Boolean();
// console.log(x);
function Group(number, department) {
    this.number = number;
    this.department = department;
    this.count = 30;
    this.getGroup = function() {
        return this.number
    };
};

const gr0323 = new Group('03-23.ISAP.OF.11', 'IT');
console.log(gr0323.getGroup(), gr0323);

// прототипы
const array = [1, 2, 3];
console.log(array.includes());
Array.prototype.includes = function includes() {
    console.log('hi');
};
console.log(array.includes());


function Student(name, group) {
    this.name = name;
    this.group = group;
};
Student.prototype.setSurname = function setSurname(sr) {
    this.surname = sr;
};
const vadim = new Student('Vadim', '03-23');
console.log(vadim);
vadim.setSurname('Tomin');
console.log(vadim);

// раскарковка
const str = 'Matvey';
const arr = str.split('');
console.log(typeof(str));

const bool = new Boolean();
console.log(bool.valueOf());
const num = new Number(9);
console.log(4 + + '3');

// Object.prototype.toString();
const alice = {
    name: 'Alice',
    toString() {
        return 2 * 2;
    },
};

const x = new String('kek');
console.log(`${x}`); //kek
console.log(`${alice}`) // [object Object]

// статические свойства и методы
class Teacher {
    constructor(name, department) {
        this.name = name;
        this.department = department;
        // static isTeacher = true; ошипка
    };

    getInfo() {
        return `${this.name}, ${this.department}, ${this.constructor.wardrobe}`;
    }

    static wardrobe = false;
    static isTeacher() {
        // return this.getInfo();
        this.wardrobe = this.constructor.wardrobe === false ? true : false;
        console.log(this.wardrobe)
    }
};

const teacher = new Teacher('Nikolay', 'IT');
console.log(teacher.getInfo());

teacher.name = 'Kolya';
Teacher.wardrobe = true;
console.log(teacher.getInfo());
const teacher2 = new Teacher('Samat', 'IT');
console.log(teacher2.getInfo())
Teacher.isTeacher()
console.log(teacher2.getInfo())
Teacher.isTeacher()
console.log(teacher2.getInfo())
// статические св-ва и методы принадлежат классу, а не экземпляру

// исключения
const err = new Error('test error');
console.log(err);
// fn a() => fn b() => fn c()
const readData = () => {
    try {
        const data = fs.readFileSync('folder/file.js');
        console.log('try working');
        return data;
        console.log(data);
    } catch(e) {
        throw 'fPath error';
    }
}

const editData = () => {
    try {
        readData();
        console.log(7);
    } catch(e) {
        if (e === 'fPath error') {
            throw 'выкинули потестить';
        }
    } finally {
        console.log('123');   
    }
}

// readData()
editData();
