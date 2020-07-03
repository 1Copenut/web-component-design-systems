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
      buttonText: { type: String },
      expandedText: { type: String },
      hidden: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.open = false;

    this.setAttribute('role', 'region');

    this.setAttribute('open', this.open);
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html``;
  }
}
