import { defineConfig } from "tsup";
import { resolve } from "path";

export default defineConfig({
  entry: {
    index: resolve(__dirname, "../src/module/index.ts"),
  },
  format: ["esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  outDir: "dist/ui",
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildOptions(options) {
    options.alias = {
      "@": resolve(__dirname, "../src"),
    };
  },
  banner: {
    js: "'use client';",
  },
});
