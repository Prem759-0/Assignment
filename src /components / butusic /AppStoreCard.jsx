import React from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const QR_GRID = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
  [1,1,0,1,0,1,1,1,0,0,1,1,0,1,1,0,1,0,1,1,0],
  [0,1,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,1,0,1],
  [1,0,1,1,0,0,1,0,1,1,0,0,1,0,1,1,0,1,0,0,1],
  [0,1,1,0,1,1,0,0,0,1,1,0,0,1,0,0,1,1,0,1,0],
  [1,0,0,1,0,0,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1],
  [0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,1,1,0,0],
  [1,1,1,1,1,1,1,0,0,1,1,0,1,0,0,0,1,0,0,1,0],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,0,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,0,0,1,0,1,0,0,0,1,0],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,0,1,0,0],
  [1,1,1,1,1,1,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
];

export default function AppStoreCard() {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-2xl h-full relative overflow-hidden flex items-stretch transition-colors duration-500"
      style={{ background: theme.accent }}
    >
      {/* Arrow button */}
      <div
        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl flex items-center justify-center z-10 shadow-md"
        style={{ background: '#000' }}
      >
        <ArrowUpRight className="w-4 h-4" style={{ color: theme.accent }} />
      </div>

      {/* QR Code — left side */}
      <div className="flex items-center justify-center p-3 pl-4 shrink-0">
        <div
          className="rounded-xl overflow-hidden p-1.5"
          style={{ background: '#000', width: 88, height: 88 }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(21, 1fr)`,
              width: '100%',
              height: '100%',
              gap: '0.5px',
            }}
          >
            {QR_GRID.flat().map((v, i) => (
              <div
                key={i}
                style={{
                  background: v ? '#c8f500' : 'transparent',
                  borderRadius: v ? '0.5px' : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Text — right side */}
      <div className="flex flex-col justify-center pr-10 py-3 gap-0.5">
        <span
          className="font-black tracking-[0.18em] leading-none"
          style={{ color: '#000', fontSize: 13 }}
        >
          APPSTORE
        </span>
        <p
          className="font-semibold leading-snug mt-1"
          style={{ color: 'rgba(0,0,0,0.65)', fontSize: 10.5, maxWidth: 110 }}
        >
          Download the app and get 10% off your first purchase
        </p>
      </div>
    </div>
  );
}
