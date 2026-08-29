import type { Metadata } from "next";
import { DocsChrome } from "@/components/DocsChrome";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevKit Components",
  description: "DevKit component library",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-bg-primary font-sans text-text-primary">
        <ThemeProvider>
          <DocsChrome>{children}</DocsChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
