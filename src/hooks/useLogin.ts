import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";

const redirectBase =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // Development URL
    : "https://www.kolbeyang.com"; // Production URL

const useLogin = () => {
  const router = useRouter();

  const loginWith = async (provider: Provider) => {
    // const { data, error } = await supabaseClient.auth.signInWithOAuth({
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${redirectBase}/auth/callback`,
      },
    });
    // TODO: replace with toast
    if (error) {
      router.push("/error");
    }
  };

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: replace with toast
    if (error) {
      router.push("/error");
    }
    router.push("/login");
  };

  return { loginWith, logout };
};

export default useLogin;
