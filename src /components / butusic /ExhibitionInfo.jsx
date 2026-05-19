import React, { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { MapPin } from 'lucide-react';

const EXHIBITION_DATE = new Date('2026-09-15T10:00:00');

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Digit({ value, label, theme }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-bold text-lg leading-none tabular-nums" style={{ fontFamily: "'Courier New', monospace", color: theme.text, letterSpacing: '0.05em' }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] font-black tracking-widest uppercase mt-0.5" style={{ color: theme.textMuted }}>{label}</span>
    </div>
  );
}

export default function ExhibitionInfo() {
  const { theme } = useTheme();
  const { days, hours, mins, secs } = useCountdown(EXHIBITION_DATE);
  return (
    <div className="rounded-2xl p-4 flex flex-col justify-between h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 w-fit" style={{ background: theme.accent }}>
        <MapPin className="w-3 h-3 text-black" fill="black" />
        <span className="text-[10px] font-black text-black tracking-wider">1217 PURRWEB STREET, LA</span>
      </div>
      <div>
        <h3 className="font-black text-[12px] tracking-wider leading-snug uppercase" style={{ color: theme.text }}>
          First Exhibition of<br />Illustrations Offline
        </h3>
        <p className="text-[10px] mt-1 tracking-widest font-medium uppercase" style={{ color: theme.textMuted }}>
          Sep 15, 2026 · Butusic.com
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-xl px-3 py-2"
        style={{ background: theme.text + '08', border: `1px solid ${theme.text}12` }}>
        <Digit value={days} label="D" theme={theme} />
        <span className="font-bold text-base mb-3" style={{ color: theme.textMuted }}>:</span>
        <Digit value={hours} label="H" theme={theme} />
        <span className="font-bold text-base mb-3" style={{ color: theme.textMuted }}>:</span>
        <Digit value={mins} label="M" theme={theme} />
        <span className="font-bold text-base mb-3" style={{ color: theme.textMuted }}>:</span>
        <Digit value={secs} label="S" theme={theme} />
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
          <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: theme.textMuted }}>Live</span>
        </div>
      </div>
    </div>
  );
}
