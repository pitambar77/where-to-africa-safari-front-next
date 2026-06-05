"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance.js";
import ItinenaryLandingForm from "@/components/LandingPage/ItinenaryLandingForm";

export default function Page() {
  const { id } = useParams();

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/api/itinenarylanding/${id}`);

      setEditData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!editData) {
    return <p className="p-6">Loading...</p>;
  }

  return <ItinenaryLandingForm editData={editData} />;
}
