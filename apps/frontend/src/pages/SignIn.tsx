import React, { useState } from "react";
import { SupabaseClient } from "../libs/supabase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await SupabaseClient.getInstance()
        .getClient()
        .auth.signInWithPassword({ email, password });

      if (error) throw error;
      alert("サインイン成功！");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h1>サインイン</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignIn}>
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
        <button type="submit">サインイン</button>
      </form>
    </div>
  );
};

export default SignIn;
