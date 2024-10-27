import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }

  async signUp(email: string, password: string) {
    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      throw new Error("無効な入力データです");
    }

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, session: data.session };
  }

  async signIn(email: string, password: string) {
    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      throw new Error("無効な入力データです");
    }

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, session: data.session };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    return { message: "サインアウトしました" };
  }
}
