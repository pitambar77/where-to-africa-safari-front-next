// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Sidebar from "@/components/Sidebar";
// import { jwtDecode } from "jwt-decode";

// export default function DashboardLayout({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);

//       if (decoded.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token");
//         router.push("/login");
//       }
//     } catch {
//       localStorage.removeItem("token");
//       router.push("/login");
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-64 flex-shrink-0 sticky top-0 h-screen">
//         <Sidebar />
//       </div>

//       <div className="flex-1 p-6">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={handleLogout}
//             className="bg-black text-white px-4 py-2 rounded-lg"
//           >
//             Logout
//           </button>
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// }

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
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="h-screen w-[280px] shrink-0 overflow-y-auto overflow-x-hidden bg-[#111827]">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={handleLogout}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>

          {/* Page */}
          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
