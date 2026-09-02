import { mkdirSync, readFileSync, writeFileSync, existsSync, chmodSync, unlinkSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { configExists, readConfig, writeConfig, type DevKitConfig } from "./config.js";
import { cliBinName } from "./cli-meta.js";
import { log } from "./logger.js";

const SESSION_DIR = join(homedir(), ".roboticela", "sessions");
const GLOBAL_SESSION_FILE = join(SESSION_DIR, "auth.json");

/** ~100 years — treated as non-expiring by the CLI. */
export const FOREVER_MS = 100 * 365.25 * 24 * 60 * 60 * 1000;

export interface StoredSession {
  accessToken: string;
  refreshToken: string;
  /** Absolute ms timestamp; ignored when forever is true. */
  expiresAt: number;
  /** When true, session never expires on the client. */
  forever?: boolean;
  user: { id: string; email: string; name?: string | null };
  apiUrl: string;
  loggedInAt?: string;
}

export type ConfigAccount = NonNullable<DevKitConfig["account"]>;

function accountToSession(account: ConfigAccount): StoredSession {
  return {
    accessToken: account.accessToken,
    refreshToken: account.refreshToken,
    expiresAt: account.expiresAt ?? Date.now() + FOREVER_MS,
    forever: account.forever !== false,
    user: {
      id: account.userId,
      email: account.email,
      name: account.name,
    },
    apiUrl: account.apiUrl,
    loggedInAt: account.loggedInAt,
  };
}

function sessionToAccount(session: StoredSession): ConfigAccount {
  return {
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name ?? undefined,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    apiUrl: session.apiUrl,
    forever: true,
    expiresAt: session.expiresAt || Date.now() + FOREVER_MS,
    loggedInAt: session.loggedInAt ?? new Date().toISOString(),
  };
}

function readGlobalSession(): StoredSession | null {
  if (!existsSync(GLOBAL_SESSION_FILE)) return null;
  try {
    return JSON.parse(readFileSync(GLOBAL_SESSION_FILE, "utf-8")) as StoredSession;
  } catch {
    return null;
  }
}

function writeGlobalSession(session: StoredSession): void {
  mkdirSync(SESSION_DIR, { recursive: true });
  writeFileSync(GLOBAL_SESSION_FILE, JSON.stringify(session, null, 2) + "\n", { mode: 0o600 });
  try {
    chmodSync(GLOBAL_SESSION_FILE, 0o600);
  } catch {
    /* windows */
  }
}

/** Prefer project `devkit.config.json` account; fall back to global machine session. */
export function readSession(cwd = process.cwd()): StoredSession | null {
  if (configExists(cwd)) {
    try {
      const config = readConfig(cwd);
      if (config.account?.accessToken) {
        return accountToSession(config.account);
      }
    } catch {
      /* fall through */
    }
  }
  return readGlobalSession();
}

/**
 * Persist login forever:
 * - always write global machine session
 * - if in a DevKit project, also write into `devkit.config.json` → `account`
 *   so the session travels with the project (clone/build/CI).
 */
export function writeSession(session: StoredSession, cwd = process.cwd()): void {
  const foreverSession: StoredSession = {
    ...session,
    forever: true,
    expiresAt: Date.now() + FOREVER_MS,
    loggedInAt: session.loggedInAt ?? new Date().toISOString(),
  };

  writeGlobalSession(foreverSession);

  if (configExists(cwd)) {
    try {
      const config = readConfig(cwd);
      config.account = sessionToAccount(foreverSession);
      writeConfig(config, cwd);
    } catch {
      /* project config unavailable */
    }
  }
}

/** Copy a valid global session into the project config if missing. */
export function bindSessionToProject(cwd = process.cwd()): boolean {
  if (!configExists(cwd)) return false;
  const config = readConfig(cwd);
  if (config.account?.accessToken) return true;
  const global = readGlobalSession();
  if (!isSessionValid(global)) return false;
  config.account = sessionToAccount({ ...global!, forever: true, expiresAt: Date.now() + FOREVER_MS });
  writeConfig(config, cwd);
  return true;
}

export function clearSession(cwd = process.cwd()): void {
  if (existsSync(GLOBAL_SESSION_FILE)) unlinkSync(GLOBAL_SESSION_FILE);
  if (configExists(cwd)) {
    try {
      const config = readConfig(cwd);
      if (config.account) {
        delete config.account;
        writeConfig(config, cwd);
      }
    } catch {
      /* ignore */
    }
  }
}

export function isSessionValid(session: StoredSession | null): boolean {
  if (!session?.accessToken) return false;
  if (session.forever) return true;
  // Legacy sessions without forever still treated as valid if far in the future
  if (!session.expiresAt || session.expiresAt > Date.now() + 365 * 24 * 60 * 60 * 1000) return true;
  return Date.now() < session.expiresAt - 30_000;
}

/** Require a valid login for any package install (free or premium). */
export function requireLogin(cwd = process.cwd()): StoredSession {
  bindSessionToProject(cwd);
  const session = readSession(cwd);
  if (isSessionValid(session)) return session!;

  const bin = cliBinName();
  log.error(`Sign in required. Run: ${bin} login`);
  log.info("Login is required for free components and premium assets.");
  process.exit(1);
}

export function getSessionPath(): string {
  return GLOBAL_SESSION_FILE;
}
