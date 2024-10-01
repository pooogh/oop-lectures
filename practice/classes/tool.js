import Item from './item.js';

class Tool extends Item {
  constructor(name) {
    super(name);
    this.className = 'tool';
  }
}

export default Tool;
