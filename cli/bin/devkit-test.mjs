#!/usr/bin/env node
/**
 * Local-only DevKit CLI entry.
 * Same commands as `devkit`, but defaults to the monorepo CLI + local API.
 * Prefers running TypeScript source via tsx so local edits apply without rebuild.
 * Install globally with: npm run try  (from repo root)
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..");
const srcEntry = join(cliRoot, "src", "index.ts");
const distEntry = join(cliRoot, "dist", "index.js");
const tsxCli = join(cliRoot, "node_modules", "tsx", "dist", "cli.mjs");

process.env.DEVKIT_TEST = "1";
process.env.DEVKIT_API_URL = process.env.DEVKIT_API_URL ?? "http://localhost:4000";
process.env.DEVKIT_LOCAL_PACKAGE = process.env.DEVKIT_LOCAL_PACKAGE ?? cliRoot;

const args = process.argv.slice(2);
/** @type {import("node:child_process").ChildProcess} */
let child;

if (existsSync(tsxCli) && existsSync(srcEntry)) {
  child = spawn(process.execPath, [tsxCli, srcEntry, ...args], {
    stdio: "inherit",
    env: process.env,
    cwd: process.cwd(),
  });
} else if (existsSync(distEntry)) {
  child = spawn(process.execPath, [distEntry, ...args], {
    stdio: "inherit",
    env: process.env,
    cwd: process.cwd(),
  });
} else {
  console.error("devkit-test: CLI source/dist missing. From monorepo root run: npm run try");
  process.exit(1);
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
