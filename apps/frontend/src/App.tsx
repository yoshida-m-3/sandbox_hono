import { useState, useEffect } from "react";
import { createClient, Session } from "@supabase/supabase-js";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const supabase = createClient(
  "https://rekfybdlkwrxfjoxruuh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJla2Z5YmRsa3dyeGZqb3hydXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNzM0MDQsImV4cCI6MjA0NDc0OTQwNH0.oN8OeeHGGrxefPSypH0LuHg-3r7SfNeIUxt2by3_Hps"
);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("ログアウトエラー:", error);
  };

  if (!session) {
    // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
    return (
      <>
        <SignUp />
        <SignIn />
      </>
    );
  } else {
    return (
      <div>
        <p>Logged in!</p>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
}

export default App;
