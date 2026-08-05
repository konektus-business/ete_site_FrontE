import { Eye, List, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { userStatusLabels, userStatusColors } from '../utils/statusConstants';

// campaignColumns : fonction (onView, onLists, onEdit, onDelete) -> colonnes,
// même pattern que carrierColumns(onEdit, onDelete, onClone)
export const campaignColumns = (onView, onLists, onEdit, onDelete) => [
  { key: 'campaign_id', label: 'ID', render: (row) => <span className="text-xs font-mono text-gray-700 whitespace-nowrap">{row.campaign_id}</span> },
  { key: 'campaign_name', label: 'Nom', render: (row) => <span className="text-xs font-bold text-gray-900 whitespace-nowrap">{row.campaign_name}</span> },
  { key: 'dial_method', label: 'Méthode de dial', render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{row.dial_method || '-'}</span> },
  { key: 'campaign_script', label: 'Script', render: (row) => <span className="text-xs text-gray-500 whitespace-nowrap">{row.campaign_script || '-'}</span> },
  {
    key: 'active',
    label: 'Actif',
    render: (row) => <StatusBadge status={row.active === 'Y' ? 'actif' : 'inactif'} statusLabels={userStatusLabels} statusColors={userStatusColors} />,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => onView(row)} title="Détails" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors">
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onLists(row)} title="Listes" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <List className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onEdit(row)} title="Éditer" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => onDelete(row)} title="Supprimer" className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];