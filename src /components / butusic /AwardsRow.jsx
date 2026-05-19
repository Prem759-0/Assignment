import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

const awards = [
  { label: 'AWWWARDS', year: '2023' },
  { label: 'CSS DESIGN', year: '2023' },
  { label: 'FWA', year: '2022' },
  { label: 'DRIBBBLE', year: '2023' },
];

export default function AwardsRow() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl px-4 py-3 flex items-center justify-around h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      {awards.map((award, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ border: `1px solid ${theme.accent}44` }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L11.5 6.5H16.5L12.5 9L14 13.5L10 11L6 13.5L7.5 9L3.5 6.5H8.5L10 2Z" fill={theme.accent} opacity="0.85"/>
              <rect x="8" y="14" width="4" height="1.5" rx="0.75" fill={theme.accent} opacity="0.5"/>
              <rect x="6.5" y="15.5" width="7" height="1.2" rx="0.6" fill={theme.accent} opacity="0.35"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-black tracking-wider" style={{ color: theme.text }}>{award.label}</p>
            <p className="text-[9px] font-medium" style={{ color: theme.textMuted }}>{award.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
