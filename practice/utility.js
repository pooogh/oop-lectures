import path from 'path';
import fs from 'fs';
import { Apache, Redneck, Weapon, Tools } from './tribes.js';

const getPath = (fPath) => path.resolve() + fPath;


const setPerson = (person) => {
    const fPath = getPath('/people.json');
    const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
    listOfPerson.alive.push(person);
    fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
}

const deleteDeadPerson = (person) => {
    const fPath = getPath('/people.json');
    const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
    const nameOfDead = person.name;
    const filtered = listOfPerson.alive.filter(({name}) => name !== nameOfDead);
    listOfPerson.alive = filtered;
    fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
}

// изменение данный
const updatePerson = (person) => {
    const fPath = getPath('/people.json');
    const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
    const nameToUpdate = person.name;
    const filtered = listOfPerson.alive.filter(({name}) => name !== nameToUpdate);
    listOfPerson.alive = filtered;
    listOfPerson.alive.push(person);
    fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
}

// возвращение объектов json к типу объектов класса
const backToClass = (name, className) => {
    // читаем json
    const fPath = getPath('/people.json');
    const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
    // ищем нужный объект
    const filtered = listOfPerson.alive.filter(({nameIter}) => name === nameIter).at(0);
    // [{}] -> {}
    // преоразовываем в класс
    let classObject;
    switch (className) {
        case 'Apache':
            classObject = new Apache(name);
            break;
        case 'Redneck':
            classObject = new Redneck(name);
            break;
        case 'Weapon':
            classObject = new Weapon(name);
            break;
        default:
            className = new Tools(name);
            break;
    }
    // указываем конкретные значения ключей
}