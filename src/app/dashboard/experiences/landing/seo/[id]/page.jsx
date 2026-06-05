"use client";
import ExperienceLandingSeo from "@/pages/Seo/ExperienceLandingSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ExperienceLandingSeo id={id} />;
}