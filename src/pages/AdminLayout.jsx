

"use client";

import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-50 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
