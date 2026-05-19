import React, { useState } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { useParallax } from '../hooks/useParallax';
import { Box } from 'lucide-react';

import CharacterCard from '../components/butusic/CharacterCard';
import MoreCasesCircle from '../components/butusic/MoreCasesCircle';
import CategoriesMenu from '../components/butusic/CategoriesMenu';
import ExclusiveBadges from '../components/butusic/ExclusiveBadges';
import BrandTitle from '../components/butusic/BrandTitle';
import ExhibitionInfo from '../components/butusic/ExhibitionInfo';
import BitcoinCard from '../components/butusic/BitcoinCard';
import AwardsRow from '../components/butusic/AwardsRow';
import AppStoreCard from '../components/butusic/AppStoreCard';
import BestAuthorsCard from '../components/butusic/BestAuthorsCard';
import CharacterModal from '../components/butusic/CharacterModal';
import Character3DViewer from '../components/butusic/Character3DViewer';
import LiveFeed from '../components/butusic/LiveFeed';
import ThemeSwitcher from '../components/butusic/ThemeSwitcher';

const CHARACTER_1 = "https://media.base44.com/images/public/6a0c0fa74b1d8be3ed6a3a2a/c377483d3_generated_a2efaeb7.png";
const CHARACTER_2 = "https://media.base44.com/images/public/6a0c0fa74b1d8be3ed6a3a2a/d3a4dfef4_generated_d7050909.png";

const CHARACTERS = {
  char1: {
    image: CHARACTER_1, bgColor: '#7c3aed', name: 'Neon Wanderer', artist: 'by Alexei Butusic',
    tag: 'Limited Edition', edition: '001 / 184', year: '2024', rating: 5,
    description: 'A bold urban explorer rendered in vibrant 3D, wearing a signature lime-green puffer and sky-blue beanie. This piece captures the spirit of the modern digital nomad — fearless, expressive, and always moving forward.',
    stats: [{ value: '3840px', label: 'Resolution' }, { value: '184', label: 'Editions' }, { value: '4.97★', label: 'Rating' }],
  },
  char2: {
    image: CHARACTER_2, bgColor: '#a3e635', name: 'Purple Reverie', artist: 'by Marina Solova',
    tag: 'Exhibition Pick', edition: '002 / 184', year: '2024', rating: 5,
    description: 'An introspective character in a plush purple turtleneck, bathed in contrasting olive and violet light. This piece explores the tension between calm and vibrancy — a meditation on identity in the digital age.',
    stats: [{ value: '3840px', label: 'Resolution' }, { value: '184', label: 'Editions' }, { value: '4.97★', label: 'Rating' }],
  },
};

