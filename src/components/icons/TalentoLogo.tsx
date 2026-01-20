import React from 'react';

const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 50"
    {...props}
  >
    <g fill="currentColor">
      <circle cx="25" cy="25" r="24" fillOpacity=".2" />
      <circle cx="25" cy="25" r="18" fillOpacity=".3" />
      <circle cx="25" cy="25" r="12" />
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
    </g>
  </svg>
);

export default TalentoLogo;
