import { html, fixture, expect } from '@open-wc/testing';

import '../continuum-accordion.js';

describe('ContinuumAccordion', () => {
  it('renders the correct HTML', async () => {
    const el = await fixture(html`
      <continuum-accordion></continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');
    const container = el.shadowRoot.querySelector('div[hidden]');

    expect(button).to.exist;
    expect(container).to.exist;
  });

  // it('has a default title "Hey there" and counter 5', async () => {
  //   const el = await fixture(html`
  //     <continuum-accordion></continuum-accordion>
  //   `);

  //   expect(el.title).to.equal('Hey there');
  //   expect(el.counter).to.equal(5);
  // });

  // it('passes the a11y audit', async () => {
  //   const el = await fixture(html`
  //     <continuum-accordion></continuum-accordion>
  //   `);

  //   await expect(el).shadowDom.to.be.accessible();
  // });
});
