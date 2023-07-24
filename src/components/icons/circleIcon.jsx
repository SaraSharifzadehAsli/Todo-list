import React, { useState } from "react";

const CircleIcon = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function getStorkeColor() {
    return isHovered ? "url(#hoverGradient)" : "url(#storkeDefault)";
  }

  return (
    <svg
      onClick={() => onClick && onClick()}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "pointer" }}
    >
      <defs>
        <linearGradient id="storkeDefault">
          <stop offset="0%" stopColor="#e3e4f1" />
          <stop offset="100%" stopColor="#e3e4f1" />
        </linearGradient>
        <linearGradient id="hoverGradient">
          <stop offset="0%" stopColor="#55ddff" />
          <stop offset="100%" stopColor="#c058f3" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="11.5"
        fill="none"
        stroke={getStorkeColor()} // Reference the linearGradient here
        strokeWidth="1"
      />
    </svg>
  );
};

export default CircleIcon;
