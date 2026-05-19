import React, { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Heart, MessageCircle, Share2, Repeat2 } from 'lucide-react';

const MOCK_POSTS = [
  {
    id: 1, user: '@artlover_mx', handle: 'Maria X', avatar: 'MX', color: '#7c3aed',
    text: 'Just dropped into the #ButusicExhibition preview — these 3D characters are insane! 🔥',
    time: '2m ago', likes: 241, comments: 18, image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&q=80',
    tall: false,
  },
  {
    id: 2, user: '@designwave', handle: 'Design Wave', avatar: 'DW', color: '#06b6d4',
    text: 'The bento grid layout at #ButusicExhibition is 🤌 pure digital craft.',
    time: '5m ago', likes: 87, comments: 6, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    tall: true,
  },
  {
    id: 3, user: '@nft_collector', handle: 'NFT Pro', avatar: 'NP', color: '#f59e0b',
    text: 'Neon Wanderer is everything. Already bidding. #ButusicExhibition #3DArt',
    time: '9m ago', likes: 512, comments: 34, image: null,
    tall: false,
  },
  {
    id: 4, user: '@pxlhunter', handle: 'Pixel Hunter', avatar: 'PH', color: '#10b981',
    text: 'The lighting on these renders at #ButusicExhibition deserves its own award.',
    time: '14m ago', likes: 193, comments: 11, image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&q=80',
    tall: true,
  },
  {
    id: 5, user: '@ui.bytes', handle: 'UI Bytes', avatar: 'UB', color: '#ec4899',
    text: 'Grid so clean it hurts. #ButusicExhibition 👾',
    time: '21m ago', likes: 66, comments: 5, image: null,
    tall: false,
  },
  {
    id: 6, user: '@studiofreq', handle: 'Studio Freq', avatar: 'SF', color: '#8b5cf6',
    text: 'Purple Reverie hits different IRL. Had to see it twice. #ButusicExhibition',
    time: '28m ago', likes: 308, comments: 22, image: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=400&q=80',
    tall: false,
  },
];

function FeedCard({ post, theme }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}`, breakInside: 'avoid', marginBottom: 10 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0" style={{ background: post.color }}>
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold truncate" style={{ color: theme.text }}>{post.handle}</p>
          <p className="text-[10px]" style={{ color: theme.textMuted }}>{post.user} · {post.time}</p>
        </div>
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: theme.primary + '22' }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="3.5" stroke={theme.primary} strokeWidth="1.2" fill="none"/>
            <path d="M3 2.5L5.5 4L3 5.5V2.5Z" fill={theme.primary}/>
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="text-[12px] leading-relaxed" style={{ color: theme.text + 'cc' }}>
        {post.text.split(/(#\w+)/g).map((part, i) =>
          part.startsWith('#')
            ? <span key={i} style={{ color: theme.primary }} className="font-bold">{part}</span>
            : part
        )}
      </p>

      {/* Image */}
      {post.image && (
        <div className="rounded-xl overflow-hidden" style={{ aspectRatio: post.tall ? '4/5' : '16/9' }}>
          <img src={post.image} alt="post" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-1" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-1.5 transition-all"
          style={{ color: liked ? '#ef4444' : theme.textMuted }}
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500' : ''}`} />
          <span className="text-[10px] font-semibold">{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <button className="flex items-center gap-1.5" style={{ color: theme.textMuted }}>
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-semibold">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 ml-auto" style={{ color: theme.textMuted }}>
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function LiveFeed({ theme: propTheme }) {
  const { theme: ctxTheme } = useTheme();
  const theme = propTheme || ctxTheme;
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPing, setNewPing] = useState(false);

  // Simulate new posts arriving
  useEffect(() => {
    const id = setInterval(() => {
      setNewPing(true);
      setTimeout(() => setNewPing(false), 2000);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const col1 = posts.filter((_, i) => i % 3 === 0);
  const col2 = posts.filter((_, i) => i % 3 === 1);
  const col3 = posts.filter((_, i) => i % 3 === 2);

  return (
    <section className="w-full max-w-[1120px] mx-auto mt-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black tracking-tight" style={{ color: theme.text }}>Exhibition Live Feed</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: theme.primary + '20', border: `1px solid ${theme.primary}44` }}>
            <div className={`w-1.5 h-1.5 rounded-full ${newPing ? 'animate-ping' : 'animate-pulse'}`} style={{ background: theme.primary }} />
            <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: theme.primary }}>Live</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: theme.accent + '20', color: theme.accent }}>
            #ButusicExhibition
          </span>
          <span className="text-[11px]" style={{ color: theme.textMuted }}>{posts.length} posts</span>
        </div>
      </div>

      {/* Masonry grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <div>{col1.map(p => <FeedCard key={p.id} post={p} theme={theme} />)}</div>
        <div>{col2.map(p => <FeedCard key={p.id} post={p} theme={theme} />)}</div>
        <div className="hidden lg:block">{col3.map(p => <FeedCard key={p.id} post={p} theme={theme} />)}</div>
      </div>
    </section>
  );
}
