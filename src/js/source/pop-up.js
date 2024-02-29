/*============================================================================
  PopUp
==============================================================================*/

import { dispatchEvent } from './utils.js';

class PopUp extends HTMLElement {
  constructor() {
    super();
    this.closeBtn = this.querySelector('.pop-up__close-btn');
  }

  connectedCallback() {
    window.addEventListener('popup:open', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());
  }

  open() {
    this.classList.add('pop-up--opened');
    dispatchEvent('popup:opened');
  }

  close() {
    console.log('close')
    this.classList.remove('pop-up--opened');
    dispatchEvent('popup:closed');
  }
}

customElements.define('pop-up', PopUp);
