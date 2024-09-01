import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { LitFirstButton } from '../src/LitFirstButton.js';
import '../src/lit-first-button.js';

describe('LitFirstButton', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<LitFirstButton>(html`<lit-first-button></lit-first-button>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<LitFirstButton>(html`<lit-first-button></lit-first-button>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<LitFirstButton>(html`<lit-first-button header="attribute header"></lit-first-button>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<LitFirstButton>(html`<lit-first-button></lit-first-button>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
