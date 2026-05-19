import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function MoreCasesCircle() {
  const { theme } = useTheme();
  return (
    <div className="relative rounded-2xl flex items-center justify-center overflow-hidden h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      <div className="relative w-40 h-40 md:w-44 md:h-44">
        <svg className="w-full h-full animate-spin-slow absolute inset-0" viewBox="0 0 200 200">
          <defs>
            <path id="circlePath" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
          </defs>
          <text fill={theme.text} fontSize="12" fontWeight="700" letterSpacing="5.5">
            <textPath href="#circlePath">MORE CASES  •  MORE CASES  •  MORE CASES  •  </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="7" fill={theme.text} opacity="0.9"/>
            {[0,40,80,120,160,200,240,280,320].map((angle, i) => (
              <ellipse key={i} cx="26" cy="11" rx="5.5" ry="10"
                fill={theme.primary} fillOpacity="0.25" stroke={theme.text} strokeWidth="1.2"
                transform={`rotate(${angle} 26 26)`} />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
