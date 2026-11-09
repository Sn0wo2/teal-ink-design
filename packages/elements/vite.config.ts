import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    resolve: {
      dedupe: ["vue"],
    },
    build: {
      emptyOutDir: mode === "production",
      lib: {
        entry: mode.startsWith("global")
          ? fileURLToPath(
              new URL(mode === "global-full" ? "./src/register-full.ts" : "./src/register.ts", import.meta.url),
            )
          : {
              index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
              register: fileURLToPath(new URL("./src/register.ts", import.meta.url)),
              full: fileURLToPath(new URL("./src/full.ts", import.meta.url)),
              "register-full": fileURLToPath(new URL("./src/register-full.ts", import.meta.url)),
            },
        formats: mode.startsWith("global") ? ["iife"] : ["es"],
        name: "TealInk",
        fileName: (_format, entry) =>
          mode.startsWith("global")
            ? `${mode === "global-full" ? "register-full" : "register"}.global.js`
            : `${entry}.js`,
      },
    },
  }
})
