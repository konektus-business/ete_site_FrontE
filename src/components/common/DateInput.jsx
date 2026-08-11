// src/components/common/DateInput.jsx
import { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import CalendarPopover from './CalendarPopover';
import { filterInputClass as inputClass } from '../../styles/formClasses';

const formatDisplay = (value) => {
  if (!value) return '';
  const [y, m, d] = value.split('-');
  return `${d}/${m}/${y}`;
};

// Remplace un <input type="date"> natif : affiche jj/mm/aaaa, ouvre un
// calendrier custom (CalendarPopover) au clic, se ferme au clic exterieur.
export default function DateInput({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  placeholder = 'jj/mm/aaaa',
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (dateStr) => {
    onChange({ target: { value: dateStr } });
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center justify-between cursor-pointer text-left`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2">
          <CalendarPopover
            value={value}
            onChange={handleSelect}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        </div>
      )}
    </div>
  );
}