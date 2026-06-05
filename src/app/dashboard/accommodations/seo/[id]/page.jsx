"use client";

import AccommodationDetailsSeo from "@/pages/Seo/AccommodationDetailsSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <AccommodationDetailsSeo id={id} />;
}