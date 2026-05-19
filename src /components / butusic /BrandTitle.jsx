import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

const BARCODE_WIDTHS = [
  2,1,1,2,1,3,1,1,2,1,1,1,3,1,2,1,1,2,1,1,3,1,1,2,1,2,1,1,1,3,
  1,2,1,1,2,1,3,1,1,1,2,1,2,1,1,3,1,1,2,1,2,1,1,1,2,3,1,1,2,1,
  1,2,1,3,1,1,2,1,1,2,1,3,1,2,1,1,2,1,1,1,2,1,3,1,2,1,1,2,1,2,
];

export default function BrandTitle() {
  const { theme } = useTheme();
  const isDark = theme.bg === '#0a0a0a' || theme.bg === '#09090b' || theme.bg?.startsWith('#0');

  return (
    <div
      className="rounded-2xl flex flex-col justify-between h-full relative overflow-hidden transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}
    >
      {/* Dot grid — top right */}
      <div className="absolute top-4 right-4 grid grid-cols-3 gap-[5px] opacity-20">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ background: theme.text }} />
        ))}
      </div>

      {/* Top label */}
      <div className="pt-4 px-5">
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: theme.textMuted }}>
          Since 2019
        </span>
      </div>

      {/* Main content */}
      <div className="px-5 pb-1 flex flex-col gap-0">
        <p
          className="font-black tracking-[0.22em] uppercase leading-none"
          style={{ color: theme.primary, fontSize: 9 }}
        >
          Illustrations
        </p>
        <h1
          className="font-black tracking-tight leading-none my-1"
          style={{
            color: theme.text,
            fontSize: 38,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          BUTUSIC
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-[2px] w-6 rounded-full" style={{ background: theme.primary }} />
        </div>
        <p
          className="font-bold tracking-[0.2em] uppercase mt-1"
          style={{ color: theme.textMuted, fontSize: 9 }}
        >
          Exhibition
        </p>
      </div>

      {/* Barcode */}
      <div className="mx-5 mb-4 mt-3 overflow-hidden rounded-lg" style={{ height: 44 }}>
        <div
          className="w-full h-full flex items-stretch rounded-lg overflow-hidden px-1"
          style={{ background: theme.text + '10' }}
        >
          {BARCODE_WIDTHS.map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w * 2.5}px`,
                flexShrink: 0,
                background: i % 2 === 0 ? theme.text : 'transparent',
                opacity: i % 2 === 0 ? 0.85 : 0,
                borderRadius: '0.5px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
