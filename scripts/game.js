class Game {
  constructor() {
    this.inventoryList = document.querySelector('[data-inventory]');
    this.gameArea = document.querySelector('[data-main]');
    this.wordTarget = document.querySelector('[data-word-target]');

    this.race = 'human';
    this.inventory = 0;
  }

  init() {

    //listen for popup:close
    document.addEventListener('popup:close', (e) => {
      const selection = e.detail.selection;

      this.race = selection.race;
      this.inventory = selection.inventory;

      this.createInventory(this.inventory);

      setTimeout(() => {
        this.generateLetters(5);
      }, 3000);
    });
  }

  createInventory(inventory) {
    this.inventoryList.innerHTML = '';

    console.log(inventory)

    const li = document.createElement('li');
    li.classList.add('item');
    li.setAttribute('data-item', items[inventory].name);
    li.innerHTML = `
    <img src="images/item-${items[inventory].file.toLowerCase()}" alt="${items[inventory].name}">
    <div class="ui-details">
      <h3>${items[inventory].name}</h3>
      <p>${items[inventory].description}</p>
    </div>`;
    this.inventoryList.appendChild(li);
  }

  generateLetters(arrayLength) {
    const letters = [];

    //generate random letters and ensure no duplicates
    while (letters.length < arrayLength) {
      const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      if (letters.indexOf(letter) === -1) letters.push(letter);
    }

    //dispatch event to keyboard
    const event = new CustomEvent('game:letters', {
      detail: {
        letters: letters
      },
      bubbles: true
    });

    document.dispatchEvent(event);
    console.log(letters)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init();
});
