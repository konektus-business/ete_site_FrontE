import StatusBadge from '../components/common/StatusBadge';
import { protocolColors } from '../utils/protocolConstants';
import { getInitials, getAvatarColor } from '../utils/avatar';
import { getCarrierLogo } from '../utils/carrierLogos';
import { Wifi, WifiOff, Pencil, Trash2, Copy } from 'lucide-react';

export const carrierColumns = (onEdit, onDelete, onClone) => [
  {
    key: 'carrier_id',
    label: 'ID',
    render: (row) => <span className="text-xs font-mono text-gray-700">{row.carrier_id}</span>,
  },
{
  key: 'carrier_name',
  label: 'Nom',
  render: (row) => {
    const logo = getCarrierLogo(row.carrier_name);
    return logo ? (
      <div className="w-20 flex items-center justify-start">
        <img
          src={logo}
          alt={row.carrier_name}
          title={row.carrier_name}
          className="h-6 w-auto object-contain object-left"
        />
      </div>
    ) : (
      <span className="text-xs font-medium text-gray-900">{row.carrier_name}</span>
    );
  },
},
  {
    key: 'protocol',
    label: 'Protocole',
    render: (row) => <StatusBadge status={row.protocol} statusColors={protocolColors} />,
  },
  {
    key: 'server_ip',
    label: 'Serveur',
    render: (row) => <span className="text-xs text-gray-500">{row.server_ip || '-'}</span>,
  },
  {
    key: 'active',
    label: 'État',
    render: (row) =>
      row.active === 'Y' ? (
        <Wifi className="w-4 h-4 text-emerald-600" />
      ) : (
        <WifiOff className="w-4 h-4 text-red-500" />
      ),
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
        <button
          onClick={() => onClone?.(row)}
          title="Cloner"
          className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];