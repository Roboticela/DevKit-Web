#!/usr/bin/env node
/**
 * One-command local DevKit setup.
 *
 *   npm run try
 *
 * Builds the CLI, links `devkit-test` globally, ensures server .env,
 * starts the API if needed, then prints how to use it from any directory.
 */
import { spawn, execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  openSync,
  closeSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const cliDir = join(root, "cli");
const serverDir = join(root, "server");
const apiUrl = process.env.DEVKIT_API_URL ?? "http://localhost:4000";
const port = Number(new URL(apiUrl).port || 4000);

function log(msg) {
  console.log(msg);
}

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", cwd: opts.cwd ?? root, env: { ...process.env, ...opts.env }, shell: true });
}

function portFree(p) {
  return new Promise((resolve) => {
    const srv = createServer();
    srv.once("error", () => resolve(false));
    srv.once("listening", () => {
      srv.close(() => resolve(true));
    });
    srv.listen(p, "127.0.0.1");
  });
}

async function waitForHealth(timeoutMs = 60_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(`${apiUrl}/health`);
      if (res.ok) return true;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  return false;
}

function ensureServerEnv() {
  const example = join(serverDir, ".env.example");
  const envPath = join(serverDir, ".env");
  if (!existsSync(envPath) && existsSync(example)) {
    copyFileSync(example, envPath);
    log("  ✓ Created server/.env from .env.example");
  }
}

/**
 * Start the API in the background.
 * Avoid `npm.cmd` + detached on Windows — Node ≥20 throws spawn EINVAL.
 */
function spawnApiServer(logPath) {
  const tsxCli = join(serverDir, "node_modules", "tsx", "dist", "cli.mjs");
  const logFd = openSync(logPath, "w");

  /** @type {import("node:child_process").ChildProcess} */
  let child;
  if (existsSync(tsxCli)) {
    child = spawn(process.execPath, [tsxCli, "watch", "src/index.ts"], {
      cwd: serverDir,
      detached: true,
      stdio: ["ignore", logFd, logFd],
      env: process.env,
      windowsHide: true,
    });
  } else {
    // Fallback: shell required on Windows for .cmd shims
    child = spawn("npm", ["run", "dev"], {
      cwd: serverDir,
      detached: true,
      stdio: ["ignore", logFd, logFd],
      env: process.env,
      shell: true,
      windowsHide: true,
    });
  }

  // Parent no longer owns the log fds / child lifetime
  try {
    closeSync(logFd);
  } catch {
    /* already closed by child on some platforms */
  }
  child.unref();
  return child;
}

async function main() {
  console.log();
  log("╔══════════════════════════════════════════════════╗");
  log("║   Roboticela DevKit — local test setup           ║");
  log("╚══════════════════════════════════════════════════╝");
  console.log();

  // 1. Build CLI
  log("→ Building CLI…");
  run("npm run build", { cwd: cliDir });

  // 2. Link globally as `devkit` + `devkit-test`
  log("→ Linking global commands (devkit, devkit-test)…");
  try {
    run("npm link", { cwd: cliDir });
  } catch {
    log("  ⚠ npm link failed — try an elevated shell, or run: cd cli && npm link");
  }

  // 3. Server env + deps
  ensureServerEnv();
  if (!existsSync(join(serverDir, "node_modules"))) {
    log("→ Installing server dependencies…");
    run("npm install", { cwd: serverDir });
  }

  // 4. Start API if not already running
  let startedServer = false;
  const free = await portFree(port);
  if (free) {
    log(`→ Starting API on ${apiUrl}…`);
    mkdirSync(join(root, ".devkit-local"), { recursive: true });
    const out = join(root, ".devkit-local", "server.log");
    let child;
    try {
      child = spawnApiServer(out);
    } catch (e) {
      log(`  ⚠ Failed to start API: ${(e).message}`);
      log(`  Start manually: cd server && npm run dev`);
      child = null;
    }
    if (child?.pid) {
      writeFileSync(join(root, ".devkit-local", "server.pid"), String(child.pid));
      startedServer = true;
    }

    const ok = await waitForHealth();
    if (!ok) {
      log("  ⚠ API did not become healthy in time.");
      log(`  Check Postgres + server/.env, then: cd server && npm run db:push && npm run dev`);
      log(`  Logs: ${out}`);
      if (existsSync(out)) {
        const tail = readFileSync(out, "utf-8").trim().split(/\r?\n/).slice(-20);
        if (tail.length) console.log(tail.join("\n"));
      }
    } else {
      log("  ✓ API is healthy");
      // Best-effort schema push (idempotent)
      try {
        run("npx prisma db push --skip-generate", { cwd: serverDir });
      } catch {
        log("  ⚠ db push failed — run: cd server && npm run db:push");
      }
    }
  } else {
    log(`  ✓ Port ${port} already in use — assuming API is running`);
    const ok = await waitForHealth(5_000);
    if (!ok) log("  ⚠ Nothing answered /health — start server manually if needed");
  }

  // Persist helper for consumers
  writeFileSync(
    join(root, ".devkit-local", "env.json"),
    JSON.stringify(
      {
        apiUrl,
        localPackage: cliDir.replace(/\\/g, "/"),
        linkedAt: new Date().toISOString(),
      },
      null,
      2
    ) + "\n"
  );

  console.log();
  log("Ready. Use from any directory:");
  console.log();
  log("  devkit-test create my-app --yes");
  log("  cd my-app");
  log("  devkit-test login");
  log("  devkit-test activate");
  log("  devkit-test add dashboard-page");
  log("  npm run dev");
  log("  → open /devkit-premium/dashboard");
  console.log();
  log(`  API:     ${apiUrl}`);
  log(`  Package: file:${cliDir}`);
  if (startedServer) log("  Server:  started in background (.devkit-local/server.log)");
  console.log();
  log("Tip: rebuild + relink anytime with  npm run try");
  log("     or:  devkit-test update");
  console.log();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
