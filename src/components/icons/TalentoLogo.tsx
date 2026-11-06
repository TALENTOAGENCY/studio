import React from 'react';

export function TalentoMark({ className = "h-8 w-8", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 250"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Outer corner brackets */}
      <g fill="#CAA561">
        {/* Top-Left */}
        <path d="M 5 5 L 72 5 L 72 16 L 16 16 L 16 72 L 5 72 Z" />
        {/* Top-Right */}
        <path d="M 245 5 L 178 5 L 178 16 L 234 16 L 234 72 L 245 72 Z" />
        {/* Bottom-Left */}
        <path d="M 5 245 L 72 245 L 72 234 L 16 234 L 16 178 L 5 178 Z" />
        {/* Bottom-Right */}
        <path d="M 245 245 L 178 245 L 178 234 L 234 234 L 234 178 L 245 178 Z" />
      </g>

      {/* Inner corner accent ticks */}
      <g stroke="#CAA561" strokeWidth="3" fill="none" strokeLinecap="square">
        {/* Top-Left */}
        <polyline points="29,52 29,29 52,29" />
        {/* Top-Right */}
        <polyline points="198,29 221,29 221,52" />
        {/* Bottom-Left */}
        <polyline points="29,198 29,221 52,221" />
        {/* Bottom-Right */}
        <polyline points="198,221 221,221 221,198" />
      </g>

      {/* Reticle crosshair ticks */}
      <g stroke="#CAA561" strokeWidth="3.5" strokeLinecap="square">
        <line x1="125" y1="56" x2="125" y2="36" />
        <line x1="125" y1="194" x2="125" y2="214" />
        <line x1="56" y1="125" x2="36" y2="125" />
        <line x1="194" y1="125" x2="214" y2="125" />
      </g>

      {/* Double Concentric Rings */}
      <circle cx="125" cy="125" r="68" fill="none" stroke="#CAA561" strokeWidth="4.5" />
      <circle cx="125" cy="125" r="57" fill="none" stroke="#CAA561" strokeWidth="2.5" />

      {/* Center Serif 'T' */}
      <path
        d="M 97 96 L 153 96 L 153 118 L 146 118 L 144 108 L 133 108 L 133 144 L 144 144 L 144 154 L 106 154 L 106 144 L 117 144 L 117 108 L 106 108 L 104 118 L 97 118 Z"
        fill="#CAA561"
      />
    </svg>
  );
}

const TalentoLogo = ({ className = "h-8 w-auto", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 940 250"
    className={className}
    role="img"
    aria-label="TALENTO - THINK TALENT"
    {...props}
  >
    {/* Left Icon */}
    <g transform="translate(0, 0)">
      {/* Outer corner brackets */}
      <g fill="#CAA561">
        <path d="M 5 5 L 72 5 L 72 16 L 16 16 L 16 72 L 5 72 Z" />
        <path d="M 245 5 L 178 5 L 178 16 L 234 16 L 234 72 L 245 72 Z" />
        <path d="M 5 245 L 72 245 L 72 234 L 16 234 L 16 178 L 5 178 Z" />
        <path d="M 245 245 L 178 245 L 178 234 L 234 234 L 234 178 L 245 178 Z" />
      </g>

      {/* Inner corner accent ticks */}
      <g stroke="#CAA561" strokeWidth="3" fill="none" strokeLinecap="square">
        <polyline points="29,52 29,29 52,29" />
        <polyline points="198,29 221,29 221,52" />
        <polyline points="29,198 29,221 52,221" />
        <polyline points="198,221 221,221 221,198" />
      </g>

      {/* Reticle crosshair ticks */}
      <g stroke="#CAA561" strokeWidth="3.5" strokeLinecap="square">
        <line x1="125" y1="56" x2="125" y2="36" />
        <line x1="125" y1="194" x2="125" y2="214" />
        <line x1="56" y1="125" x2="36" y2="125" />
        <line x1="194" y1="125" x2="214" y2="125" />
      </g>

      {/* Double Concentric Rings */}
      <circle cx="125" cy="125" r="68" fill="none" stroke="#CAA561" strokeWidth="4.5" />
      <circle cx="125" cy="125" r="57" fill="none" stroke="#CAA561" strokeWidth="2.5" />

      {/* Center Serif 'T' */}
      <path
        d="M 97 96 L 153 96 L 153 118 L 146 118 L 144 108 L 133 108 L 133 144 L 144 144 L 144 154 L 106 154 L 106 144 L 117 144 L 117 108 L 106 108 L 104 118 L 97 118 Z"
        fill="#CAA561"
      />
    </g>

    {/* Wordmark: TALENTO */}
    <text
      x="310"
      y="148"
      fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif"
      fontSize="112"
      fontWeight="700"
      letterSpacing="0.08em"
      fill="#CAA561"
    >
      TALENTO
    </text>

    {/* Subtitle rule lines & text: — THINK TALENT — */}
    <line x1="310" y1="202" x2="365" y2="202" stroke="#CAA561" strokeWidth="4" />
    <text
      x="618"
      y="216"
      textAnchor="middle"
      fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      fontSize="44"
      fontWeight="900"
      letterSpacing="0.16em"
      className="fill-foreground dark:fill-white"
    >
      THINK TALENT
    </text>
    <line x1="870" y1="202" x2="925" y2="202" stroke="#CAA561" strokeWidth="4" />
  </svg>
);

export default TalentoLogo;
