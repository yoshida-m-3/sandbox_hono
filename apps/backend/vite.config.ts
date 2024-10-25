import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-build/node";

export default defineConfig({
  plugins: [
    devServer({
      entry: "src/index.ts", // The file path of your application.
    }),
    build({
      // Defaults are `src/index.ts`,`./src/index.tsx`,`./app/server.ts`
      entry: "./src/index.ts",
    }),
  ],
});
