# Roboticela DevKit

**Scaffold full-stack apps. Add polished UI. Unlock premium pages — one CLI.**

`@roboticela/devkit` is the official CLI and React UI package for [Roboticela DevKit](https://devkit.roboticela.com). Create a project, sign in, add free components as module imports, and activate premium pages for your project — without pasting editable source into `src/`.

Docs, catalog, and account: **[devkit.roboticela.com](https://devkit.roboticela.com)**

[![npm](https://img.shields.io/npm/v/@roboticela/devkit.svg)](https://www.npmjs.com/package/@roboticela/devkit)
[![Node](https://img.shields.io/node/v/@roboticela/devkit.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://devkit.roboticela.com)

---

## Install

```bash
npm i -g @roboticela/devkit
```

Or run without a global install:

```bash
npx @roboticela/devkit create my-app
```

**Requirements:** Node.js 20 or later.

Sign in and manage licenses at [devkit.roboticela.com](https://devkit.roboticela.com).

---

## What you get

| | |
|---|---|
| **Templates** | First-party scaffolds (Next.js, Vite + Express + Tauri, and more) served live from DevKit |
| **Free UI** | Production components from `@roboticela/devkit` — import, don’t copy |
| **Premium** | Pages, sections, and scaffolds as licensed packages under `@roboticela/premium-*` |
| **Theme** | Design tokens and presets wired into your project CSS |
| **Licensing** | Sign in once; activate premium per project ($50 one-time) |

Catalog names, template labels, package metadata, and **versions** always load from [devkit.roboticela.com](https://devkit.roboticela.com) — new templates and assets appear without reinstalling the CLI. The npm package ships the CLI + React UI module only (no bundled templates or component registry).

---

## Quick start

```bash
# 1. Create a project
devkit create my-app
cd my-app

# 2. Sign in (required for free and premium packages)
devkit login

# 3. Add a free component
devkit add button

# 4. Unlock premium for this project, then add a page
devkit activate
devkit add dashboard-page

# 5. Run
npm run dev
```

Premium routes are available under `/devkit-premium/...`.

Browse the full catalog at [devkit.roboticela.com](https://devkit.roboticela.com).

**Non-interactive create:**

```bash
devkit create my-app --template nextjs-compact --yes --install
```

---

## Using free components

```tsx
import { Button } from "@roboticela/devkit";
import "@roboticela/devkit/styles.css";

export function Example() {
  return <Button>Continue</Button>;
}
```

Free components stay as dependencies of `@roboticela/devkit`. Premium assets install into `node_modules` as scoped packages — your app imports them; source is not copied into `src/` for editing.

---

## CLI reference

### Project

```bash
devkit create [name]          # New project from a live template
devkit init                   # Add DevKit to an existing app
devkit dev                    # Start the project’s development server
```

**`create` flags:** `--template <id>` · `--preset <name>` · `--primary <hex>` · `--git` / `--no-git` · `--install` / `--no-install` · `--add <a,b>` · `-y, --yes`

### Packages

```bash
devkit add [names…]           # Free components or premium pages/sections/scaffolds
devkit remove <name>          # Remove a package from the project
devkit list                   # Browse the catalog
devkit list --installed       # Show what’s installed
devkit info <name>            # Package details
devkit sync                   # Restore from devkit.lock.json (CI)
devkit update <name>          # Update specific packages
devkit update --all           # Update every installed package
```

**Useful options:** `add --dry-run` · `add --type page|section|scaffold|component` · `list --type <kind>` · `list --template <id>`

### Account & license

```bash
devkit login                  # Sign in (session does not expire)
devkit logout
devkit status                 # CLI, auth, license, and API at a glance
devkit activate               # Unlock premium for this project ($50)
devkit license                # License status
```

Account and billing: [devkit.roboticela.com](https://devkit.roboticela.com)

### Theme

```bash
devkit theme list
devkit theme preset bold      # default | minimal | bold | playful | corporate
devkit theme apply            # Regenerate theme CSS from config
```

### Diagnostics & CLI updates

```bash
devkit doctor                 # Full project + API diagnostics
devkit update --cli           # Update the CLI only (project untouched)
devkit update --cli --check   # Check for a newer CLI
```

---

## Project configuration

| File | Purpose |
|------|---------|
| `devkit.config.json` | Template, site, theme, account session, project identity |
| `devkit.lock.json` | Locked package versions for reproducible `sync` |

Login writes a durable session into `devkit.config.json` under `account`, so auth travels with the project.

---

## Templates

Template **ids, display names, and short descriptions** come from DevKit at [devkit.roboticela.com](https://devkit.roboticela.com). Whatever is published there is what `create` and `init` offer.

Common first-party ids:

| Template id | Stack |
|-------------|--------|
| `nextjs-compact` | Next.js · React · Tailwind |
| `vite-express-tauri` | Vite · Express · Tauri |

```bash
devkit create my-app --template nextjs-compact
```

---

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `DEVKIT_API_URL` | `https://devkit.roboticela.com` | DevKit API base URL |

Local testing with `devkit-test` uses `http://localhost:4000` automatically.


## Keep things current

```bash
# Packages in the current project
devkit update button
devkit update --all

# CLI only — never modifies project source or lockfile
devkit update --cli
devkit update --cli --check

# Exact lockfile restore (CI)
devkit sync
```

---

## Troubleshooting

```bash
devkit status                 # Auth + license + API
devkit doctor                 # Deeper diagnostics
```

| Issue | Fix |
|-------|-----|
| Templates / catalog won’t load | Confirm `DEVKIT_API_URL` points at [devkit.roboticela.com](https://devkit.roboticela.com) |
| Can’t add packages | Run `devkit login` |
| Premium install fails | Run `devkit activate`, then `devkit license` |
| Need help | Visit [devkit.roboticela.com](https://devkit.roboticela.com) |

---

## Links

- **Website & docs:** [devkit.roboticela.com](https://devkit.roboticela.com)
- **Catalog & account:** [devkit.roboticela.com](https://devkit.roboticela.com)
- **npm package:** [npmjs.com/package/@roboticela/devkit](https://www.npmjs.com/package/@roboticela/devkit)

---

## License

MIT © Roboticela
