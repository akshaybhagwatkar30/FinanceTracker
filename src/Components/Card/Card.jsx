import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div
      className={`${className} mb-10 size-full rounded-sm border-solid border-2 border-gray-400 p-4`}
    >
      {children}
    </div>
  );
};
