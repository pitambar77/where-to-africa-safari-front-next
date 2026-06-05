"use client";

import SeoForm from "@/components/SeoForm";

export default function ItinenaryLandingSeo({ id }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Itinenary landing SEO Settings</h2>

      <SeoForm referenceId={id} referenceType="itinenarylanding" />
    </div>
  );
}