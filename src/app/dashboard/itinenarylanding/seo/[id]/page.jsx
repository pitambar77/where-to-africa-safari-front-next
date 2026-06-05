"use client";

import ItinenaryLandingSeo from "@/pages/Seo/ItinenaryLandingSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ItinenaryLandingSeo id={id} />;
}