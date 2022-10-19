/*============================================================================
  KeyBoard
==============================================================================*/

class KeyBoard extends HTMLElement {
  constructor() {
    super();
    this.keys = this.querySelectorAll('.key');

    document.addEventListener('keydown', e => {
      this.keys.forEach(activeKey => {
        if ( activeKey.dataset.key === e.key ) {
          activeKey.classList.add('pressed');

          //emit custom event to game
          const event = new CustomEvent('key:pressed', {
            detail: {
              key: e.key
            },
            bubbles: true
          });

          this.dispatchEvent(event);
        }
      });
    });


    document.addEventListener('keyup', e => {
      this.keys.forEach(activeKey => {
        if ( activeKey.dataset.key === e.key ) {
          activeKey.classList.remove('pressed');
        }
      });
    });

    //listen for game:letters
    document.addEventListener('game:letters', e => {
      const letters = e.detail.letters;
      this.showPattern(letters);
    });
  }

  showPattern(letters) {
    //loop thru letters and apply mime class to match keys
    letters.forEach((letter, i) => {
      this.keys.forEach(key => {
        if (key.dataset.key === letter.toLowerCase()) {
          setTimeout(() => {
            key.classList.add('mime');
          }, i * 1000);

          setTimeout(() => {
            key.classList.remove('mime');
          } , (i + 1) * 1000);
        }
      });
    });
  }
}

customElements.define('key-board', KeyBoard);
