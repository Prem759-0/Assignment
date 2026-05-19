import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

function DaisyIcon({ color, accent }) {
  const petals = 9;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        return (
          <ellipse
            key={i}
            cx="28"
            cy="12"
            rx="5"
            ry="10"
            fill="none"
            stroke={color}
            strokeWidth="1.4"
            opacity="0.85"
            transform={`rotate(${angle} 28 28)`}
          />
        );
      })}
      {/* Center circle */}
      <circle cx="28" cy="28" r="8" fill={color} opacity="0.9"/>
      <circle cx="28" cy="28" r="5" fill={accent} opacity="0.25"/>
    </svg>
  );
}

export default function MoreCasesCircle() {
  const { theme } = useTheme();
  return (
    <div
      className="relative rounded-2xl flex items-center justify-center overflow-hidden h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(circle at center, ${theme.primary} 0%, transparent 70%)` }}
      />

      <div className="relative w-44 h-44">
        {/* Rotating text */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          style={{ animation: 'spin 18s linear infinite' }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text
            fill={theme.text}
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="5"
          >
            <textPath href="#circlePath">
              MORE CASES  •  MORE CASES  •  MORE CASES  •{'  '}
            </textPath>
          </text>
        </svg>

        {/* Dotted inner circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r="58"
            fill="none"
            stroke={theme.text}
            strokeWidth="0.8"
            strokeDasharray="3 6"
            opacity="0.2"
          />
        </svg>

        {/* Center daisy */}
        <div className="absolute inset-0 flex items-center justify-center">
          <DaisyIcon color={theme.text} accent={theme.primary} />
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
