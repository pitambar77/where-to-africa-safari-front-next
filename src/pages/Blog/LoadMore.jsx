"use client";

import { Loader2 } from "lucide-react";

export default function LoadMore({
  loading = false,
  onClick,
  text = "Load More Articles",
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-[#aaa086] cursor-pointer px-8 py-3 text-sm font-semibold font-quicksand uppercase tracking-wider transition-all duration-300
        ${
          loading
            ? "cursor-not-allowed bg-gray-200 text-gray-500 border-gray-200"
            : "bg-[#aaa086] text-white hover:bg-[#ab8c51] hover:shadow-lg"
        }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </>
      ) : (
        text
      )}
    </button>
  );
}
