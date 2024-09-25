import path from 'path';
import fs from 'fs';
import _ from 'lodash';
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
const backToClass = (name) => {
    // читаем json
    const fPath = getPath('/people.json');
    const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
    // ищем нужный объект
    const filtered = listOfPerson.alive.filter(({nameIter}) => name === nameIter).at(0);
    // [{}] -> {}
    // преоразовываем в объект класса
    let classObject;
    switch (filtered.className) {
        case 'apache':
            classObject = new Apache(name);
            break;
        case 'redneck':
            classObject = new Redneck(name);
            break;
        case 'weapon':
            classObject = new Weapon(name);
            break;
        default:
            classObject = new Tools(name);
            break;
    }
    // указываем конкретные значения ключей
    const entries = Object.entries(filtered);
    // [[key, v], [key2, v2]...]
    for ([key, value] of entries) {
        if (_.isObject(value)) {
           classObject[key] =  value.map((item) => backToClass(item));
        } else {
            classObject[key] = value;
        }
    }

}