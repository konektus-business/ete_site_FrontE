import StatusBadge from '../components/common/StatusBadge';
import { userStatusLabels, userStatusColors } from '../utils/statusConstants';
import { getInitials, getAvatarColor } from '../utils/avatar';
import { Pencil, Trash2 } from 'lucide-react';
import { paysFlags } from '../utils/paysFlags';
import { getGroupColor } from '../utils/statusConstants';

// usersTable devient une fonction (onEdit, onDelete) au lieu d'un objet
// statique, pour pouvoir brancher les callbacks depuis UserList.jsx —
// même pattern que carrierColumns(onEdit, onDelete, onClone)
export const usersTable = (onEdit, onDelete) => ({
  columns: [
    {
      key: 'user',
      label: 'Login',
      render: (row) => (
        <span className="font-sans font-medium text-xs leading-4 tracking-normal align-middle text-[#111827]">
          {row.user}
        </span>
      ),
    },
    {
      key: 'full_name',
      label: 'Nom complet',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(row.id)}`}>
            {getInitials(row.full_name)}
          </div>
          <p className="font-bold text-[12px] leading-[20px] tracking-normal align-middle">
            {row.full_name}
          </p>
        </div>
      ),
    },
    {
      key: 'user_group',
      label: 'Groupe',
      render: (row) => (
        <span className={`inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 rounded-full font-bold text-[11px] leading-none ${getGroupColor(row.user_group)}`}>
          {row.user_group}
        </span>
      ),
    },
    {
      key: 'phone_login',
      label: 'Login téléphone',
      render: (row) => (
        <span className="font-sans font-normal text-xs leading-4 tracking-normal align-middle text-gray-700">
          {row.phone_login}
        </span>
      ),
    },
    {
      key: 'active',
      label: 'Actif',
      render: (row) => (
        <StatusBadge
          status={row.active === 'Y' ? 'actif' : 'inactif'}
          statusLabels={userStatusLabels}
          statusColors={userStatusColors}
        />
      ),
    },
    {
      key: 'last_login',
      label: 'Dernière connexion',
      render: (row) => (
        <span className="font-sans font-normal text-[11px] leading-none tracking-normal align-middle text-gray-500">
          {row.last_login}
        </span>
      ),
    },
    {
      key: 'ip',
      label: 'Dernière IP',
      render: (row) => (
        <span className="font-sans font-normal text-[11px] leading-none tracking-normal align-middle text-gray-500">
          {row.ip}
        </span>
      ),
    },
{
  key: 'country',
  label: 'Pays',
  render: (row) => {
    const flagCode = paysFlags[row.country];
    return (
      <div className="flex items-center gap-2">
        {flagCode && <span className={`rounded-[4px] fi fi-${flagCode}`}></span>}
        <span className="font-sans font-normal text-xs leading-4 tracking-normal align-middle text-gray-700">
          {row.country}
        </span>
      </div>
    );
  },
},
    {
      key: 'actions',
      label: 'Actions',
      render: (row) =>
        row.user === '6666' ? (
          <span className="text-gray-400 text-xs">(protégé)</span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(row); }}
              title="Éditer"
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-700 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
              title="Désactiver"
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ),
    },
  ],
});