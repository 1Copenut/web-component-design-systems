/*
 * Helpful testing documentation and tutorials
 *
 * https://open-wc.org/faq/unit-testing-init-error.html
 * https://dev.to/open-wc/testing-workflow-for-web-components-g73
 */

import { html, fixture, expect, defineCE } from '@open-wc/testing';

import '../continuum-accordion.js';
import { ContinuumAccordion } from '../src/ContinuumAccordion.js';

describe('ContinuumAccordion', () => {
  it('Renders the correct HTML', async () => {
    const el = await fixture(html`
      <continuum-accordion></continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');
    const container = el.shadowRoot.querySelector('div[hidden]');
    const heading = el.shadowRoot.querySelector('h2');

    expect(button).to.exist;
    expect(container).to.exist;
    expect(heading).to.exist;
  });

  it('Includes the correct ARIA markup', async () => {
    const el = await fixture(html`
      <continuum-accordion></continuum-accordion>
    `);
    const button = el.shadowRoot.querySelector('button');

    expect(button).to.have.attribute('aria-expanded');
    expect(button.getAttribute('aria-expanded')).to.equal('false');
  });

  it('Calls validateProperties method on render', async () => {
    let checkProps = false;
    const tag = defineCE(
      class extends ContinuumAccordion {
        validateProperties() {
          checkProps = true;
        }
      }
    );

    await fixture(`<${tag} />`);
    expect(checkProps).to.be.true;
  });

  it('Sets open attribute to "false"', async () => {
    const el = await fixture(html`
      <continuum-accordion></continuum-accordion>
    `);

    expect(el.open).to.equal('false');
  });

  it('Allows user to override open attribute', async () => {
    const el = await fixture(html`
      <continuum-accordion open="true"></continuum-accordion>
    `);

    expect(el.open).to.equal('true');
  });

  it('Throws an error on invalid open attribute', async () => {
    const el = new ContinuumAccordion('falsy');

    expect(() => el.validateProperties()).to.throw(
      '[ATTRIBUTE]: Open must be a string "true" or "false"'
    );
  });

  it('Passes the a11y audit', async () => {
    const el = await fixture(html`
      <continuum-accordion></continuum-accordion>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
