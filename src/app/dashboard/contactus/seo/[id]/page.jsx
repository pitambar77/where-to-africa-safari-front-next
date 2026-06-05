"use client";
import ContactUsSeo from "@/pages/Seo/ContactUsPage";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return <ContactUsSeo id={id} />;
}