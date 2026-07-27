import { hhmmToTimeInput } from '../utils/timeFormat';
import { Pencil, Trash2 } from 'lucide-react';

// onEdit/onDelete sont des callbacks fournis par le composant parent (HorairesList),
// permet à Table.jsx de rester générique sans connaître la logique métier
export const scheduleColumns = (onEdit, onDelete) => [
  {
    key: 'call_time_id',
    label: 'ID',
    render: (row) => <span className="text-xs font-mono text-gray-700">{row.call_time_id}</span>,
  },
  {
    key: 'call_time_name',
    label: 'Nom',
    render: (row) => <span className="text-xs font-medium text-gray-900">{row.call_time_name}</span>,
  },
  {
    key: 'call_time_comments',
    label: 'Commentaires',
    render: (row) => <span className="text-xs text-gray-500">{row.call_time_comments || '-'}</span>,
  },
  {
    key: 'ct_default_start',
    label: 'Début par défaut',
    // affichage lisible HH:MM même si la donnée stockée est en HHMM (900)
    render: (row) => <span className="text-xs text-gray-700">{hhmmToTimeInput(row.ct_default_start)}</span>,
  },
  {
    key: 'ct_default_stop',
    label: 'Fin par défaut',
    render: (row) => <span className="text-xs text-gray-700">{hhmmToTimeInput(row.ct_default_stop)}</span>,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit?.(row)}
          title="Éditer"
          className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete?.(row)}
          title="Supprimer"
          className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];