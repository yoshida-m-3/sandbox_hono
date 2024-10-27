import React, { useState } from "react";
import { SupabaseClient } from "../libs/supabase";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await SupabaseClient.getInstance()
        .getClient()
        .auth.signUp({ email, password });

      if (error) throw error;
      alert("サインアップ成功！");
    } catch (error) {
      setError(error.message);
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
