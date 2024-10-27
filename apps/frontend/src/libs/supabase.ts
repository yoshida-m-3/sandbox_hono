import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { env } from "../env";

export class SupabaseClient {
  private static instance: SupabaseClient;
  private client: ReturnType<typeof createClient<Database>>;

  private constructor() {
    this.client = createClient<Database>(
      env.VITE_SUPABASE_URL,
      env.VITE_SUPABASE_KEY
    );
  }

  public static getInstance(): SupabaseClient {
    if (!SupabaseClient.instance) {
      SupabaseClient.instance = new SupabaseClient();
    }
    return SupabaseClient.instance;
  }

  public getClient() {
    return this.client;
  }
}
