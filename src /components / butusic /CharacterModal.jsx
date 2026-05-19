import React, { useEffect } from 'react';
import { X, Download, ExternalLink, Star } from 'lucide-react';

export default function CharacterModal({ character, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!character) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(14px)', animation: 'fadeIn 0.2s ease' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: '#1a1a1a', boxShadow: '0 40px 100px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.07)', animation: 'slideUp 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-white" />
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-[320px] shrink-0 relative overflow-hidden" style={{ minHeight: 360, background: character.bgColor }}>
            <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top" style={{ minHeight: 360 }} />
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10">
              <span className="text-white text-[10px] font-black tracking-widest">#{character.edition}</span>
            </div>
          </div>
          {/* Info */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: '#ccff00', borderColor: '#ccff00', background: 'rgba(204,255,0,0.08)' }}>{character.tag}</span>
                <span className="text-white/30 text-[10px]">{character.year}</span>
              </div>
              <h2 className="text-white font-black text-2xl tracking-tight">{character.name}</h2>
              <p className="text-white/50 text-sm mt-0.5">{character.artist}</p>
              <p className="text-white/60 text-[13px] leading-relaxed mt-3">{character.description}</p>
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {character.stats.map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white font-black text-base leading-none" style={{ fontFamily: "'Courier New', monospace" }}>{s.value}</p>
                    <p className="text-white/30 text-[9px] font-black tracking-wider uppercase mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5" fill={i <= character.rating ? '#ccff00' : 'transparent'} color={i <= character.rating ? '#ccff00' : '#ffffff30'} />
                ))}
                <span className="text-white/40 text-[11px] ml-1">{character.rating}.0 / 5.0</span>
              </div>
            </div>
            <div className="flex gap-2.5 mt-5">
              <a href={character.image} download target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-[11px] tracking-wider uppercase transition-all hover:scale-[1.02]"
                style={{ background: '#ccff00', color: '#000' }}>
                <Download className="w-3.5 h-3.5" /> Download Full Res
              </a>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[11px] tracking-wider uppercase border border-white/10 text-white hover:bg-white/5 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Butusic.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
