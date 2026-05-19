import React from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const QR_PATTERN = [1,1,1,0,1,1,1,1,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,1,1,0,1,1,1,0,0,1,0,0,0,1,1,0,1,0,1,1,0,1,0,0,1];

export default function AppStoreCard() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-4 flex items-center justify-between h-full relative overflow-hidden transition-colors duration-500"
      style={{ background: theme.accent }}>
      <div className="relative z-10 flex-1 pr-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-black font-black text-[13px] tracking-widest">APPSTORE</span>
        </div>
        <p className="text-black/70 text-[11px] font-semibold leading-snug">Download & get<br />10% off first order</p>
        <div className="mt-2.5 grid grid-cols-7 gap-[2px] w-14">
          {QR_PATTERN.map((v, i) => (
            <div key={i} className="aspect-square rounded-[1px]" style={{ background: v ? 'black' : 'transparent', opacity: v ? 0.7 : 0 }} />
          ))}
        </div>
      </div>
      <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#000' }}>
        <ArrowUpRight className="w-4 h-4" style={{ color: theme.accent }} />
      </div>
    </div>
  );
}
