/*============================================================================
  PopUp
==============================================================================*/

class PopUp extends HTMLElement {
  constructor() {
    super();
    this.el = this;
    this.selects = this.querySelectorAll('.select');
    this.button = this.querySelector('.button');
    this.selection = {
      race: 'human',
      inventory: 0
    };

    this.visible = true;

    this.init();
  }

  init() {
    // on enter key press
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && this.visible) {
        this.visible = false
        this.el.classList.remove('is-active');

        //emit event to create character
        const event = new CustomEvent('popup:close', {
          detail: {
            selection: this.selection
          },
          bubbles: true
        });

        this.dispatchEvent(event);
      }
    });


    this.button.addEventListener('click', () => {
      this.el.classList.remove('is-active');

      //emit event to create character
      const event = new CustomEvent('popup:close', {
        detail: {
          selection: this.selection
        },
        bubbles: true
      });

      this.dispatchEvent(event);
    });


    this.selects.forEach((select) => {
      const type = select.getAttribute('data-type');
      const nextBtn  = select.querySelector('.next');
      const prevBtn  = select.querySelector('.prev');

      nextBtn.addEventListener('click', () => {
        let nextIndex = select.getAttribute('data-index');
        select.setAttribute('data-index', ++nextIndex);
        this.change(select, type, nextIndex);
      });

      prevBtn.addEventListener('click', () => {
        let prevIndex = select.getAttribute('data-index');
        select.setAttribute('data-index', --prevIndex);
        this.change(select, type, prevIndex);
      });

    });
  }

  change(select,type, index) {
    const span = select.querySelector('span');

    //change span text based off of index of type
    switch(type) {
      case 'race':
        if (index > race.length - 1) {
          index = 0;
        } else if(index < 0) {
          index = race.length - 1;
        }

        span.textContent = race[index].name;
        this.selection.race = race[index].name.toLowerCase();
        break;
      case 'items':
        if (index > items.length - 1) {
          index = 0;
        } else if(index < 0) {
          index = items.length - 1;
        }

        span.textContent = items[index].name;
        this.selection.inventory = index;

      break;
    }

    select.setAttribute('data-index', index);
  }
}

customElements.define('pop-up', PopUp);
