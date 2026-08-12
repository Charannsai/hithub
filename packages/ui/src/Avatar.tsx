import React from "react";

export const Avatar: React.FC<{
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}> = ({ src, alt, size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-10 h-10 text-sm",
  };

  const initials = alt.substring(0, 2).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover border border-zinc-800 shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-zinc-800 text-zinc-200 flex items-center justify-center font-bold border border-zinc-700 shadow-sm`}
    >
      {initials}
    </div>
  );
};
