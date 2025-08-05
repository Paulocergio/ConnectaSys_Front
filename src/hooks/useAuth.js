"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(protectedRoute = true) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    if (protectedRoute && !userData) {
      router.replace("/login");
    }

    setLoading(false);
  }, []);

  return { loading };
}
