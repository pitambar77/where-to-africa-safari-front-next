"use client";

import AboutUsSeo from "@/pages/Seo/AboutUsSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <AboutUsSeo id={id} />;
}