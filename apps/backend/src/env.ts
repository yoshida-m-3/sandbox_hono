import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		VITE_SUPABASE_URL: z.string().url(),
		VITE_SUPABASE_KEY: z.string().min(1),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});
