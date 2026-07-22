"use client";

import clsx from "clsx";

const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="space-y-3 w-full">
      {label && <label className=" font-quicksand tracking-wide font-medium text-gray-700">{label}</label>}

      <input
        {...props}
        className={clsx(
          "w-full",
          "h-14",
          "mt-4",
          "rounded-md",
          "border",
          "px-4",
          "outline-none",
          "transition",
          "font-quicksand",
          error ? "border-red-500" : "border-gray-300 focus:border-black",
          className,
        )}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
