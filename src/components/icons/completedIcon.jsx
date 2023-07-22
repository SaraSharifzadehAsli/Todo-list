import React from "react";

const CompletedIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1" />
      <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_479)" />
      <path
        d="M8 12.3041L10.6959 15L16.6959 9"
        stroke="white"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_479"
          x1="-12"
          y1="12"
          x2="12"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#55DDFF" />
          <stop offset="1" stopColor="#C058F3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CompletedIcon;
