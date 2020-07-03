import { html, css, LitElement } from 'lit-element';

export class ContinuumAccordion extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--continuum-accordion-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.open = false;

    this.setAttribute('role', 'region');

    if (!this.hasAttribute('open')) {
      this.setAttribute('open', false);
    }
  }

  render() {
    const { open } = this;

    return html`
      <h2>
        <button aria-expanded=${open}>Hello world!</button>
      </h2>
      <div hidden><slot></slot></div>
    `;
  }
}
