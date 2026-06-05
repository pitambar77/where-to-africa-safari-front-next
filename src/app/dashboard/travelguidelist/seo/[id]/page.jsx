"use client";

import TravelguideDetailsSection from "@/pages/Seo/TravelguideDetailsSection";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <TravelguideDetailsSection id={id} />;
}