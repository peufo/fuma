# fuma

My fullstack material build with sveltekit, daisyui, zod and more ...

## Installation

```bash
bun add fuma
```

Import the component styles into your root stylesheet, after DaisyUI, and let Tailwind scan the
package:

```css
@import 'tailwindcss';
@plugin 'daisyui';
@import 'fuma/css';
@source '../node_modules/fuma/dist';
```
