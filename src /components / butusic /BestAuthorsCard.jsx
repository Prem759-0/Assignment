import React from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Star, ArrowRight } from 'lucide-react';

const AVATAR_COLORS = ['#7c3aed','#6d28d9','#5b21b6','#4c1d95','#8b5cf6'];

export default function BestAuthorsCard() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-5 flex items-center justify-between h-full relative overflow-hidden transition-colors duration-500"
      style={{ background: theme.id === 'light' ? '#ffffff' : theme.card === '#ffffff' ? '#f8f8f8' : '#ffffff', border: `1px solid ${theme.cardBorder}` }}>
      <div className="flex-1">
        <h2 className="font-black text-[18px] leading-tight tracking-tight text-black">
          ONLY THE BEST<br />AUTHORS
        </h2>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex -space-x-2">
            {AVATAR_COLORS.map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white shrink-0"
                style={{ background: c, zIndex: 5 - i }}>{String.fromCharCode(65 + i)}</div>
            ))}
          </div>
          <span className="text-black/40 text-[10px] font-semibold">184 unique artists</span>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0">
        <span className="text-black font-black text-[42px] leading-none">4.97</span>
        <div className="flex gap-0.5 mt-1">
          {[1,2,3,4].map(i => <Star key={i} className="w-3.5 h-3.5" fill="#ccff00" color="#ccff00" />)}
          <Star className="w-3.5 h-3.5" fill="#ccff00" color="#ccff00" opacity={0.3} />
        </div>
        <button className="mt-2.5 text-white text-[9px] font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 tracking-widest uppercase transition-colors"
          style={{ background: '#7c3aed' }}>
          Best Reviews <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="absolute -bottom-1 left-0 right-0 text-center pointer-events-none overflow-hidden h-7">
        <span className="text-black/5 text-4xl font-black tracking-widest whitespace-nowrap">BUTUSIC BUTUSIC</span>
      </div>
    </div>
  );
}
