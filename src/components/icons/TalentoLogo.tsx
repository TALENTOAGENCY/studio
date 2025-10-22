import * as React from "react";
import { cn } from "@/lib/utils";

export const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 100"
    {...props}
    className={cn("w-full h-full", props.className)}
  >
    {/* Background rectangle */}
    <rect
      x="0"
      y="0"
      width="400"
      height="100"
      fill="#3b5f6f"
      rx="8"
    />
    
    {/* Concentric circles pattern */}
    <g transform="translate(50, 50)">
      {/* Outer circle */}
      <circle
        cx="0"
        cy="0"
        r="25"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      {/* Middle circle */}
      <circle
        cx="0"
        cy="0"
        r="18"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      {/* Inner circle */}
      <circle
        cx="0"
        cy="0"
        r="12"
        fill="none"
        stroke="white"
        strokeWidth="1"
      />
      {/* Center dot */}
      <circle
        cx="0"
        cy="0"
        r="3"
        fill="white"
      />
    </g>
    
    {/* TALENTO text */}
    <text
      x="100"
      y="45"
      fontFamily="Arial, sans-serif"
      fontSize="32"
      fill="white"
      fontWeight="bold"
      dominantBaseline="middle"
    >
      TALENTO
    </text>
    
    {/* SEAMLESS TALENT SOLUTIONS text */}
    <text
      x="100"
      y="65"
      fontFamily="Arial, sans-serif"
      fontSize="10"
      fill="white"
      dominantBaseline="middle"
      letterSpacing="0.5"
    >
      SEAMLESS TALENT SOLUTIONS.
    </text>
  </svg>
);

export default TalentoLogo;
