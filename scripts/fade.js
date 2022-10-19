/*============================================================================
  FadeScreen
==============================================================================*/

class FadeScreen extends HTMLElement {
  constructor() {
    super();
    this.el = this;

    document.addEventListener('popup:close', () => {
      this.fadeOut();
    });

    document.addEventListener('startscreen:open', () => {
      this.fadeIn();
    });
  }

  fadeOut() {
    this.el.classList.add('fade--fade-out');
  }

  fadeIn() {
    this.el.classList.add('fade--fade-in');
  }
}

customElements.define('fade-screen', FadeScreen);
