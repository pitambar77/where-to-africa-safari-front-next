"use client";

import clsx from "clsx";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon,
}) => {
  const variants = {
    primary: "bg-[#aaa085] text-white hover:bg-[#aa8b51]",

    secondary: "bg-[#aaa085] text-white hover:bg-[#aa8b51]",

    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",

    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "rounded-full",
        "px-8 py-2",
        "text-lg font-semibold",
        "transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
    >
      {children}

      {icon && <span className="text-xl flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;
