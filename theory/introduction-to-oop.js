const student = {
    name: 'Oleg',
    getName: function getName(group='03-23', campus='mira') {
        console.log(`${this.name}, ${group}, ${campus}`);
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