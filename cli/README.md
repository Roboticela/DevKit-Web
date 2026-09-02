# Roboticela DevKit

**CLI + React UI** for [devkit.roboticela.com](https://devkit.roboticela.com).

Scaffold apps, install versioned packages from the live catalog, apply themes, and unlock premium pages — without copying editable source into `src/`.

[![npm](https://img.shields.io/npm/v/@roboticela/devkit.svg)](https://www.npmjs.com/package/@roboticela/devkit)
[![Node](https://img.shields.io/node/v/@roboticela/devkit.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://devkit.roboticela.com)

---

## Install

```bash
npm i -g @roboticela/devkit
# or
npx @roboticela/devkit create my-app
```

**Requires Node.js ≥ 20.** Docs, account, and theme studio: [devkit.roboticela.com](https://devkit.roboticela.com)

---

## How it works

| Concern | Source of truth |
|---------|-----------------|
| Templates | Live catalog — ids, labels, versions, files |
| Components / pages / sections / scaffolds | Live catalog — versioned |
| Themes | Live catalog — preview on [devkit.roboticela.com/theme](https://devkit.roboticela.com/theme) |
| npm package | CLI + React UI module only (no bundled registry/templates) |

New installs use **latest**. `devkit.lock.json` pins versions for `sync`. You can always request a specific version.

---

## Quick start

```bash
devkit create my-app
cd my-app
devkit login
devkit add button
devkit activate
devkit add dashboard-page
npm run dev
# premium → /devkit-premium/...
```

Non-interactive:

```bash
devkit create my-app --template nextjs-compact --preset bold -y --install
```

---

## Free components

```tsx
import { Button } from "@roboticela/devkit";
import "@roboticela/devkit/styles.css";
```

Premium assets install under `node_modules/@roboticela/premium-*` (compiled packages only).

---

## Versions

```bash
# Latest (default)
devkit add button
devkit add dashboard-page

# Pin a catalog version
devkit add button@1.0.1
devkit add dashboard-page --version 1.0.0

# Move installed packages to a version / latest
devkit update button --to 1.0.1
devkit update --all

# CI: reinstall exact lockfile versions
devkit sync
```

Lockfile keeps older pins until you update. Catalog bumps do not require a CLI republish.

---

## Themes

```bash
devkit theme list                 # catalog themes + preview URLs
devkit theme preview              # open studio for current / default
devkit theme preview bold         # https://devkit.roboticela.com/theme?theme=bold
devkit theme preset bold          # apply + write CSS
devkit theme apply                # regenerate managed CSS from config
```

---

## Command reference

Run `devkit --help` for the full flag list. Useful entry points:

### Project

| Command | Description |
|---------|-------------|
| `devkit create [name]` | Scaffold from a live template |
| `devkit init` | Add DevKit to an existing app |
| `devkit dev` | Run the project `dev` script |

**`create` options**

| Flag | Description |
|------|-------------|
| `--template <id>` | Template id from the catalog |
| `--preset <name>` | Theme id from the catalog |
| `--primary <hex>` | Override primary color |
| `--git` / `--no-git` | Git init (default: on) |
| `--install` / `--no-install` | Install deps (default: on) |
| `--add <a,b>` | Free components after scaffold |
| `-y, --yes` | Non-interactive defaults |

### Packages

| Command | Description |
|---------|-------------|
| `devkit add [names…]` | Install from catalog (`name@version` supported) |
| `devkit remove <name>` | Remove from lockfile |
| `devkit list` | Catalog or installed |
| `devkit info <name>` | Metadata + version history |
| `devkit sync` | Reinstall from lockfile |
| `devkit update [names…]` | Bump packages or CLI |

**`add` options:** `--type <kind>` · `--variant <id>` · `--version <ver>` · `--dry-run`  
**`list` options:** `--type` · `--installed` · `--template <id>`  
**`update` options:** `--all` · `--cli` · `--check` · `-f` · `--to <ver>`  
**`sync` / `remove`:** `-f` / `--keep-files`

### Account & license

```bash
devkit login | logout | status | activate | license
```

### Theme

```bash
devkit theme list | preset <id> | apply | preview [id]
```

### Diagnostics

```bash
devkit doctor
devkit update --cli
devkit update --cli --check
```

---

## Project files

| File | Purpose |
|------|---------|
| `devkit.config.json` | Template, `templateVersion`, site, theme, account session |
| `devkit.lock.json` | Pinned package versions for `sync` |
| `.devkit/` | Generated manifests / premium helpers |

---

## Templates

Ids and labels come from the live catalog. Examples:

| Id | Stack |
|----|--------|
| `nextjs-compact` | Next.js · React · Tailwind |
| `vite-express-tauri` | Vite · Express · Tauri |

```bash
devkit create my-app --template nextjs-compact
```

---

## Environment

| Variable | Description |
|----------|-------------|
| `DEVKIT_API_URL` | Override the default API endpoint (optional) |

Local monorepo: `npm run try` → use `devkit-test` against a local API.

---

## Troubleshooting

```bash
devkit status
devkit doctor
```

| Issue | Fix |
|-------|-----|
| Templates / themes / catalog fail | Check network / `DEVKIT_API_URL` if you override it · `devkit status` |
| Can’t add packages | `devkit login` |
| Premium fails | `devkit activate` then `devkit license` |
| Wrong package version | `devkit add name@x.y.z` or `devkit update name --to x.y.z` |
| Docs / theme studio | [devkit.roboticela.com](https://devkit.roboticela.com) |

---

## Links

- [devkit.roboticela.com](https://devkit.roboticela.com) — docs, account, theme studio  
- [npmjs.com/package/@roboticela/devkit](https://www.npmjs.com/package/@roboticela/devkit)

## License

MIT © Roboticela
