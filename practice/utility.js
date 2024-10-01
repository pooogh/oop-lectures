import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import readlineSync from 'readline-sync';
import Apache from './classes/apache.js';
import Redneck from './classes/redneck.js';
import Tool from './classes/tool.js';
import Weapon from './classes/weapon.js';

const getPath = (fPath) => path.resolve() + fPath;

// ф-ция, создающая новый объект класса и сохраняющая его в p.json
const createObject = () => {
  const classes = ['Apache', 'Redneck', 'Tool', 'Weapon'];
  const classToCreate = readlineSync.keyInSelect(classes, 'Что создаем?');

  if (classToCreate === -1) {
    console.log('ну не надо, так не надо');
    return false;
  }

  const name = classToCreate < 2 ? readlineSync.question('Имя: ')
    : readlineSync.question('Название: ');

  const obj = classToCreate === 0 ? new Apache(name)
    : classToCreate === 1 ? new Redneck(name)
      : classToCreate === 2 ? new Tool(name) : new Weapon(name);

  console.log(obj);
  setPerson(obj);
};

const setPerson = (person) => {
  const fPath = getPath('/data/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
  listOfPerson.alive.push(person);
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

const deleteDeadPerson = (person) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
  const nameOfDead = person.name;
  const filtered = listOfPerson.alive.filter(({ name }) => name !== nameOfDead);
  listOfPerson.alive = filtered;
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

// изменение данный
const updatePerson = (person) => {
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
  const nameToUpdate = person.name;
  const filtered = listOfPerson.alive.filter(({ name }) => name !== nameToUpdate);
  listOfPerson.alive = filtered;
  listOfPerson.alive.push(person);
  fs.writeFileSync(fPath, JSON.stringify(listOfPerson, null, 2), 'utf-8');
};

// возвращение объектов json к типу объектов класса
const backToClass = (name) => {
  // читаем json
  const fPath = getPath('/people.json');
  const listOfPerson = JSON.parse(fs.readFileSync(fPath, 'utf-8'));
  // ищем нужный объект
  const filtered = listOfPerson.alive.filter(({ nameIter }) => name === nameIter).at(0);
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
      classObject = new Tool(name);
      break;
  }
  // указываем конкретные значения ключей
  const entries = Object.entries(filtered);
  // [[key, v], [key2, v2]...]
  // for ([key, value] of entries) {
  //   if (_.isObject(value)) {
  //     classObject[key] = value.map((item) => backToClass(item));
  //   } else {
  //     classObject[key] = value;
  //   }
  // }
  entries.forEach(([key, value]) => {
    classObject[key] = _.isObject(value)
      ? value.map((item) => backToClass(item))
      : value;
  });
  return classObject;
};

export {
  setPerson, deleteDeadPerson, updatePerson, backToClass, createObject
};
