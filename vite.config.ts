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

export default defineConfig(({ mode }) => {
  const isPagesBuild = mode === "pages";

  return {
    base: isPagesBuild ? "/seplag-ui/" : "/",
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
    plugins: isPagesBuild
      ? [react()]
      : [
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
            entryRoot: "src",
          }),
          cssInjectedByJs(),
        ],
    build: isPagesBuild
      ? {
          outDir: "dist-pages",
          copyPublicDir: false,
        }
      : {
          outDir: "dist",
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
              preserveModules: true,
              preserveModulesRoot: path.resolve(__dirname, "src"),
              exports: "named",
              dir: "dist",
              entryFileNames: (chunkInfo) => {
                const name = chunkInfo.name.startsWith("src/")
                  ? chunkInfo.name.slice(4)
                  : chunkInfo.name;
                return `${name}.js`;
              },
              assetFileNames: "assets/[name][ext]",
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
          emptyOutDir: true,
          chunkSizeWarningLimit: 1000,
        },
  };
});
