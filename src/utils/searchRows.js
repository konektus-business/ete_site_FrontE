// src/utils/searchRows.js
// Aplati les resultats de searchGlobal (4 categories separees) en une seule
// liste de lignes homogenes, pour affichage dans un unique Table.jsx avec
// une colonne "Type".
export function buildSearchRows(results) {
  if (!results) return [];

  const rows = [];

  (results.agents || []).forEach((a) => {
    rows.push({
      id: `agent-${a.id}`,
      type: 'Agent',
      label: a.full_name,
      meta: [a.user_group, a.phone_login].filter(Boolean).join(' • '),
    });
  });

  (results.groupes || []).forEach((g) => {
    rows.push({
      id: `groupe-${g.group_name}`,
      type: 'Groupe',
      label: g.group_name,
      meta: '',
    });
  });

  (results.campagnes || []).forEach((c) => {
    rows.push({
      id: `campagne-${c.campaign_id}`,
      type: 'Campagne',
      label: c.campaign_name,
      meta: c.dial_method,
    });
  });

  (results.appels || []).forEach((c) => {
    rows.push({
      id: `appel-${c.id}`,
      type: 'Appel',
      label: c.phone_number,
      meta: [c.destination, c.type].filter(Boolean).join(' • '),
    });
  });

  return rows;
}

// Couleurs de badge par type, cohérentes avec le reste du CRM (fond clair + texte fonce)
export const searchTypeColors = {
  Agent: 'bg-blue-50 text-blue-700',
  Groupe: 'bg-purple-50 text-purple-700',
  Campagne: 'bg-amber-50 text-amber-700',
  Appel: 'bg-emerald-50 text-emerald-700',
};