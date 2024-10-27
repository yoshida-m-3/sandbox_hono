import { Hono } from "hono";
import { cors } from "hono/cors";
import { authorsApp } from "./routes/authors";

const app = new Hono()
  .use(
    "/*",
    cors({
      origin: "http://localhost:5173", // Reactアプリケーションのオリジン
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .get("/", (c) => {
    return c.text("test");
  })
  .route("/auth", authorsApp);

export default app;
export type AppType = typeof app;
