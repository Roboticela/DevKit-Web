# Roboticela DevKit API Server

Express API for CLI authentication, project licensing, and premium asset delivery.

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
| GET | `/assets` | Yes | Catalog metadata |
| POST | `/assets/projects/:id/assets/:assetId/access` | Yes | Authorized premium download |

## CLI integration

```bash
DEVKIT_API_URL=http://localhost:4000 devkit auth login
DEVKIT_API_URL=http://localhost:4000 devkit page add dashboard-page
```

## Licensing

- **$50 USD one-time per project**
- Stripe webhook confirms payment server-side
- Development mode activates license without Stripe when `NODE_ENV=development`

## Premium assets

Assets live in `server/catalog/`. The CLI requests individual assets — no bulk download endpoint.
