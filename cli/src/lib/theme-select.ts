import { SelectPrompt } from "@clack/core";
import chalk from "chalk";
import type { RemoteTheme } from "./themes.js";

const S_BAR = process.platform === "win32" ? "|" : "│";
const S_BAR_END = process.platform === "win32" ? "—" : "└";
const S_RADIO_ACTIVE = process.platform === "win32" ? ">" : "●";
const S_RADIO_INACTIVE = process.platform === "win32" ? " " : "○";
const S_STEP_SUBMIT = process.platform === "win32" ? "o" : "◇";
const S_STEP_ERROR = process.platform === "win32" ? "x" : "▲";
const S_STEP_ACTIVE = process.platform === "win32" ? "*" : "◆";

/** Brand primary — matches `--brand-primary` / `--text-link` light. */
const LINK_COLOR = "#0E7AFF";

type Option = { value: string; label: string; hint?: string; previewUrl: string };

function symbol(state: string): string {
  switch (state) {
    case "cancel":
      return chalk.red(S_STEP_ERROR);
    case "submit":
      return chalk.green(S_STEP_SUBMIT);
    default:
      return chalk.cyan(S_STEP_ACTIVE);
  }
}

/** OSC-8 hyperlink — opens only when the user clicks it in a supporting terminal. */
function clickableLink(url: string): string {
  const styled = chalk.hex(LINK_COLOR).underline(url);
  return `\u001b]8;;${url}\u0007${styled}\u001b]8;;\u0007`;
}

function styleOption(opt: Option, active: boolean): string {
  if (active) {
    const hint = opt.hint ? chalk.dim(` (${opt.hint})`) : "";
    const link = opt.previewUrl ? `  ${clickableLink(opt.previewUrl)}` : "";
    return `${chalk.green(S_RADIO_ACTIVE)} ${opt.label}${hint}${link}`;
  }
  return `${chalk.dim(S_RADIO_INACTIVE)} ${chalk.dim(opt.label)}`;
}

/**
 * Theme picker: highlighting shows that theme’s preview URL as a clickable link.
 * Enter confirms the selection only — the browser opens solely when the user
 * clicks the link text (OSC-8), never on arrow keys or Enter.
 */
export async function selectThemeWithLivePreview(opts: {
  message?: string;
  themes: RemoteTheme[];
  initialValue?: string;
}): Promise<string | symbol> {
  const message = opts.message ?? "Theme preset";
  const options: Option[] = opts.themes.map((t) => ({
    value: t.id,
    label: t.label,
    hint: t.hint,
    previewUrl: t.previewUrl,
  }));

  if (!options.length) {
    throw new Error("No themes available to select.");
  }

  const prompt = new SelectPrompt({
    options,
    initialValue: opts.initialValue ?? options[0]!.value,
    render() {
      const title = `${chalk.gray(S_BAR)}
${symbol(this.state)}  ${message}
`;
      switch (this.state) {
        case "submit": {
          const selected = this.options[this.cursor] as Option;
          return `${title}${chalk.gray(S_BAR)}  ${chalk.dim(selected.label)}`;
        }
        case "cancel":
          return `${title}${chalk.gray(S_BAR)}  ${chalk.strikethrough(chalk.dim((this.options[this.cursor] as Option).label))}
${chalk.gray(S_BAR)}`;
        default:
          return `${title}${chalk.cyan(S_BAR)}  ${this.options
            .map((opt, i) => styleOption(opt as Option, i === this.cursor))
            .join(`
${chalk.cyan(S_BAR)}  `)}
${chalk.cyan(S_BAR_END)}
`;
      }
    },
  });

  return prompt.prompt();
}
