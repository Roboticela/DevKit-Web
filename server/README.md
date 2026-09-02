# Roboticela DevKit API Server

Express API for CLI authentication, project licensing, versioned catalog (free + premium), and first-party templates.

**Hosts:** production API → `https://api.devkit.roboticela.com` · docs / theme studio → `https://devkit.roboticela.com`

**Catalog versioning:** run `npm run catalog:release` to bump every asset +0.0.1 (or `--init` for 1.0.0) and snapshot payloads under `catalog/components|pages|sections|scaffolds/<id>/<version>/`. Clients install `latest` by default; lockfiles and `devkit add name@1.0.1` pin older versions.

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

Assets live in `server/catalog/`. Templates are served from `../templates` (monorepo) or `server/templates` (deploy).

| Endpoint | Auth | Description |
|----------|------|-------------|
| GET `/templates` | No | List templates |
| GET `/templates/:id/files` | No | Download scaffold files |
| GET `/assets` | Yes | Live catalog (free + premium) |
| GET `/assets/:id/payload` | Yes | Free module install metadata |
| POST `/assets/projects/:id/assets/:assetId/access` | Yes | Premium package (license-gated) |

Update catalog/templates on the server without republishing the CLI.
