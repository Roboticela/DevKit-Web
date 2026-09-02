// Post-build for the published CLI package.
// Templates + catalog assets live on the DevKit server — never ship them in the npm tarball.
import { readFileSync, writeFileSync, chmodSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..");
const entryPath = join(cliRoot, "dist/index.js");

// Drop any leftover local copies so they cannot sneak into `npm pack`
for (const dir of ["registry", "templates"]) {
  const path = join(cliRoot, dir);
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    console.log(`  ✓ Removed local ${dir}/ (served by API, not published)`);
  }
}

if (!existsSync(entryPath)) {
  console.error("dist/index.js missing — run tsc first");
  process.exit(1);
}

const content = readFileSync(entryPath, "utf-8");
if (!content.startsWith("#!/usr/bin/env node")) {
  writeFileSync(entryPath, "#!/usr/bin/env node\n" + content);
  console.log("  ✓ Added shebang to dist/index.js");
}

chmodSync(entryPath, 0o755);
console.log("  ✓ Set dist/index.js as executable (755)");
console.log("  ✓ CLI package is server-backed (no bundled templates/components)");
