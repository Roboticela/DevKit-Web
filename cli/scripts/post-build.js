// Adds shebang, bundles registry + templates into npm package
import { readFileSync, writeFileSync, chmodSync, cpSync, existsSync, rmSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..");
const entryPath = join(cliRoot, "dist/index.js");

// Ship registry
const repoRegistry = join(cliRoot, "..", "registry");
const bundleRegistry = join(cliRoot, "registry");
const registryParts = ["categories.json", "components", "pages", "scaffolds"];

if (existsSync(join(cliRoot, "registry", "categories.json")) || existsSync(join(repoRegistry, "categories.json"))) {
  const srcReg = existsSync(join(repoRegistry, "categories.json")) ? repoRegistry : join(cliRoot, "registry");
  rmSync(bundleRegistry, { recursive: true, force: true });
  mkdirSync(bundleRegistry, { recursive: true });
  for (const part of registryParts) {
    const src = join(srcReg, part);
    if (!existsSync(src)) continue;
    cpSync(src, join(bundleRegistry, part), { recursive: true });
  }
  console.log("  ✓ Bundled registry into cli/registry/");
}

// Ship first-party templates
const repoTemplates = join(cliRoot, "..", "templates");
const bundleTemplates = join(cliRoot, "templates");
if (existsSync(repoTemplates)) {
  rmSync(bundleTemplates, { recursive: true, force: true });
  cpSync(repoTemplates, bundleTemplates, { recursive: true });
  console.log("  ✓ Bundled templates into cli/templates/");
}

const content = readFileSync(entryPath, "utf-8");
if (!content.startsWith("#!/usr/bin/env node")) {
  writeFileSync(entryPath, "#!/usr/bin/env node\n" + content);
  console.log("  ✓ Added shebang to dist/index.js");
}

chmodSync(entryPath, 0o755);
console.log("  ✓ Set dist/index.js as executable (755)");
