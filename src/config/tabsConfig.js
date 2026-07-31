export const tabsConfig = {
  users: [
    { key: 'list', label: 'Liste des utilisateurs' },
    { key: 'addAgent', label: 'Ajouter un agent' },
    { key: 'addSupUser', label: 'Ajouter Sup utilisateur' },
    { key: 'groups', label: 'Groupes' },
  ],

  stats: [
  { key: 'agents', label: 'Rapports agents' },
  { key: 'inbound', label: 'Appels entrants' },
  { key: 'outbound', label: 'Appels sortants' },
  { key: 'rh', label: 'Rapports RH' },
  { key: 'status', label: 'Rapports de statuts' },
  ],

  operateur: [
  { key: 'liste', label: 'Liste carriers' },
  { key: 'ajouter', label: 'Ajouter un carrier' },
  { key: 'sip', label: 'État SIP' },
  { key: 'horaires', label: 'Horaires' },
  ],

panneauLive: [
  { key: 'overview', label: "Vue d'ensemble" },
  { key: 'calls', label: 'Appels' },
],

enregistrement: [
  { key: 'list', label: 'Liste des enregistrements' },
  { key: 'settings', label: 'Paramètres' },
],

CDR: [
  { key: 'list', label: 'Détails des appels' },
  { key: 'config', label: 'Configuration des coûts' },
],
VTM: [
  { key: 'chat', label: 'Chat' },
  { key: 'mail', label: 'Mail' },
  { key: 'meet', label: 'Meet' },
],

integration: [
  { key: 'messenger', label: 'Messenger' },
  { key: 'telegram', label: 'Telegram' },
  { key: 'whatsapp', label: 'Whatsapp' },
],

VOIP: [
  { key: 'console', label: 'console' },
  { key: 'iptables', label: 'IpTables' },
  { key: 'munin', label: 'Munin' },
  { key: 'sip', label: 'SIP' },
],
  // Ajout au fur et à mesure : compagnes, leads, etc.
};