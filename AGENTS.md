# fuma

`fuma` is a fullstack UI component library and utility toolkit built for SvelteKit applications. It provides ready-to-use Svelte components (forms, tables, dialogs, drawers, menus), Svelte actions, server-side helpers, and state management utilities. The project functions as both a **publishable npm package** (`dist/`) and a **local development playground** (`src/routes/`).

- **Name**: fuma
- **Version**: 2.0.50
- **Author**: Jonas Voisard <jonas.voisard@gmail.com>
- **License**: Not specified in repository

---

## Technology Stack

| Layer          | Technology                                                          | Version              |
| -------------- | ------------------------------------------------------------------- | -------------------- |
| Framework      | SvelteKit                                                           | ^2.57.1              |
| UI Framework   | Svelte                                                              | ^5.55.4 (runes mode) |
| Styling        | Tailwind CSS                                                        | ^4.2.4               |
| CSS Components | DaisyUI                                                             | ^5.5.19              |
| Validation     | Zod                                                                 | ^4.3.6               |
| Build Tool     | Vite                                                                | ^7.3.2               |
| Package Tool   | `@sveltejs/package` + `publint`                                     | —                    |
| Testing        | Vitest                                                              | ^4.1.5               |
| Formatting     | Prettier + `prettier-plugin-svelte` + `prettier-plugin-tailwindcss` | ^3.8.3               |
| Linting        | Biome                                                               | 2.4.2                |

---

## Build and Test Commands

All commands use `pnpm` (lockfile present). The `.npmrc` enforces `engine-strict=true`.

```bash
# Development server
pnpm dev                 # vite dev --host

# Production build (app + package)
pnpm build               # vite build && npm run package

# Package the library for npm
pnpm package             # svelte-kit sync && svelte-package && publint

# Preview the built app
pnpm preview             # vite preview --host

# Type checking
pnpm check               # svelte-kit sync && svelte-check --tsconfig ./tsconfig.json
pnpm check:watch         # same with --watch

# Testing
pnpm test                # vitest

# Formatting
pnpm format              # prettier --write .

# Linting
pnpm biome               # biome CLI access
```

> **Note**: The `lint` script in `package.json` references `eslint`, but ESLint is **not** installed. Use `pnpm biome` (or `pnpm biome check .`) for linting and import organization instead.

---

## Project Structure

```
src/
├── app.css                 # Tailwind v4 entry point + DaisyUI plugin + custom component classes
├── app.d.ts                # Global SvelteKit type declarations
├── app.html                # HTML template
├── index.test.ts           # Single placeholder Vitest test
├── lib/                    # Library source code — packaged into dist/ for npm
│   ├── index.ts            # Main re-export (action, state, ui, utils, validation)
│   ├── data.ts             # Demo/test data (Faker.js) — NOT part of package exports
│   ├── action/             # Svelte actions (autoSubmit, tip, editable list with DnD)
│   ├── command/            # Keyboard navigation composable (useCommand)
│   ├── input/              # Form input components (InputString, InputNumber, InputRelation, etc.)
│   ├── popover/            # Popover primitive using CSS anchor positioning
│   ├── search/             # Fuse.js-powered search with highlighted spans
│   ├── server/             # Server-side utilities (parseQuery, table helpers, SSE)
│   ├── state/              # URL param state helpers (param.svelte.ts)
│   ├── ui/                 # UI components
│   │   ├── button/         # ButtonCopy, ButtonDelete
│   │   ├── dialog/         # Dialog
│   │   ├── drawer/         # Drawer with layer management
│   │   ├── menu/           # DropDown, ContextMenu, DropDownMenu
│   │   ├── mode/           # Dark/light mode toggle
│   │   ├── pagination/     # Pagination
│   │   ├── range/          # RangePicker
│   │   └── table/          # Full-featured data table (sort, filter, field visibility)
│   ├── utils/              # General utilities (csv, jsonParse, options, tippy, etc.)
│   └── validation/         # Zod schemas and helpers
└── routes/                 # Dev/demo pages (SvelteKit app)
    ├── +layout.svelte      # Layout with navigation tree and Toaster
    ├── +page.svelte        # Home
    └── ...                 # One page per major component/feature
```

The `dist/` directory contains the compiled npm package output. It may be **stale** — it includes modules (`api/`, `private/`, `store/`) that no longer exist in `src/lib/`. Always run `pnpm package` after changes before publishing or consuming locally.

---

## Package Exports

