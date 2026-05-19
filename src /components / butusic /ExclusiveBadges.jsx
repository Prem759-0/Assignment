import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function ExclusiveBadges() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-3.5 flex items-center gap-2.5 h-full transition-colors duration-500"
      style={{ background: theme.primary, border: `1px solid ${theme.cardBorder}` }}>
      {[
        { title: 'Only exclusive', sub: 'illustrations', icon: '✦' },
        { title: 'We do not sell', sub: 'works on stock', icon: '✕' },
      ].map((b, i) => (
        <div key={i} className="flex-1 flex items-center gap-2.5 rounded-2xl px-3 py-2.5"
          style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-black"
            style={{ background: theme.accent, color: '#000' }}>{b.icon}</div>
          <div>
            <p className="text-white text-[11px] font-bold leading-tight">{b.title}</p>
            <p className="text-white/60 text-[10px] leading-tight">{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
