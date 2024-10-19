import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get(
  "/test/:id",
  zValidator(
    "param",
    z.object({
      id: z.string().regex(/^\d+$/).transform(Number),
    })
  ),
  zValidator("query", z.object({ name: z.string().optional() })),
  (c) => {
    const { id } = c.req.valid("param");
    const { name } = c.req.valid("query");
    return c.json({ id, name });
  }
);

export default app;
