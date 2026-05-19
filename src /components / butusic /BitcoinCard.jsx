import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

const BARS = [60,85,45,90,55,70,40,95,65,50,80,35,75,88,42,68,92,48,72,58,82,38,78,95,52,65,88,44,70,60,85,45,90,55,70,40,95,65,50];

export default function BitcoinCard() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-4 flex flex-col justify-between h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-base" style={{ background: theme.accent, color: '#000' }}>₿</div>
        <p className="text-[12px] font-semibold leading-snug" style={{ color: theme.text }}>We accept more<br />than just bitcoins</p>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {['ETH','SOL','USDT'].map((c) => (
          <div key={c} className="px-2 py-1 rounded-md" style={{ background: theme.text + '0f', border: `1px solid ${theme.text}18` }}>
            <span className="text-[9px] font-bold" style={{ color: theme.textMuted }}>{c}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-end gap-[2px] h-9">
        {BARS.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: theme.text + 'cc' }} />
        ))}
      </div>
    </div>
  );
}
