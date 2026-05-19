import React from 'react';
import { useTheme, THEMES } from '../../lib/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setThemeId } = useTheme();

  const icons = {
    dark: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5C4 1.5 1.5 4 1.5 7C1.5 10 4 12.5 7 12.5C9.5 12.5 11.6 10.9 12.3 8.7C11.7 9 11 9.2 10.2 9.2C7.8 9.2 5.8 7.2 5.8 4.8C5.8 3.6 6.3 2.5 7.1 1.7C7.07 1.63 7.04 1.57 7 1.5Z" fill="currentColor"/>
      </svg>
    ),
    neon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2.5" fill="currentColor"/>
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <line key={i} x1="7" y1="7" x2={7+4.5*Math.cos(a*Math.PI/180)} y2={7+4.5*Math.sin(a*Math.PI/180)} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        ))}
      </svg>
    ),
    light: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <line x1="5" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="5" y1="9" x2="7.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
      {Object.values(THEMES).map((t) => {
        const active = theme.id === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setThemeId(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-300"
            style={{
              background: active ? theme.primary : 'transparent',
              color: active ? '#fff' : theme.textMuted,
              boxShadow: active ? `0 0 12px ${theme.primary}66` : 'none',
            }}
          >
            {icons[t.id]}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
