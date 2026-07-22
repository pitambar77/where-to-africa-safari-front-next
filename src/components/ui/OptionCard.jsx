"use client";

import clsx from "clsx";
import { Check } from "lucide-react";

const OptionCard = ({
  label,
  selected,
  onClick,
  multi = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full",
        "h-10",
        "rounded-sm",
        "border",
        "font-semibold",
        "text-lg",
        "transition-all duration-200",
        "flex items-center justify-center",
        "cursor-pointer",
    
        selected
          ? "bg-[#aa8b51] text-white border-[#aa8b51]"
          : "bg-gray-100 text-gray-800 border-gray-200 hover:border-[#aa8b51]",
        className,
      )}
    >
      {label}

      {selected && (
        <div className="absolute top-0 right-0 w-6 h-6 bg-white flex items-center justify-center">
          <Check size={16} className="text-[#aa8b51]" strokeWidth={3} />
        </div>
      )}
    </button>
  );
};

export default OptionCard;
