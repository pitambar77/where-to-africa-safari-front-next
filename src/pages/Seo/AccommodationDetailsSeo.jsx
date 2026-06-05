"use client";

import SeoForm from "@/components/SeoForm";

export default function AccommodationDetailsSeo({ id }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Accommodation landing SEO Settings</h2>

      <SeoForm referenceId={id} referenceType="accommodation" />
    </div>
  );
}
