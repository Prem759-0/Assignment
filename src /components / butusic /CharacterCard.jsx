import React from 'react';

export default function CharacterCard({ image, bgColor = '#7c3aed', className = '', label }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group ${className}`} style={{ background: bgColor }}>
      <img src={image} alt="3D Character" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
      {label && (
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10">
            <p className="text-white text-[10px] font-black tracking-widest uppercase">{label}</p>
            <p className="text-white/50 text-[9px] mt-0.5">Click to explore →</p>
          </div>
        </div>
      )}
    </div>
  );
}
