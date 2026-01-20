import React from 'react';

const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 50"
    {...props}
  >
    {/* Icon */}
    <g transform="translate(0, 0)">
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {/* The broken outer ring */}
        <path d="M 26 1.02 A 24 24 0 1 1 24 1.02" />
        {/* Inner rings */}
        <circle cx="25" cy="25" r="18" />
        <circle cx="25" cy="25" r="12" />
        <circle cx="25" cy="25" r="6" />
      </g>
      {/* Center dot */}
      <circle cx="25" cy="25" r="2" fill="currentColor" />
    </g>
    
    {/* Text */}
    <text
      x="60"
      y="22"
      fontFamily="'Space Grotesk', sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="currentColor"
    >
      TALENTO
    </text>
    <text
      x="60"
      y="40"
      fontFamily="'Inter', sans-serif"
      fontSize="10"
      fill="currentColor"
      letterSpacing="0.1em"
    >
      SEAMLESS TALENT SOLUTIONS.
    </text>
  </svg>
);

export default TalentoLogo;
