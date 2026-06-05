"use client";
import { useEffect, useState } from "react";

export default function ZauiBookingModal({ url, isOpen, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // ❌ Click close → show confirm modal
  const handleCloseClick = () => {
    setShowConfirm(true);
  };

  // ✅ User confirms leaving
  const handleLeave = () => {
    setShowConfirm(false);
    onClose();
  };

  // ❌ User cancels closing
  const handleContinue = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {/* MAIN BOOKING MODAL */}
      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } items-center justify-center bg-black/70`}
      >
        <div className="relative w-[85%] h-[95%] bg-white rounded-lg overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleCloseClick}
            className="absolute top-3 right-8 z-10 text-black text-3xl cursor-pointer"
          >
            ×
          </button>

          {/* Loading */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <p className="text-lg">Loading booking...</p>
            </div>
          )}

          {/* iframe */}
          <iframe
            src={url}
            loading="eager"
            className="w-full h-full border-0"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>

      {/* 🔥 CONFIRM MODAL (LIKE YOUR SCREENSHOT) */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100000] flex items-start justify-center bg-black/40 pt-[80px] md:pt-[100px]">
          <div className="relative bg-white w-[450px] max-w-[95%] rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.25)] px-8 py-8 text-center">
            {/* ❌ Close (top-right) */}
            <button
              onClick={handleContinue}
              className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-[18px] font-medium text-[#2e2c2d] leading-[28px]">
              Are you sure you want to leave?
            </h2>

            {/* Subtitle */}
            <p className="text-[#999] text-[14px] mb-[12px] tracking-tight">
              You will lose any spots you are holding currently.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-2">
              {/* Leave */}
              <button
                onClick={handleLeave}
                className="min-w-[90px] cursor-pointer py-3 bg-[#c0bfbf] hover:bg-[#969696] text-white rounded-[3px] text-sm font-medium"
              >
                Leave
              </button>

              {/* Continue */}
              <button
                onClick={handleContinue}
                className="min-w-[180px] cursor-pointer py-3 bg-[#303030] hover:bg-black text-white rounded-[3px] text-sm font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
