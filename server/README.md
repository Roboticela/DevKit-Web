# Roboticela DevKit API Server

Express API for CLI authentication, project licensing, versioned catalog (free + premium), and first-party templates.

**Hosts:** production API → `https://api.devkit.roboticela.com` · docs / theme studio → `https://devkit.roboticela.com`

**Asset source of truth:** every `src/components/*.tsx` file is discovered dynamically
(skip only docs/preview filename patterns). Free public API is tagged from
`src/module/index.ts`. Root `components|pages|sections/<id>/asset.json` merges overrides.

**Published layout** (theme-universal + installable snapshot):

```
server/catalog/pages/<name>/<version>/manifest.json
server/catalog/pages/<name>/<version>/files.json          # compiled index.js for CLI install
server/catalog/pages/<name>/<version>/src/*.tsx           # rewritten sources (devkit imports + local deps)

server/catalog/templates/<id>/<version>/template.json
server/catalog/templates/<id>/<version>/files.json        # scaffold file map
server/catalog/templates/<id>/<version>/content.sha
server/catalog/templates.json                             # index (latest + history)
```

Release rewrites docs imports so packages install cleanly:
- free UI / `brand` / free icons → `@roboticela/devkit`
- local helpers (`AuthLayout`, `OtpBoxes`, …) → copied beside the entry
- `@/lib/pages-catalog` types → inlined `src/types.ts`
- `next/link` → local `link.tsx` shim

Each version also ships **`requirements.json`** (+ the same data on `manifest.json`):
- `peerDependencies` — npm packages (react, `@roboticela/devkit`, …)
- `dependencies.frontend` — other catalog asset ids to install
- `roboticela` — Roboticela package/export details
- `bundled` / `internal` — local helpers included or hosted inside the module
- `icons` — fromDevkit vs bundled

Scaffolds are skipped for now (template-specific). Templates use a separate release:

```bash
npm run catalog:release              # discover + sync + publish changed components/pages/sections
npm run catalog:release -- --dry-run # preview only
npm run catalog:release -- --force   # bump everything even if unchanged

npm run templates:release            # publish changed templates → catalog/templates/<id>/<version>/
npm run templates:release -- --dry-run
npm run templates:release -- --force
npm run templates:release -- --ids nextjs-compact
```

Unchanged assets/templates (same content hash as last published `content.sha`) are skipped automatically.

CLI pins versions the same way for packages and templates:

```bash
devkit add button@1.0.1
devkit create my-app --template nextjs-compact@1.0.1
devkit update --template --to 1.0.1
```

If a catalog asset is **missing** from discovery, the release asks:

- **d** — delete completely (catalog entry + all published versions under `server/catalog/…`)
- **k** — keep old versions (leave catalog + published files)

Non-interactive: `--delete-orphans` or `--keep-orphans`.

## Quick start

```bash
cd server
cp .env.example .env
npm install
npm run db:push
npm run dev
```

API runs at `http://localhost:4000`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Service health |
| POST | `/auth/device` | No | Start device auth flow |
| POST | `/auth/device/approve` | No | Approve device (browser/dev) |
| POST | `/auth/token` | No | Exchange device code for tokens |
| POST | `/auth/refresh` | No | Refresh access token |
| GET | `/auth/me` | Yes | Current user |
| POST | `/projects` | Yes | Register project |
| GET | `/projects` | Yes | List projects |
| GET | `/projects/:id/license` | Yes | License status |
| POST | `/licenses/:projectId/checkout` | Yes | Stripe checkout (dev: auto-activate) |
| GET | `/assets` | Yes | Versioned catalog metadata |
| GET | `/assets/:id/payload` | Yes | Free asset install payload (versioned) |
| GET | `/themes` | No | Live theme presets + preview URLs |
| GET | `/themes/:id` | No | Single theme |
| GET | `/themes/:id/preview` | No | 302 → docs `https://devkit.roboticela.com/theme?theme=:id` |
| POST | `/assets/projects/:id/assets/:assetId/access` | Yes | Authorized premium download |

## CLI integration

```bash
# From monorepo root — one command local setup
npm run try

# Then from any directory
devkit-test create my-app --yes
cd my-app
devkit-test login
devkit-test activate
devkit-test add dashboard-page
```

## Licensing

- **$50 USD one-time per project**
- Stripe webhook confirms payment server-side
- Development mode activates license without Stripe when `NODE_ENV=development`

## Premium assets & templates

Assets live in `server/catalog/`. Templates are authored under `../templates` and **published** with `npm run templates:release` into `server/catalog/templates/<id>/<version>/` (live folder is a fallback until the first release).

| Endpoint | Auth | Description |
|----------|------|-------------|
| GET `/templates` | No | List templates (latest version) |
| GET `/templates/:id` | No | Meta + available versions |
| GET `/templates/:id/versions` | No | Version list |
| GET `/templates/:id/files?version=` | No | Download scaffold (`latest` default) |
| GET `/assets` | Yes | Live catalog (free + premium) |
| GET `/assets/:id/payload` | Yes | Free module install metadata |
| POST `/assets/projects/:id/assets/:assetId/access` | Yes | Premium package (license-gated) |

Update catalog/templates on the server without republishing the CLI.
