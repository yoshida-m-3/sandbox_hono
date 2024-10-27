import { env } from "@/env";
import { type SupabaseClient, createClient } from "@supabase/supabase-js";

export class SupabaseRepository {
	private supabase: SupabaseClient = createClient(
		env.VITE_SUPABASE_URL,
		env.VITE_SUPABASE_KEY,
	);

	async signUp(email: string, password: string) {
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});
	}
}
