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

  constructor(open = 'false') {
    super();
    this.open = open;

    /* Make shadow host a landmark region */
    this.setAttribute('role', 'region');

    /* Check if open attribute was set by the user */
    if (!this.hasAttribute('open')) {
      this.setAttribute('open', this.open);
    }
  }

  render() {
    const { open } = this;

    this._validateOpenAttribute();

    return html`
      <h2>
        <button
          aria-expanded=${open}
          @click=${this._handleClick}
          type="button"
        ></button>
      </h2>
      <div hidden>
        <slot></slot>
      </div>
    `;
  }

  firstUpdated() {
    const button = this.shadowRoot.querySelector('h2 button');
    const oldHeading = this.querySelector(':first-child');
    const headingText = oldHeading.textContent;
    const details = this.shadowRoot.querySelector('div');

    button.textContent = headingText;
    oldHeading.parentElement.removeChild(oldHeading);

    if (this.open === 'true') {
      details.removeAttribute('hidden');
    }
  }

  _handleClick() {
    const details = this.shadowRoot.querySelector('div');

    this.setAttribute(
      'open',
      this.getAttribute('open') === 'true' ? 'false' : 'true'
    );

    details.toggleAttribute('hidden');
  }

  /* Check if an improper string was set on the open attribute */
  _validateOpenAttribute() {
    if (
      this.getAttribute('open') !== 'true' &&
      this.getAttribute('open') !== 'false'
    ) {
      throw new Error('[ATTRIBUTE]: Open must be a string "true" or "false"');
    }
  }
}
