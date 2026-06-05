"use client";
import ConservationSeo from "@/pages/Seo/ConservationSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ConservationSeo id={id} />;
}