export default function Home() {
  const { theme } = useTheme();
  const [activeModal, setActiveModal] = useState(null);
  const [show3D, setShow3D] = useState(false);
  const { containerRef, handleMouseMove, handleMouseLeave } = useParallax(4);

  return (
    <>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ background: theme.bg }}
      >
        {/* ── Top Nav Bar ── */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3"
          style={{ background: theme.bg + 'ee', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.cardBorder}` }}>
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-widest" style={{ color: theme.text }}>BUTUSIC</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: theme.primary + '22', color: theme.primary }}>Exhibition</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShow3D(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wider uppercase transition-all hover:scale-105"
              style={{ background: theme.primary, color: '#fff', boxShadow: `0 0 14px ${theme.primary}55` }}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Viewer</span>
            </button>
            <ThemeSwitcher />
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="p-3 md:p-5 flex justify-center">
          {/* DESKTOP grid */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:grid w-full max-w-[1120px]"
            style={{
              gridTemplateColumns: '195px 185px 170px 1fr 1fr 185px',
              gridTemplateRows: '155px 155px 155px 125px',
              gap: '10px',
            }}
          >
            {/* Character 1 — col 1, rows 1-2 */}
            <div data-parallax="1.5" style={{ gridColumn: '1/2', gridRow: '1/3' }} className="cursor-pointer" onClick={() => setActiveModal('char1')}>
              <CharacterCard image={CHARACTER_1} bgColor="#7c3aed" className="h-full w-full" label="Neon Wanderer" />
            </div>
            {/* More Cases — col 2, rows 1-2 */}
            <div data-parallax="0.8" style={{ gridColumn: '2/3', gridRow: '1/3' }}><MoreCasesCircle /></div>
            {/* Categories — col 3, rows 1-2 */}
            <div data-parallax="0.6" style={{ gridColumn: '3/4', gridRow: '1/3' }}><CategoriesMenu /></div>
            {/* Exclusive Badges — col 4-5, row 1 */}
            <div data-parallax="0.7" style={{ gridColumn: '4/6', gridRow: '1/2' }}><ExclusiveBadges /></div>
            {/* Exhibition Info — col 4-5, row 2 */}
            <div data-parallax="0.9" style={{ gridColumn: '4/6', gridRow: '2/3' }}><ExhibitionInfo /></div>
            {/* Character 2 — col 6, rows 1-2 */}
            <div data-parallax="1.5" style={{ gridColumn: '6/7', gridRow: '1/3' }} className="cursor-pointer" onClick={() => setActiveModal('char2')}>
              <CharacterCard image={CHARACTER_2} bgColor="#a3e635" className="h-full w-full" label="Purple Reverie" />
            </div>
            {/* Brand Title — col 1, rows 3-4 */}
            <div data-parallax="0.5" style={{ gridColumn: '1/2', gridRow: '3/5' }}><BrandTitle /></div>
            {/* Bitcoin — col 2, row 3 */}
            <div data-parallax="0.8" style={{ gridColumn: '2/3', gridRow: '3/4' }}><BitcoinCard /></div>
            {/* Awards — col 3-4, row 3 */}
            <div data-parallax="0.7" style={{ gridColumn: '3/5', gridRow: '3/4' }}><AwardsRow /></div>
            {/* Season teaser — col 5-6, row 3 */}
            <div data-parallax="1.2" style={{ gridColumn: '5/7', gridRow: '3/4' }}
              className="rounded-2xl overflow-hidden relative cursor-pointer group"
              onClick={() => setShow3D(true)}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, #4c1d95 100%)` }} />
              <img src={CHARACTER_1} alt="" className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">New Drop</span>
                <span className="text-white font-black text-lg leading-tight">Season<br />2024</span>
                <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Box className="w-3.5 h-3.5 text-white/60" />
                  <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">View in 3D</span>
                </div>
              </div>
            </div>
            {/* AppStore — col 2-3, row 4 */}
            <div data-parallax="0.6" style={{ gridColumn: '2/4', gridRow: '4/5' }}><AppStoreCard /></div>
            {/* Best Authors — col 4-6, row 4 */}
            <div data-parallax="0.7" style={{ gridColumn: '4/7', gridRow: '4/5' }}><BestAuthorsCard /></div>
          </div>

          {/* MOBILE / TABLET grid */}
          <div className="lg:hidden w-full max-w-2xl flex flex-col gap-2.5">
            {/* Characters row */}
            <div className="grid grid-cols-2 gap-2.5" style={{ height: 220 }}>
              <div className="cursor-pointer" onClick={() => setActiveModal('char1')}>
                <CharacterCard image={CHARACTER_1} bgColor="#7c3aed" className="h-full w-full" label="Neon Wanderer" />
              </div>
              <div className="cursor-pointer" onClick={() => setActiveModal('char2')}>
                <CharacterCard image={CHARACTER_2} bgColor="#a3e635" className="h-full w-full" label="Purple Reverie" />
              </div>
            </div>
            {/* Exhibition + Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div style={{ minHeight: 140 }}><ExhibitionInfo /></div>
              <div style={{ minHeight: 80 }}><ExclusiveBadges /></div>
            </div>
            {/* Menu + More */}
            <div className="grid grid-cols-2 gap-2.5" style={{ height: 200 }}>
              <CategoriesMenu />
              <MoreCasesCircle />
            </div>
            {/* Awards */}
            <div style={{ minHeight: 100 }}><AwardsRow /></div>
            {/* Bitcoin + AppStore */}
            <div className="grid grid-cols-2 gap-2.5" style={{ minHeight: 130 }}>
              <BitcoinCard />
              <AppStoreCard />
            </div>
            {/* Brand + Authors */}
            <div className="grid grid-cols-2 gap-2.5" style={{ minHeight: 130 }}>
              <BrandTitle />
              <BestAuthorsCard />
            </div>
            {/* 3D Teaser */}
            <div className="rounded-2xl overflow-hidden relative cursor-pointer" style={{ height: 120 }} onClick={() => setShow3D(true)}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, #4c1d95 100%)` }} />
              <img src={CHARACTER_1} alt="" className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <Box className="w-5 h-5 text-white/70" />
                <span className="text-white font-black text-sm tracking-widest uppercase">View in 3D</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Live Feed ── */}
        <div className="px-3 md:px-5 pb-6">
          <LiveFeed />
        </div>
      </div>

      {/* Modals */}
      {activeModal && <CharacterModal character={CHARACTERS[activeModal]} onClose={() => setActiveModal(null)} />}
      {show3D && <Character3DViewer onClose={() => setShow3D(false)} />}
    </>
  );
}
