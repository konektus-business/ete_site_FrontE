import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { userStatusLabels, userStatusColors } from '../utils/statusConstants';

export const leadListColumns = (onEdit, onDelete) => [
  { key: 'list_id', label: 'ID', render: (r) => <span className="text-xs font-mono text-gray-700">{r.list_id}</span> },
  { key: 'list_name', label: 'Nom', render: (r) => <span className="text-xs font-bold text-gray-900 whitespace-nowrap">{r.list_name}</span> },
  { key: 'campaign_name', label: 'Campagne', render: (r) => <span className="text-xs text-gray-700 whitespace-nowrap">{r.campaign_name}</span> },
  { key: 'leads_count', label: 'Nombre de leads', render: (r) => <span className="text-sm font-bold text-gray-900">{r.leads_count}</span> },
  { key: 'active', label: 'Actif', render: (r) => <StatusBadge status={r.active === 'Y' ? 'actif' : 'inactif'} statusLabels={userStatusLabels} statusColors={userStatusColors} /> },
  {
    key: 'actions', label: 'Actions',
    render: (r) => (
      <div className="flex items-center gap-2">
        <button onClick={() => onEdit(r)} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700"><Pencil className="w-3.5 h-3.5" /></button>
        <button onClick={() => onDelete(r)} className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
      </div>
    ),
  },
];