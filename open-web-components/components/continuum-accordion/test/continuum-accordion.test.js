/*
 * Helpful testing documentation and tutorials
 *
 * https://open-wc.org/faq/unit-testing-init-error.html
 * https://dev.to/open-wc/testing-workflow-for-web-components-g73
 */

import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../continuum-accordion.js';
import { ContinuumAccordion } from '../src/ContinuumAccordion.js';

describe('ContinuumAccordion', () => {
  it('CLASS: Creates a new basic instance', async () => {
    const el = new ContinuumAccordion();

    expect(el).to.exist;
  });

  it('CLASS: Sets the level property to 2 by default', async () => {
    const el = new ContinuumAccordion();

    expect(el.level).to.equal(2);
  });

  it('CLASS: Sets open property to "false" by default', async () => {
    const el = new ContinuumAccordion();

    expect(el.open).to.equal('false');
  });

  it('CLASS: Throws an error on invalid open attribute', async () => {
    const el = new ContinuumAccordion(...[null, 'falsy']);

    expect(() => el._validateOpenAttribute()).to.throw(
      '[ATTRIBUTE]: Open must be a string "true" or "false"'
    );
  });

  it('INSTANCE: Renders the correct HTML', async () => {
    const el = await fixture(html`
      <continuum-accordion>
        <h2>Hey, this is only a test!</h2>
        <p>
          If this was an actual event, you should grab water, soda, and chips.
        </p>
      </continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');
    const container = el.shadowRoot.querySelector('div[hidden]');
    const heading = el.shadowRoot.querySelector('h2');

    expect(button).to.exist;
    expect(container).to.exist;
    expect(heading).to.exist;
  });

  it('INSTANCE: Includes the correct ARIA markup', async () => {
    const el = await fixture(html`
      <continuum-accordion>
        <h2>Hey, this is only a test!</h2>
        <p>
          If this was an actual event, you should grab water, soda, and chips.
        </p>
      </continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');

    expect(button).to.have.attribute('aria-expanded');
    expect(button.getAttribute('aria-expanded')).to.equal('false');
  });

  it('INSTANCE: Allows user to override open property', async () => {
    const el = await fixture(html`
      <continuum-accordion open="true">
        <h2>Hey, this is only a test!</h2>
        <p>
          If this was an actual event, you should grab water, soda, and chips.
        </p>
      </continuum-accordion>
    `);
    const details = el.shadowRoot.querySelector('div');

    expect(el.open).to.equal('true');
    expect(details.getAttribute('hidden')).to.equal(null);
  });

  it('INSTANCE: Responds to click events', async () => {
    const el = await fixture(html`
      <continuum-accordion>
        <h2>Hey, this is only a test!</h2>
        <p>
          If this was an actual event, you should grab water, soda, and chips.
        </p>
      </continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');
    const details = el.shadowRoot.querySelector('div');
    const listener = oneEvent(button, 'click');

    button.click();

    await listener;
    expect(el.getAttribute('open')).to.equal('true');
    expect(button.getAttribute('aria-expanded')).to.equal('true');
    expect(details.getAttribute('hidden')).to.not.exist;
  });

  it('INSTANCE: Passes the a11y audit', async () => {
    const el = await fixture(html`
      <continuum-accordion>
        <h2>Hey, this is only a test!</h2>
        <p>
          If this was an actual event, you should grab water, soda, and chips.
        </p>
      </continuum-accordion>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
