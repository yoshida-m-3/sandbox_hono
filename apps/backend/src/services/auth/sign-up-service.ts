import { z } from "zod";
import { SupabaseRepository } from "@/infrastructures/supabase/supabase-repository";

const signUpSchema = z.object({
  email: z.string().email("無効なメールアドレスです"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

export class SignUpService {
  private supabaseRepository: SupabaseRepository;

  constructor() {
    this.supabaseRepository = new SupabaseRepository();
  }

  async execute(email: string, password: string) {
    try {
      // 入力データの検証
      const validatedData = signUpSchema.parse({ email, password });

      // サインアップ処理
      const result = await this.supabaseRepository.signUp(
        validatedData.email,
        validatedData.password
      );

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        user: result.user,
        session: result.session,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          error: "入力データが無効です",
          details: error.errors,
        };
      }

      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      }
    }
  }
}
