import { intro, outro, spinner } from "@clack/prompts";
import chalk from "chalk";
import { apiFetch, getApiBaseUrl } from "../lib/api-client.js";
import {
  writeSession,
  clearSession,
  readSession,
  isSessionValid,
  FOREVER_MS,
  bindSessionToProject,
} from "../lib/auth-store.js";
import { configExists } from "../lib/config.js";
import { log } from "../lib/logger.js";
import { cliBinName } from "../lib/cli-meta.js";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 15 * 60 * 1000;

function persistLogin(
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: { id: string; email: string; name?: string | null };
  },
  apiUrl: string,
  cwd = process.cwd()
) {
  writeSession(
    {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: Date.now() + FOREVER_MS,
      forever: true,
      user: tokens.user,
      apiUrl,
      loggedInAt: new Date().toISOString(),
    },
    cwd
  );
}

export async function authLoginCommand(cwd = process.cwd()) {
  const apiUrl = getApiBaseUrl();
  const isLocalTest = process.env.DEVKIT_TEST === "1";
  const bin = cliBinName();
  intro(chalk.cyan(isLocalTest ? "Roboticela DevKit — Sign in (local test)" : "Roboticela DevKit — Sign in"));

  log.info(`API: ${chalk.dim(apiUrl)}`);

  const device = await apiFetch<{
    deviceCode: string;
    userCode: string;
    verificationUri: string;
    expiresIn: number;
    interval: number;
  }>("/auth/device", { apiUrl });

  if (isLocalTest) {
    const email = process.env.DEVKIT_TEST_EMAIL ?? "dev@roboticela.local";
    const s = spinner();
    s.start(`Auto-approving device as ${email}…`);
    try {
      await apiFetch("/auth/device/approve", {
        apiUrl,
        body: { userCode: device.userCode, email, name: "Local Tester" },
      });
    } catch (e) {
      s.stop(chalk.red("Auto-approve failed"));
      log.error((e as Error).message);
      log.info("Is the local server running? From repo root: npm run try");
      process.exit(1);
    }

    try {
      const tokens = await apiFetch<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: { id: string; email: string; name?: string | null };
      }>("/auth/token", {
        apiUrl,
        body: { deviceCode: device.deviceCode, grantType: "device_code" },
      });
      persistLogin(tokens, apiUrl, cwd);
      s.stop(chalk.green("Signed in (session never expires)"));
      if (configExists(cwd)) {
        log.info(`Saved to ${chalk.cyan("devkit.config.json")} → account (travels with this project)`);
      }
      outro(chalk.green(`Welcome, ${tokens.user.email}`));
      return;
    } catch (e) {
      s.stop(chalk.red("Token exchange failed"));
      log.error((e as Error).message);
      process.exit(1);
    }
  }

  console.log();
  console.log(chalk.bold("  Open this URL to approve:"));
  console.log(`  ${chalk.cyan(device.verificationUri)}`);
  console.log();
  console.log(chalk.bold("  Or enter code:"));
  console.log(`  ${chalk.yellow(device.userCode)}`);
  console.log();
  log.info("Dev approve: POST /auth/device/approve with userCode + email");
  console.log(
    chalk.dim(
      `  Example: curl -X POST ${apiUrl}/auth/device/approve -d '{"userCode":"${device.userCode}","email":"you@example.com"}'`
    )
  );
  console.log();

  const s = spinner();
  s.start("Waiting for authorization…");

  const started = Date.now();
  while (Date.now() - started < POLL_TIMEOUT_MS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    try {
      const tokens = await apiFetch<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: { id: string; email: string; name?: string | null };
      }>("/auth/token", {
        apiUrl,
        body: { deviceCode: device.deviceCode, grantType: "device_code" },
      });

      s.stop(chalk.green("Signed in (session never expires)"));
      persistLogin(tokens, apiUrl, cwd);
      if (configExists(cwd)) {
        log.info(`Saved to ${chalk.cyan("devkit.config.json")} → account`);
      } else {
        log.info(`Run ${chalk.cyan(`${bin} init`)} or create a project — session will bind into config.`);
      }
      outro(chalk.green(`Welcome, ${tokens.user.email}`));
      return;
    } catch (e) {
      const err = e as { statusCode?: number; code?: string };
      if (err.statusCode === 428 || err.code === "AUTHORIZATION_PENDING") continue;
      s.stop(chalk.red("Authorization failed"));
      log.error((e as Error).message);
      process.exit(1);
    }
  }

  s.stop(chalk.red("Timed out waiting for authorization"));
  process.exit(1);
}

export async function authLogoutCommand(cwd = process.cwd()) {
  const session = readSession(cwd);
  if (session) {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
        token: session.accessToken,
        apiUrl: session.apiUrl,
        body: { refreshToken: session.refreshToken },
      });
    } catch {
      /* ignore */
    }
  }
  clearSession(cwd);
  log.success("Signed out (cleared project config account + machine session).");
}

export async function authStatusCommand(cwd = process.cwd()) {
  bindSessionToProject(cwd);
  const session = readSession(cwd);
  if (!session || !isSessionValid(session)) {
    log.warn(`Not signed in. Run '${cliBinName()} login'.`);
    return;
  }
  log.success(`Signed in as ${chalk.cyan(session.user.email)}`);
  log.info(`API: ${session.apiUrl}`);
  log.info(session.forever !== false ? "Session: never expires" : "Session: time-limited");
  if (configExists(cwd)) {
    log.info("Stored in: devkit.config.json → account");
  }
}
