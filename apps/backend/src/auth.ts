import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	env.VITE_SUPABASE_URL,
	env.VITE_SUPABASE_KEY,
);
