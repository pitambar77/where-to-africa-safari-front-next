"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
