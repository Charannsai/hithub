import React from "react";

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#121215] border border-[#27272a] rounded-lg p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};
