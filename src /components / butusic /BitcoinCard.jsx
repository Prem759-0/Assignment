import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

const BARS = [45,70,38,85,52,90,40,78,60,95,48,72,55,88,42,68,80,35,75,92,50,65,82,44,70,58,86,46,74,62,96,50,78,42,88,56,72,66,84];

export default function BitcoinCard() {
  const { theme } = useTheme();
  return (
    <div
      className="rounded-2xl p-4 flex flex-col justify-between h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}
    >
      {/* Bitcoin label + text */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-lg shadow-md"
          style={{ background: theme.accent, color: '#000' }}
        >
          ₿
        </div>
        <p
          className="font-semibold leading-snug"
          style={{ color: theme.text, fontSize: 12.5 }}
        >
          We accept more<br />than just bitcoins
        </p>
      </div>

      {/* Crypto tags */}
      <div className="flex items-center gap-1.5 mt-2">
        {['ETH', 'SOL', 'USDT'].map((c) => (
          <div
            key={c}
            className="px-2.5 py-1 rounded-lg"
            style={{
              background: theme.text + '0d',
              border: `1px solid ${theme.text}1a`,
            }}
          >
            <span className="text-[10px] font-bold" style={{ color: theme.textMuted }}>{c}</span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mt-3 flex items-end gap-[2px]" style={{ height: 40 }}>
        {BARS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: theme.text,
              opacity: 0.15 + (h / 100) * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}
