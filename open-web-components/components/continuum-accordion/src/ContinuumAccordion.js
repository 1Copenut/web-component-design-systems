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
      open: { type: String },
    };
  }

  constructor(open) {
    super();
    this.open = open || 'false';

    // Make shadow host a landmark region
    this.setAttribute('role', 'region');

    // Check if open attribute was set by the user
    if (!this.hasAttribute('open')) {
      this.setAttribute('open', this.open);
    }
  }

  render() {
    const { open } = this;

    this.validateProperties();

    return html`
      <h2>
        <button aria-expanded=${open}>Hello world!</button>
      </h2>
      <div hidden><slot></slot></div>
    `;
  }

  validateProperties() {
    this.__validateOpenAttribute();
  }

  __validateOpenAttribute() {
    // Check if an improper string was set on the open attribute
    if (
      this.getAttribute('open') !== 'true' &&
      this.getAttribute('open') !== 'false'
    ) {
      throw new Error('[ATTRIBUTE]: Open must be a string "true" or "false"');
    }
  }
}
