import { Hono } from "hono";
import { SignUpService } from "../services/auth/sign-up-service";

const signUpService = new SignUpService();

const app = new Hono().post("/signup", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const result = await signUpService.execute(email, password);
    return c.json(result);
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "サーバーエラーが発生しました",
      },
      500
    );
  }
});

export const authorsApp = app;
