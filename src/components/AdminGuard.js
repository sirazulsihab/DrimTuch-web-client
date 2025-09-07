"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

    if (!user || user.role !== "admin") {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
