"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (session) {
        router.push("/today");
      } else {
        router.push("/login");
      }
    };

    checkUserStatus();
  }, [router]);

  return null;
};

export default HomePage;
