"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance.js";

const Page = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/contactus");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      await axiosInstance.delete(`/api/contactus/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Contact us Page</h2>
        <button
          onClick={() => router.push("/dashboard/contactus/create")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create New
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Subtitle</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.title}</td>
              <td className="border p-2">{item.subtitle}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/dashboard/contactus/${item._id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() =>
                    router.push(`/dashboard/contactus/${item._id}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    router.push(`/dashboard/contactus/seo/${item._id}`)
                  }
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                >
                  SEO
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
