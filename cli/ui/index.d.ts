import type { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "action" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
export function Modal(props: Record<string, unknown>): JSX.Element;
export function SignInPage(props: Record<string, unknown>): JSX.Element;
export function DashboardPage(props: Record<string, unknown>): JSX.Element;
export function SettingsPage(props: Record<string, unknown>): JSX.Element;
export function ThemeProvider(props: { children: ReactNode }): JSX.Element;

export const brand: { name: string; companyName: string; logoSrc: string };
