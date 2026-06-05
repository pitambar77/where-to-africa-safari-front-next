"use client";

import ItineraryDetailsSeo from "@/pages/Seo/ItineraryDetailsSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ItineraryDetailsSeo id={id} />;
}