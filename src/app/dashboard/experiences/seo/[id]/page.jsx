"use client";

import ExperienceDetailsSeo from "@/pages/Seo/ExperienceDetailsSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ExperienceDetailsSeo id={id} />;
}