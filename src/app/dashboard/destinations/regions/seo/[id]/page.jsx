"use client";

import SeoForm from "@/components/SeoForm";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <SeoForm
      referenceId={id}
      referenceType="regions"
    />
  );
}