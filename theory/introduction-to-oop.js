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
