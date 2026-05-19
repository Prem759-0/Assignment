import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function BrandTitle() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-5 flex flex-col justify-end h-full relative overflow-hidden transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-20">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: theme.text }} />
        ))}
      </div>
      <div className="absolute top-4 left-5">
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: theme.textMuted }}>Since 2019</span>
      </div>
      <div className="relative z-10">
        <p className="text-[9px] font-black tracking-[0.25em] uppercase mb-1.5" style={{ color: theme.primary }}>Illustrations</p>
        <h1 className="text-[38px] font-black tracking-tight leading-none" style={{ color: theme.text }}>BUTUSIC</h1>
        <div className="mt-2 w-7 h-0.5" style={{ background: theme.primary }} />
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase mt-2.5" style={{ color: theme.textMuted }}>Exhibition</p>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl" style={{ background: theme.primary + '30' }} />
    </div>
  );
}
