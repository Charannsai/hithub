import React from "react";

export const Avatar: React.FC<{
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}> = ({ src, alt, size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials = alt.substring(0, 2).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover border border-zinc-700/60 shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-emerald-700/80 text-white flex items-center justify-center font-bold border border-emerald-500/30 shadow-sm`}
    >
      {initials}
    </div>
  );
};
