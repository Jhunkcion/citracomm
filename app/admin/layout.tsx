"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const savedSession = localStorage.getItem("citra_auth");

    if (!savedSession) {
      router.replace("/login");
      return;
    }

    try {
      const session = JSON.parse(savedSession) as { authenticated?: boolean; role?: string };
      if (!session.authenticated || session.role !== "admin") {
        router.replace("/login");
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
