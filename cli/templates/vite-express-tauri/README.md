# Vite + Express + Tauri + Prisma + SSR SEO

Official Roboticela DevKit template with crawlable HTML via Express SSR.

## Architecture

```
Vite (client)  →  Express API + SSR  →  Prisma  →  PostgreSQL
Tauri shell    →  embeds Vite app
```

Public routes are server-rendered for SEO (metadata, sitemap, robots, JSON-LD).

## Development

```bash
cp .env.example .env
npm install
npm run db:push
npm run dev          # Vite + Express
npm run tauri:dev    # Desktop shell
```
