import React from "react";

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-zinc-900/90 border border-zinc-800 rounded-lg p-5 shadow-lg backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
};
