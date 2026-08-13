# fuma

`fuma` is a fullstack UI component library and utility toolkit for SvelteKit applications:
Svelte components (forms, tables, dialogs, drawers, menus), Svelte actions, server-side helpers
and state utilities. The repo is both a **publishable npm package** (built to `dist/`) and a
**local development playground** (`src/routes/`).

Built on SvelteKit + Svelte 5 (runes), Tailwind CSS v4, DaisyUI and Zod v4. Bundled with Vite,
packaged with `@sveltejs/package` + `publint`, tested with Vitest.

---

## Build and Test Commands

The package manager is **bun** (`bun.lock`).

```bash
bun dev                  # vite dev --host
bun run build            # vite build && bun run package
bun run package          # svelte-kit sync && svelte-package && publint
bun run preview          # vite preview --host
bun run check            # run-p sync svelte-check lint
bun test                 # vitest
bun run format           # prettier --write .
bun run lint             # prettier --check . && eslint .
```

> `bun run check` runs sync, type-check and lint in parallel — it is the single command to
> validate a change. It does **not** format: `lint` only runs `prettier --check`, so run
> `bun run format` separately when Prettier reports diffs.

---

## Project Structure

```
src/
├── app.css                 # Tailwind v4 entry + DaisyUI plugin + custom themes + component classes
├── app.d.ts                # Global SvelteKit type declarations
├── app.html                # HTML template
├── index.test.ts           # Single placeholder Vitest test
├── lib/                    # Library source — packaged into dist/
│   ├── index.ts            # Root barrel (see Package Exports)
│   ├── _doc/               # Playground doc components (DocExample/DocProps/DocSection),
│   │                       #   shiki highlighting, Faker demo data — NOT re-exported by index.ts
│   ├── action/             # Svelte actions (autoSubmit, tip, editable list with DnD)
│   ├── command/            # Keyboard navigation composable (useCommand)
│   ├── input/              # Form inputs (InputString, InputNumber, InputSelect, InputCheckboxes, …)
│   ├── loading/            # Loading component
│   ├── popover/            # Popover primitive using CSS anchor positioning
│   ├── remote/             # useForm — helper for SvelteKit remote functions
│   ├── search/             # Fuse.js search with highlighted spans
│   ├── server/             # Server utilities (parseQuery, table helpers, SSE)
│   ├── state/              # URL param state helpers (param.ts)
│   ├── ui/
│   │   ├── button/         # ButtonDelete
│   │   ├── copy/           # ButtonCopy, useCopy
│   │   ├── dialog/         # Dialog
│   │   ├── drawer/         # Drawer with layer management (useLayer, inertBackground)
│   │   ├── menu/           # DropDown, DropDownMenu, ContextMenu
│   │   ├── mode/           # ToggleMode, useMode (dark/light)
│   │   ├── pagination/     # Pagination
│   │   ├── range/          # RangePicker
│   │   └── table/          # Data table (sort, filter, field visibility, views)
│   ├── utils/              # csv, jsonParse, options, tippy, eventEmitter, path helpers
│   └── validation/         # Zod schemas and helpers
└── routes/                 # Dev/demo pages, one per major component or feature
```

`dist/` is the built package output and mirrors `src/lib/`. Run `bun run package` after changes
before publishing or consuming locally.

---

## Package Exports

`package.json` exposes **only two entry points**:

- `fuma` → the root barrel `src/lib/index.ts`, which re-exports `action`, `command`, `input`,
  `loading`, `popover`, `remote`, `search`, `state`, `ui`, `utils`, `validation`.
- `fuma/server` → `src/lib/server/`.

There are no `fuma/ui`, `fuma/utils`, `fuma/state`, … subpaths — everything but the server code
is imported from `fuma` directly.

Peer dependencies (provided by the consuming app): `@sveltejs/kit`, `svelte`, `tailwindcss`,
`daisyui`, `zod`.

---

## Code Style Guidelines

**Prettier** — tabs, single quotes, **no semicolons**, no trailing commas, print width 100.
Plugins: `prettier-plugin-svelte`, `prettier-plugin-tailwindcss` with
`tailwindStylesheet: ./src/app.css`.

**ESLint** (`eslint.config.js`) — `js.configs.recommended` + `typescript-eslint` +
`eslint-plugin-svelte` + `eslint-config-prettier`. Ignores come from `.gitignore`;
`no-undef` is off (handled by TypeScript).

**Imports** — from `$lib/` use `.ts` extensions (`$lib/validation/zod.ts`); between sibling
files inside `src/lib/` use `.js` extensions (`./button/index.js`). Follow the surrounding file.

---

## Testing

Vitest, pattern `src/**/*.{test,spec}.{js,ts}`. Coverage is currently minimal — only the
placeholder `src/index.test.ts` exists. Place new `*.test.ts` files next to the code under test.

---

## Notable Conventions and Patterns

1. **Svelte 5 runes** everywhere: `$state`, `$derived`, `$effect`, `$props`, `$bindable`.
2. **Attachment API**: `createAttachmentKey` from `svelte/attachments` attaches behavior to DOM
   nodes instead of traditional actions (see `useCommand`, `usePopover`).
3. **Event API**: `on` from `svelte/events` rather than native `addEventListener`.
4. **Experimental SvelteKit**: `svelte.config.js` enables `kit.experimental.remoteFunctions` and
   `compilerOptions.experimental.async`.
5. **Remote functions**: some demo routes use `form()` / `query()` from `$app/server`; `useForm`
   in `src/lib/remote/` wraps them.
6. **Zod v4** APIs (`z.core.$ZodType`, `z.iso.date()`).
7. **CSS anchor positioning**: Popover uses native `anchor-name`, `position-anchor`,
   `position-area`, `position-try`.
8. **Tailwind v4 + DaisyUI**: `src/app.css` uses `@import 'tailwindcss'` / `@plugin 'daisyui'`,
   defines two custom themes — `fuma` (light, default) and `fuma-dark` — plus a `dark`
   custom-variant keyed on `[data-theme="dark"]`, and component classes (`.menu-item`, `.title`,
   `.btn-primary`, …).
