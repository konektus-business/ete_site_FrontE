// src/components/common/CalendarIcon.jsx
import { CalendarDays } from 'lucide-react';

// Badge icône "agenda" — carré arrondi, fond plein couleur CRM, icône blanche.
// Utilisable en en-tête de section, dans un bouton, ou à côté d'un titre.
export default function CalendarIcon({ size = 'md', className = '' }) {
  const sizes = {
    sm: { box: 'w-7 h-7 rounded-lg', icon: 'w-4 h-4' },
    md: { box: 'w-9 h-9 rounded-xl', icon: 'w-5 h-5' },
    lg: { box: 'w-11 h-11 rounded-xl', icon: 'w-6 h-6' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`${s.box} bg-[#1EB394] flex items-center justify-center shrink-0 ${className}`}
    >
      <CalendarDays className={`${s.icon} text-white`} strokeWidth={2.25} />
    </div>
  );
}