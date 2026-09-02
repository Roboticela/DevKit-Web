import express from "express";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { renderToString } from "react-dom/server";
import { pageMeta, jsonLdOrganization, siteConfig } from "../src/lib/site.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT ?? 3001);

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "api" });
});

function buildHead(path: string): string {
  const meta = pageMeta(path === "/" ? undefined : path.slice(1));
  return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${meta.canonical}${path === "/" ? "" : path}" />
    <meta property="og:title" content="${meta.og.title}" />
    <meta property="og:description" content="${meta.og.description}" />
    <meta property="og:url" content="${meta.og.url}${path === "/" ? "" : path}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${jsonLdOrganization()}</script>
  `.trim();
}

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteConfig.url}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (_req, res) => {
  const urls = ["/", "/dashboard"].map(
    (p) => `<url><loc>${siteConfig.url}${p === "/" ? "" : p}</loc></url>`
  );
  res.type("application/xml").send(`<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`);
});

async function ssrHandler(req: express.Request, res: express.Response) {
  const url = req.originalUrl.split("?")[0] ?? "/";
  try {
    const { render } = await import("../src/entry-server.tsx");
    const appHtml = renderToString(render(url));
    const head = buildHead(url);
    const templatePath = join(__dirname, isProd ? "../client/index.html" : "../../index.html");
    let html = readFileSync(templatePath, "utf-8");
    html = html.replace("<!--ssr-head-->", head).replace("<!--ssr-outlet-->", appHtml);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    console.error("SSR error:", e);
    res.status(500).end("SSR error");
  }
}

if (isProd && existsSync(join(__dirname, "../client"))) {
  app.use(express.static(join(__dirname, "../client")));
}

app.get("*", ssrHandler);

app.listen(PORT, () => {
  console.log(`Express SSR server on http://localhost:${PORT}`);
});
