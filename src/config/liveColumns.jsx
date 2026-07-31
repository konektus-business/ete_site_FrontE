// src/config/liveColumns.jsx
import { Play, MessageCircle, Ban, LogOut } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { getInitials, getAvatarColor } from '../utils/avatar';
import { getCampaignColor, liveAgentStatusLabels, liveAgentStatusColors } from '../utils/statusConstants';
import { formatDuration } from '../utils/timeFormat';

const getCurrentCallDuration = (agent) => {
  if (agent.status !== 'INCALL' || !agent.last_state_change) return '-';
  const diff = Math.floor(Date.now() / 1000) - Math.floor(new Date(agent.last_state_change).getTime() / 1000);
  return formatDuration(diff);
};

export const agentColumns = [
  {
    key: 'agent',
    label: 'Agent',
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(row.id)}`}>
          {getInitials(row.full_name)}
        </div>
        <p className="font-bold text-[12px] leading-[20px] tracking-normal align-middle whitespace-nowrap">
          {row.full_name}
        </p>
      </div>
    ),
  },
  {
    key: 'campaign_name',
    label: 'Campagne',
    // getGroupColor : même fonction déjà utilisée pour les groupes utilisateurs,
    // couleur déterministe par nom (pas un objet séparé bg/text à maintenir)
    render: (row) => (
       <span className={`inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 rounded-full font-bold text-[11px] leading-none ${getCampaignColor(row.campaign_name)}`}>
        {row.campaign_name}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => (
      <StatusBadge status={row.status} statusLabels={liveAgentStatusLabels} statusColors={liveAgentStatusColors} />
    ),
  },
  { key: 'phone_number', label: 'Lead', render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{row.phone_number || '-'}</span> },
  { key: 'list_name', label: 'Liste', render: (row) => <span className="text-xs text-black-700 whitespace-nowrap">{row.list_name || '-'}</span> },
  { key: 'agent_ip', label: 'IP Agent', render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{row.agent_ip}</span> },
  { key: 'current_call', label: 'Durée', render: (row) => <span className="text-xs text-green-500 whitespace-nowrap">{getCurrentCallDuration(row)}</span> },
  { key: 'leads', label: 'Fiches/jour', render: (row) => <span className="text-xs text-black-700 whitespace-nowrap">{row.stats.leads}</span> },
  { key: 'pos', label: 'Positifs/jour', render: (row) => <span className="text-xs text-green-700 whitespace-nowrap">{row.stats.pos}</span> },
  { key: 'pause_seconds', label: 'Pause totale', render: (row) => <span className="text-xs text-red-500 whitespace-nowrap">{formatDuration(row.stats.pause_seconds)}</span> },
  { key: 'total_seconds', label: 'Durée totale', render: (row) => <span className="text-xs text-green-700 whitespace-nowrap">{formatDuration(row.stats.total_seconds)}</span> },
  {
    key: 'avg_duration',
    label: 'Durée moyenne',
    render: (row) => {
      const avg = row.stats.leads ? Math.round(row.stats.total_seconds / row.stats.leads) : 0;
      return <span className="text-xs text-orange-500 whitespace-nowrap">{formatDuration(avg)}</span>;
    },
  },
  {
    key: 'actions',
    label: 'Actions',
    render: () => (
      <div className="flex items-center gap-1.5">
        <button onClick={() => alert('Écoute non implémentée')} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Écouter">
          <Play className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => alert('Chuchotement non implémenté')} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Chuchotement">
          <MessageCircle className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => alert("Couper l'appel non implémenté")} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Couper l'appel">
          <Ban className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => alert('Déconnexion non implémentée')} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors" title="Déconnecter">
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];