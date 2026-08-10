// src/components/common/CalendarPopover.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const toDateStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const isSameDay = (a, b) => !!a && !!b && toDateStr(a) === toDateStr(b);

// Construit une grille de 42 cases (6 semaines) en commençant un dimanche,
// pour toujours afficher un calendrier complet même en début/fin de mois.
const buildGrid = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay(); // 0 = dimanche
  const gridStart = new Date(year, month, 1 - startOffset);

  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
};

// value / onChange : la date affichée en pastille pleine + son setter
// rangeStart / rangeEnd (optionnels) : bornes d'une plage à surligner en fond clair
// (ex: PeriodFilter les passe pour montrer visuellement la période sélectionnée)
export default function CalendarPopover({ value, onChange, rangeStart, rangeEnd }) {
  const initial = value ? new Date(`${value}T00:00:00`) : new Date();
  const [viewDate, setViewDate] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const rangeStartDate = rangeStart ? new Date(`${rangeStart}T00:00:00`) : null;
  const rangeEndDate = rangeEnd ? new Date(`${rangeEnd}T00:00:00`) : null;
  const today = new Date();

  const days = buildGrid(viewDate);

  const goPrevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const inRange = (d) => {
    if (!rangeStartDate || !rangeEndDate) return false;
    return d >= rangeStartDate && d <= rangeEndDate;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 w-72 select-none">
      {/* En-tête mois/année + navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[15px] font-semibold text-gray-900">
          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrevMonth}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center text-[11px] font-medium text-gray-300"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const isCurrentMonth = d.getMonth() === viewDate.getMonth();
          const isSelected = isSameDay(d, selectedDate);
          const isToday = isSameDay(d, today);
          const inRangeDay = isCurrentMonth && inRange(d);
          const isRangeStartEdge = inRangeDay && isSameDay(d, rangeStartDate);
          const isRangeEndEdge = inRangeDay && isSameDay(d, rangeEndDate);

          return (
            <div
              key={i}
              className={[
                'h-9 flex items-center justify-center',
                inRangeDay ? 'bg-emerald-50' : '',
                isRangeStartEdge ? 'rounded-l-full' : '',
                isRangeEndEdge ? 'rounded-r-full' : '',
              ].join(' ')}
            >
              <button
                type="button"
                disabled={!isCurrentMonth}
                onClick={() => isCurrentMonth && onChange(toDateStr(d))}
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors',
                  !isCurrentMonth ? 'text-gray-300 pointer-events-none' : 'cursor-pointer',
                  isSelected ? 'bg-[#1EB394] text-white font-semibold' : '',
                  !isSelected && isCurrentMonth ? 'text-gray-700 hover:bg-gray-100' : '',
                  isToday && !isSelected ? 'ring-1 ring-[#1EB394] ring-inset' : '',
                ].join(' ')}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}