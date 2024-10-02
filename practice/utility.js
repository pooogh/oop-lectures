import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import readlineSync from 'readline-sync';
import Apache from './classes/apache.js';
import Redneck from './classes/redneck.js';
import Tool from './classes/tool.js';
import Weapon from './classes/weapon.js';

const getPath = () => `${path.resolve()}/data/people.json`;

const getObject = () => JSON.parse(fs.readFileSync(getPath(), 'utf-8'));

const updateJSON = (dataToUpdate) => fs.writeFileSync(getPath(), JSON.stringify(dataToUpdate, null, 2), 'utf-8');

const setObject = (object) => {
  const listOfObjects = getObject();
  if (['apache', 'redneck'].includes(object.className)) {
    listOfObjects.alive.push(object);
  } else {
    listOfObjects.items.push(object);
  }
  updateJSON(listOfObjects);
};
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
  setObject(obj);
  return true;
};

// ф-ция, добавляющая конкретный item к конкретному person


const deleteDeadObject = (object) => {
  const listOfObjects = getObject();
  const nameOfDead = object.name;
  const filtered = listOfObjects.alive.filter(({ name }) => name !== nameOfDead);
  listOfObjects.alive = filtered;
  updateJSON(listOfObjects);
};

// изменение данный
const updateObject = (object) => {
  const listOfObjects = getObject();
  const nameToUpdate = object.name;
  const filtered = listOfObjects.alive.filter(({ name }) => name !== nameToUpdate);
  listOfObjects.alive = filtered;
  listOfObjects.alive.push(object);
  updateJSON(listOfObjects);
};

// возвращение объектов json к типу объектов класса
const backToClass = (name) => {
  // читаем json
  const listOfObjects = getObject();
  // ищем нужный объект
  const filtered = listOfObjects.alive.filter(({ nameIter }) => name === nameIter).at(0);
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
  setObject, deleteDeadObject, updateObject, backToClass, createObject,
};
