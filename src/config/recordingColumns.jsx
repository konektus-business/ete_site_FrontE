// src/config/recordingColumns.jsx
import { Download } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { getListColor, recordingStatusLabels, recordingStatusColors } from '../utils/statusConstants';
import { checkboxClass } from '../styles/checkboxClass';
import { getInitials, getAvatarColor } from '../utils/avatar';


const formatShortDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// recordingColumns : fonction (selectedIds, onToggleSelect) -> colonnes,
// même pattern que carrierColumns(onEdit, onDelete, onClone)
export const recordingColumns = (selectedIds, onToggleSelect) => [
  {
    key: 'select',
    label: '',
    render: (row) => (
      <input
        type="checkbox"
        checked={selectedIds.includes(row.id)}
        onChange={() => onToggleSelect(row.id)}
        className={checkboxClass}
      />
    ),
  },
  { key: 'date', label: 'Date', render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{new Date(row.date).toLocaleString('fr-FR')}</span> },
  {
    key: 'agent',
    label: 'Agent',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(row.id)}`}>
          {getInitials(row.agent)}
        </div>
        <p className="font-bold text-[12px] leading-[20px] tracking-normal align-middle whitespace-nowrap">
          {row.agent}
        </p>
      </div>
    ),
  },
  { key: 'phone', label: 'Téléphone', render: (row) => <span className="text-xs font-mono text-gray-700 whitespace-nowrap">{row.phone}</span> },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => <StatusBadge status={row.status} statusLabels={recordingStatusLabels} statusColors={recordingStatusColors} />,
  },
  {
    key: 'list',
    label: 'Liste',
    render: (row) => (
      <span className={`inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 rounded-full font-bold text-[11px] leading-none ${getListColor(row.list)}`}>
        {row.list}
      </span>
    ),
  },
  { key: 'duration', label: 'Durée', render: (row) => <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{formatShortDuration(row.duration)}</span> },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <div className="flex items-center gap-2">
        <audio controls preload="none" className="h-8" style={{ width: 150 }}>
          <source src={`/mock/recordings/${row.id}.mp3`} type="audio/mpeg" />
          Votre navigateur ne supporte pas l'élément audio.
        </audio>
        <button
          onClick={() => alert(`Téléchargement (mock) de l'enregistrement #${row.id}`)}
          title="Télécharger"
          className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];