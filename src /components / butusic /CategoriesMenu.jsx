import React from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Grid2X2, CreditCard, Users, Gavel, TrendingUp, Star, Phone } from 'lucide-react';

const menuItems = [
  { icon: Grid2X2, label: 'CATEGORIES' },
  { icon: CreditCard, label: 'PAYMENT' },
  { icon: Users, label: 'AUTHORS' },
  { icon: Gavel, label: 'AUCTION', active: true },
  { icon: TrendingUp, label: 'SALES' },
  { icon: Star, label: 'REVIEWS' },
  { icon: Phone, label: 'CONTACTS' },
];

export default function CategoriesMenu() {
  const { theme } = useTheme();
  return (
    <div className="rounded-2xl p-3 flex flex-col justify-center h-full transition-colors duration-500"
      style={{ background: theme.card, border: `1px solid ${theme.cardBorder}` }}>
      <div className="space-y-0.5">
        {menuItems.map((item, i) => (
          <div key={i}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: item.active ? theme.navActive : 'transparent',
              border: item.active ? `1px solid ${theme.navActiveBorder}` : '1px solid transparent',
            }}>
            <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.active ? theme.primary : theme.textMuted }} />
            <span className="text-[10px] font-bold tracking-[0.1em]" style={{ color: item.active ? theme.text : theme.text + 'aa' }}>{item.label}</span>
            {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: theme.primary }} />}
          </div>
        ))}
      </div>
    </div>
  );
}
