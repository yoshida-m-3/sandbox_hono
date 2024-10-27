import React, { useState } from "react";
import { SupabaseClient } from "../libs/supabase";
import { hc } from "hono/client";
import { authorsApp } from "../../../backend/src/routes/authors";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = SupabaseClient.getInstance().getClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const client = hc<typeof authorsApp>("http://localhost:3000/auth");

      const response = await client.signup
        .$post({
          form: {
            email,
            password,
          },
        })
        .then((res) => res.json());
      console.log(response);

      // if (error) throw error;
      // if (data.session) {
      //   // セッション情報を設定
      //   const session: AppType["Session"] = data.session;
      //   // ここでセッション情報を使用できます
      //   console.log("セッション情報:", session);
      //   alert("サインアップ成功！");
      // } else {
      //   // メール確認が必要な場合
      //   alert("確認メールを送信しました。メールを確認してください。");
      // }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "サインアップに失敗しました"
      );
    }
  };

  return (
    <div className="sign-up-container">
      <h1>サインアップ</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">サインアップ</button>
      </form>
    </div>
  );
};

export default SignUp;
