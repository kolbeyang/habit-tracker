"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/today");
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthCallback;
