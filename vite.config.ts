import path, { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import pkg from "./package.json";

const externalDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

const isExternal = (id: string) =>
  externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));

export default defineConfig({
  resolve: {
    alias: {
      "@componentes": path.resolve(__dirname, "src/componentes"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@uteis": path.resolve(__dirname, "src/uteis"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@type": path.resolve(__dirname, "src/type"),
      "@provider": path.resolve(__dirname, "src/provider"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@app": path.resolve(__dirname, "src/app"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@config": path.resolve(__dirname, "src/config"),
    },
  },
  plugins: [
    react(),
    dts({
      include: [
        "src/componentes",
        "src/routes",
        "src/hooks",
        "src/pages",
        "src/features",
        "src/app",
        "src/lib",
        "src/provider",
        "src/type",
        "src/uteis",
        "src/tokens",
        "src/interfaces",
        "src/index.ts",
      ],
      exclude: ["src/App.tsx", "src/main.tsx"],
      rollupTypes: false,
      tsconfigPath: "./tsconfig.app.json",
    }),
    cssInjectedByJs(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SeplagUi",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
