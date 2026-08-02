import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { booleanLabels, booleanColors } from '../utils/statusConstants';

const boolCell = (value) => <StatusBadge status={value} statusLabels={booleanLabels} statusColors={booleanColors} />;

export const campaignStatusColumns = (onEdit, onDelete) => [
  { key: 'status', label: 'Code', render: (row) => <span className="text-xs font-mono font-bold text-gray-900 whitespace-nowrap">{row.status}</span> },
  { key: 'status_name', label: 'Nom', render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{row.status_name}</span> },
  { key: 'selectable', label: 'Sélect.', render: (row) => boolCell(row.selectable) },
  { key: 'human_answered', label: 'Humain', render: (row) => boolCell(row.human_answered) },
  { key: 'category', label: 'Catégorie', render: (row) => <span className="text-xs text-gray-500 whitespace-nowrap">{row.category}</span> },
  { key: 'sale', label: 'Vente', render: (row) => boolCell(row.sale) },
  { key: 'dnc', label: 'DNC', render: (row) => boolCell(row.dnc) },
  { key: 'customer_contact', label: 'Contact', render: (row) => boolCell(row.customer_contact) },
  { key: 'not_interested', label: 'Non int.', render: (row) => boolCell(row.not_interested) },
  { key: 'unworkable', label: 'Non travaill.', render: (row) => boolCell(row.unworkable) },
  { key: 'scheduled_callback', label: 'Rappel', render: (row) => boolCell(row.scheduled_callback) },
  { key: 'completed', label: 'Complété', render: (row) => boolCell(row.completed) },
  { key: 'min_sec', label: 'Min sec', render: (row) => <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{row.min_sec}</span> },
  { key: 'max_sec', label: 'Max sec', render: (row) => <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{row.max_sec}</span> },
  { key: 'answering_machine', label: 'Répondeur', render: (row) => boolCell(row.answering_machine) },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(row)} title="Modifier" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(row)} title="Supprimer" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];