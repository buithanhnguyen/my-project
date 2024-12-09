import * as React from "react";

const ArrowIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
    ></path>
  </svg>
);

export default ArrowIcon;
