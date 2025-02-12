import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabaseClient.auth.getUser();
      // TODO: switch to toast
      if (error) console.error("Error fetching user:", error);
      setUser(data?.user);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return { user, isLoading };
};
