import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "neutral" | "brand";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral" }) => {
  const styles = {
    success: "bg-zinc-900 text-zinc-300 border-zinc-700",
    warning: "bg-zinc-900 text-zinc-300 border-zinc-700",
    danger: "bg-zinc-900 text-rose-300 border-rose-900/40",
    neutral: "bg-zinc-900 text-zinc-400 border-zinc-800",
    brand: "bg-white text-black border-white font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
