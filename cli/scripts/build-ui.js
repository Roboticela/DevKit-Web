import { readFileSync, writeFileSync, cpSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const stylesSrc = join(repoRoot, "src", "app", "globals.css");
const stylesDest = join(__dirname, "..", "dist", "ui", "styles.css");

if (existsSync(stylesSrc)) {
  mkdirSync(dirname(stylesDest), { recursive: true });
  cpSync(stylesSrc, stylesDest);
  console.log("  ✓ Copied module styles.css");
}

const dtsSrc = join(__dirname, "..", "ui", "index.d.ts");
const dtsDest = join(__dirname, "..", "dist", "ui", "index.d.ts");
if (existsSync(dtsSrc)) {
  cpSync(dtsSrc, dtsDest);
  console.log("  ✓ Copied module type declarations");
}

// Fallback minimal tokens if globals not found
if (!existsSync(stylesDest)) {
  writeFileSync(
    stylesDest,
    `:root {
  --brand-primary: #0e7aff;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f7;
  --border-default: #d2d2d7;
}
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
`
  );
}
