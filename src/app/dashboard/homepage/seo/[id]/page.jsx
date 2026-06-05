"use client";
import HomepageSeo from "@/pages/Seo/HomepageSeo";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <HomepageSeo id={id} />;
}