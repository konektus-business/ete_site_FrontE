// Options de période réutilisées par toutes les pages de rapports/stats
// (Agents, Inbound, Outbound, RH, Statuts). Centralisé ici pour éviter
// de recopier le même tableau dans 5 fichiers différents.
export const periodOptions = [
  { value: 'today', label: "Aujourd'hui" },
  { value: 'yesterday', label: 'Hier' },
  { value: 'week', label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'custom', label: 'Personnalisée' },
];