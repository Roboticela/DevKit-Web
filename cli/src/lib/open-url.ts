import { exec } from "child_process";

/** Open a URL in the default browser without blocking the TTY. */
export function openUrlQuiet(url: string): void {
  const cmd =
    process.platform === "win32"
      ? `cmd /c start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, { windowsHide: true }, () => {
    /* ignore launch errors — interactive prompts must not break */
  });
}
