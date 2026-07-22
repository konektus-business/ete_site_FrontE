import { getInitials, getAvatarColor } from '../utils/avatar';
export const agentsStatsColumns = [
{
  key: 'agent',
  label: 'Agent',
  render: (row) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(row.id)}`}>
        {getInitials(row.agent)}
      </div>
      <p className="font-bold text-[12px] leading-[20px] tracking-normal align-middle">
        {row.agent}
      </p>
    </div>
  ),
},
  {
    key: 'login',
    label: 'Login',
    render: (row) => <span className="text-xs text-gray-700">{row.login}</span>,
  },
  {
    key: 'appels',
    label: 'Appels',
    render: (row) => <span className="text-xs text-gray-700">{row.appels}</span>,
  },
  {
    key: 'fiches',
    label: 'Fiches',
    render: (row) => <span className="text-xs text-gray-700">{row.fiches}</span>,
  },
  {
    key: 'dureeTotale',
    label: 'Durée totale',
    render: (row) => <span className="text-xs text-gray-500">{row.dureeTotale}</span>,
  },
  {
    key: 'dureeMoyenne',
    label: 'Durée moyenne',
    render: (row) => <span className="text-xs text-gray-500">{row.dureeMoyenne}</span>,
  },
  {
    key: 'ventes',
    label: 'Ventes',
    render: (row) => <span className="text-xs font-medium text-emerald-700">{row.ventes}</span>,
  },
  {
    key: 'tauxConversion',
    label: 'Taux conversion',
    render: (row) => (
      <span className="text-xs font-medium text-gray-900">{row.tauxConversion}%</span>
    ),
  },
];

export const rhStatsColumns = [
  { key: 'agent', label: 'Agent', render: (row) => <span className="text-xs font-medium text-gray-900">{row.agent}</span> },
  { key: 'login', label: "Nom d'utilisateur", render: (row) => <span className="text-xs text-gray-700">{row.login}</span> },
  { key: 'premiereConnexion', label: '1ère connexion', render: (row) => <span className="text-xs text-gray-500">{row.premiereConnexion}</span> },
  { key: 'derniereDeconnexion', label: 'Dernière déconnexion', render: (row) => <span className="text-xs text-gray-500">{row.derniereDeconnexion}</span> },
  { key: 'debrief', label: 'Debrief', render: (row) => <span className="text-xs text-gray-500">{row.debrief}</span> },
  { key: 'pauses', label: 'Pauses', render: (row) => <span className="text-xs text-gray-500">{row.pauses}</span> },
  { key: 'pausesProductives', label: 'Pauses productives', render: (row) => <span className="text-xs text-emerald-700">{row.pausesProductives}</span> },
  { key: 'pausesNonProductives', label: 'Pauses non productives', render: (row) => <span className="text-xs text-amber-600">{row.pausesNonProductives}</span> },
  { key: 'menu', label: 'Menu', render: (row) => <span className="text-xs text-gray-500">{row.menu}</span> },
  { key: 'production', label: 'Production', render: (row) => <span className="text-xs font-medium text-gray-900">{row.production}</span> },
  { key: 'presence', label: 'Présence', render: (row) => <span className="text-xs text-gray-500">{row.presence}</span> },
  { key: 'dureeComm', label: 'Durée de communication', render: (row) => <span className="text-xs text-gray-500">{row.dureeComm}</span> },
];

export const globalStatusColumns = (onDetail) => [
  { key: 'qualification', label: 'Qualification', render: (row) => <span className="text-xs font-medium text-gray-900">{row.qualification}</span> },
  { key: 'code', label: 'Code', render: (row) => <span className="text-xs text-gray-500 font-mono">{row.code}</span> },
  { key: 'nombre', label: 'Nombre', render: (row) => <span className="text-xs text-gray-700">{row.nombre}</span> },
  { key: 'pourcentage', label: 'Pourcentage', render: (row) => <span className="text-xs font-medium text-emerald-700">{row.pourcentage}%</span> },
  {
    key: 'details',
    label: 'Détails',
    render: (row) => (
      <button
        onClick={(e) => { e.stopPropagation(); onDetail?.(row); }}
        className="text-xs text-emerald-700 hover:underline"
      >
        Voir
      </button>
    ),
  },
];

export const agentSummaryColumns = (onSelectAgent) => [
  { key: 'agent', label: 'Agent', render: (row) => <span className="text-xs font-medium text-gray-900">{row.agent}</span> },
  { key: 'totalOccurrences', label: 'Total occurrences', render: (row) => <span className="text-xs text-gray-700">{row.totalOccurrences}</span> },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <button
        onClick={(e) => { e.stopPropagation(); onSelectAgent?.(row); }}
        className="text-xs text-emerald-700 hover:underline"
      >
        Voir détail
      </button>
    ),
  },
];

export const agentDetailColumns = [
  { key: 'code', label: 'Code', render: (row) => <span className="text-xs text-gray-500 font-mono">{row.code}</span> },
  { key: 'codeStatut', label: 'Code statut', render: (row) => <span className="text-xs font-medium text-gray-900">{row.codeStatut}</span> },
  { key: 'nombre', label: 'Nombre', render: (row) => <span className="text-xs text-gray-700">{row.nombre}</span> },
  { key: 'pourcentage', label: 'Pourcentage (agent)', render: (row) => <span className="text-xs font-medium text-emerald-700">{row.pourcentage}%</span> },
];