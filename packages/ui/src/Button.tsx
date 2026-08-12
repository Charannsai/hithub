import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-white hover:bg-zinc-200 text-black font-semibold shadow-sm",
    secondary: "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800",
    outline: "border border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-200 hover:border-zinc-700",
    ghost: "bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white",
    danger: "bg-zinc-900 hover:bg-rose-950/50 text-rose-400 border border-rose-900/50",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-9 px-4 text-xs gap-2",
    lg: "h-10 px-5 text-sm gap-2.5",
  };

  return (
    <button
      className={twMerge(clsx(base, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </button>
  );
};
