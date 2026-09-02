#!/usr/bin/env node
/**
 * Local-only DevKit CLI entry.
 * Same commands as `devkit`, but defaults to the monorepo CLI + local API.
 * Install globally with: npm run try  (from repo root)
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..");
const entry = join(cliRoot, "dist", "index.js");

if (!existsSync(entry)) {
  console.error("devkit-test: CLI not built. From the monorepo root run: npm run try");
  process.exit(1);
}

process.env.DEVKIT_TEST = "1";
process.env.DEVKIT_API_URL = process.env.DEVKIT_API_URL ?? "http://localhost:4000";
process.env.DEVKIT_LOCAL_PACKAGE = process.env.DEVKIT_LOCAL_PACKAGE ?? cliRoot;

const child = spawn(process.execPath, [entry, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
  cwd: process.cwd(),
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
