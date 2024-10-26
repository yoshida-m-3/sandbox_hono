import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

const app = new Hono();

// CORSミドルウェアを追加
app.use(
	"/*",
	cors({
		origin: "http://localhost:5173", // Reactアプリケーションのオリジン
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

const route = app.get(
	"/test/:id",
	zValidator(
		"param",
		z.object({
			id: z.string().regex(/^\d+$/).transform(Number),
		}),
	),
	zValidator("query", z.object({ name: z.string().optional() })),
	(c) => {
		const { id } = c.req.valid("param");
		const { name } = c.req.valid("query");
		return c.json({ id, name });
	},
);

export default app;
export type AppType = typeof route;
