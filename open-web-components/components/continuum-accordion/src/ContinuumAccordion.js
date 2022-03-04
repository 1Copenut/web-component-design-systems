import { html, css, LitElement } from 'lit-element';

export class ContinuumAccordion extends LitElement {
  static get styles() {
    return css`
      :host {
        --color-dark-blue: #0f4780;
        --color-active-blue: #0b335b;
        --color-focus-orange: #ffad1f;
        --color-cool-gray: #5f6d6b;
        --color-white: #fff;
        --measure-three: 3px;
        --measure-six: 6px;

        display: block;
      }

      h2 {
        border: 1px solid #666;
        border-radius: var(--measure-three);
        font-family: Helvetica, Arial, sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0.5rem 0 1.125rem 0;
        padding: 0;
      }

      button {
        background: none;
        border: 0;
        display: block;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        outline: 0;
        padding: 0.875rem 1rem;
        text-align: left;
        width: 100%;
      }

      button:hover {
        background-color: var(--color-dark-blue);
        color: var(--color-white);
      }

      button:active {
        background-color: var(--color-active-blue);
        color: var(--color-white);
      }

      button:focus-visible {
        outline: var(--measure-three) solid var(--color-focus-orange);
        outline-offset: 6px;
      }

      div {
        border-left: var(--measure-three) solid var(--color-cool-gray);
        margin: 0 1rem 2.5rem 1rem;
        padding: 0.25rem 1rem;
      }

      slot {
        font-family: Helvetica, Arial, sans-serif;
        line-height: 1.5;
      }
    `;
  }

  static get properties() {
    return {
      level: { type: Number },
      open: { type: String },
    };
  }

  constructor(level = 2, open = 'false') {
    super();

    this.level = level;
    this.open = open;
  }

  connectedCallback() {
    super.connectedCallback();

    /* Make shadow host a landmark region */
    this.setAttribute('role', 'region');

    /* Check if open attribute was set by the user */
    if (!this.hasAttribute('open')) {
      this.setAttribute('open', this.open);
    }
  }

  render() {
    const { level, open } = this;

    this._validateOpenAttribute();

    return html`
      <h2 aria-level=${level}>
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

    /* Progressively enhance user markup in the component */
    button.textContent = headingText;
    oldHeading.parentElement.removeChild(oldHeading);

    if (this.open === 'true') {
      details.removeAttribute('hidden');
    }
  }

  /* Handle the button click event */
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
