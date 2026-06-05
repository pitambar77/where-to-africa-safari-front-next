"use client";

import DestinationLandingSeo from "@/pages/Seo/DestinationLandingSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <DestinationLandingSeo id={id} />;
}