"use client";
import AccommodationLandingSeo from "@/pages/Seo/AccommodationLandingSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <AccommodationLandingSeo id={id} />;
}