The library is published from `dist/` with the following submodules:

- `fuma` — main library
- `fuma/ui` — UI components
- `fuma/utils` — utilities
- `fuma/state` — reactive state helpers
- `fuma/validation` — Zod schemas and helpers
- `fuma/action` — Svelte actions
- `fuma/server` — server-side utilities

Peer dependencies (must be provided by the consuming app):

- `daisyui` ^5.5.17
- `tailwindcss` ^4.1.18
- `zod` ^4.3.6

---

## Code Style Guidelines

### Prettier (formatting)

- **Indent**: Tabs
- **Quotes**: Single
- **Trailing commas**: None
- **Print width**: 100
- **Plugins**: `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`
- **Tailwind stylesheet**: `./src/app.css`

### Biome (linting + import organization)

- Single quotes, tabs, ES5 trailing commas
- Import organization enabled (`organizeImports: "on"`)
- Uses `.gitignore` for file exclusion
- Excludes `dist/`
- **Svelte/astro/vue override**: `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` are turned off for `.svelte` files

### Import Conventions

- Imports from `$lib/` use `.ts` extensions (e.g., `$lib/validation/zod.ts`).
- Imports from sibling files within `src/lib/` often use `.js` extensions (e.g., `./button/index.js`).
- This is a project convention — follow the style of the surrounding file.

---

## Testing Instructions

- **Runner**: Vitest
- **Pattern**: `src/**/*.{test,spec}.{js,ts}`
- **Current state**: Minimal. Only one placeholder test exists (`src/index.test.ts`).
- To add tests, place `*.test.ts` or `*.spec.ts` files next to the code under test inside `src/`.

---

## Key Dependencies and Their Uses

| Dependency         | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `@lucide/svelte`   | Icon components                                |
| `@faker-js/faker`  | Demo data generation (dev only)                |
| `dayjs`            | Date manipulation                              |
| `debounce`         | Debouncing (used in popover hover)             |
| `devalue`          | Serialization                                  |
| `dotenv`           | Environment variables                          |
| `fuse.js`          | Fuzzy search implementation                    |
| `litepicker`       | Date picker                                    |
| `perod`            | Range merging (used in search highlight spans) |
| `runed`            | Svelte 5 runes utilities                       |
| `svelte-easy-crop` | Image cropping                                 |
| `svelte-sonner`    | Toast notifications                            |
| `tippy.js`         | Tooltip library                                |
| `zod`              | Schema validation (v4)                         |

---

## Notable Conventions and Patterns

1. **Svelte 5 Runes**: All components use `$state`, `$derived`, `$effect`, `$props`, and `$bindable`.
2. **Svelte Attachment API**: The project uses `createAttachmentKey` from `svelte/attachments` to attach behavior to DOM nodes without traditional actions (seen in `useCommand`, `usePopover`).
3. **Svelte Event API**: Uses `svelte/events` (`on`) for event listeners instead of native `addEventListener`.
4. **Experimental SvelteKit**: `svelte.config.js` enables `remoteFunctions` and `async` compiler options.
5. **Remote Functions**: Some demo routes use `form()` and `query()` from `$app/server` (experimental SvelteKit feature) for type-safe server functions.
6. **Zod v4**: Uses modern Zod v4 APIs (e.g., `z.core.$ZodType`, `z.iso.date()`).
7. **CSS Anchor Positioning**: The Popover component uses native CSS anchor positioning (`anchor-name`, `position-anchor`, `position-area`, `position-try`).
8. **Tailwind v4 + DaisyUI**: The app CSS uses `@import "tailwindcss"` and `@plugin "daisyui"` (v4 syntax). Custom component layer classes (`.menu-item`, `.title`, `.btn-primary`, etc.) are defined in `src/app.css`.

---

## Environment and Database

- `.env.example` references a local MySQL database (`mysql://jonas@localhost:3306/fuma`).
- `package.json` includes legacy Prisma scripts (`migrate`, `generate`, `studio`, `seed`), but **no Prisma schema exists in this repository**. These scripts are likely remnants from an earlier version or a consuming application.
- No Docker, GitHub Actions, or other CI/CD configuration is present.

---

## Security Considerations

- The library does not handle authentication, authorization, or secrets directly.
- Server utilities (`src/lib/server/`) assist with parsing query parameters and streaming SSE — ensure incoming query strings are validated in consuming applications.
- `dist/` may contain stale artifacts from previous builds. Do not publish without running `pnpm package` first.
