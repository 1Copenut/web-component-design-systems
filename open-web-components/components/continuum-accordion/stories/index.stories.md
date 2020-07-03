```js script
import { html } from '@open-wc/demoing-storybook';
import '../continuum-accordion.js';

export default {
  title: 'ContinuumAccordion',
  component: 'continuum-accordion',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# ContinuumAccordion

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add continuum-accordion
```

```js
import 'continuum-accordion/continuum-accordion.js';
```

```js preview-story
export const Simple = () => html`
  <continuum-accordion></continuum-accordion>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <continuum-accordion title="Hello World"></continuum-accordion>
`;
```
