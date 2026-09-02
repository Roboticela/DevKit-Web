# Roboticela DevKit API Server

Express API for CLI authentication, project licensing, versioned catalog (free + premium), and first-party templates.

**Source of truth:** templates live in `/templates/*/template.json`; assets in `catalog/catalog.json` with `latestVersion` + `versions.history`. The npm CLI does **not** ship these — bump versions on the server when you release assets or scaffolds.

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
| GET | `/templates` | No | Live template ids, labels, versions |
| GET | `/templates/:id/files` | No | Scaffold files for `create` |
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

Assets live in `server/catalog/`. Templates are served from `../templates` (monorepo) or `server/templates` (deploy).

| Endpoint | Auth | Description |
|----------|------|-------------|
| GET `/templates` | No | List templates |
| GET `/templates/:id/files` | No | Download scaffold files |
| GET `/assets` | Yes | Live catalog (free + premium) |
| GET `/assets/:id/payload` | Yes | Free module install metadata |
| POST `/assets/projects/:id/assets/:assetId/access` | Yes | Premium package (license-gated) |

Update catalog/templates on the server without republishing the CLI.
