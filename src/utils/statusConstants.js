export const statusLabels = {
  prospect: "Prospect",
  client_actif: "Client Actif",
  suspendu: "Suspendu",
  resilie: "Résilié"
};

export const statusColors = {
  prospect: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
  client_actif: "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
  suspendu: "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]",
  resilie: "bg-red-50 text-red-800 border border-red-100"
};

export const ticketStatusLabels = {
  ouvert: "Ouvert",
  en_cours: "En cours",
  resolu: "Résolu",
  ferme: "Fermé"
};

export const ticketStatusColors = {
  ouvert: "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]",
  en_cours: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
  resolu: "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
  ferme: "bg-red-50 text-red-800 border border-red-100"
};

export const priorityLabels = {
  basse: "Basse",
  moyenne: "Moyenne",
  haute: "Haute",
  critique: "Critique"
};

export const priorityColors = {
  basse: "bg-gray-100 text-gray-700 border border-gray-200",
  moyenne: "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]",
  haute: "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]",
  critique: "bg-red-50 text-red-800 border border-red-100"
};

export const userStatusLabels = {
  actif: "Actif",
  inactif: "Inactif",
};

export const userStatusColors = {
  actif: "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
  inactif: "bg-red-50 text-red-800 border border-red-100",
};

// 1. Couleurs attribuées spécifiquement à chaque rôle
export const knownGroupColors = {
  admin: "bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]",       // Vert (Emerald)
  agent: "bg-[#FDF2F8] text-[#DB2777] border border-[#FCE7F3]",       // Rose
  superviseur: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]", // Bleu
  supervisor: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",  // Support anglais au cas où
};

// 2. Couleurs génériques de secours (pour de futurs nouveaux groupes)
export const genericGroupColors = [
  "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]", // Ambre / Orange
  "bg-[#FAFAF9] text-[#57534E] border border-[#E7E5E4]", // Gris chaud
  "bg-[#F5F3FF] text-[#7C3AED] border border-[#EDE9FE]", // Violet
  "bg-[#FDF2F8] text-[#DB2777] border border-[#FCE7F3]", // Rose
  "bg-[#ECFEFF] text-[#0891B2] border border-[#CFFAFE]", // Cyan
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 997; // 997 = nombre premier pour une bonne dispersion
  }
  return hash;
}
export function getGroupColor(group) {
  if (!group) return "bg-gray-100 text-gray-700 border border-gray-200";

  // Normalisation : minuscules et retrait des espaces inutiles
  let normalized = group.trim().toLowerCase();

  // Gestion du pluriel : supprime le 's' final (ex: "Superviseurs" -> "superviseur")
  if (normalized.endsWith('s')) {
    normalized = normalized.slice(0, -1);
  }

  // Retourne la couleur dédiée si elle existe
  if (knownGroupColors[normalized]) {
    return knownGroupColors[normalized];
  }

  // Fallback sur le tableau générique si le groupe n'est pas répertorié
  const index = Math.abs(hashString(normalized)) % genericGroupColors.length;
  return genericGroupColors[index];
}

export const knownListColors = {
  "Liste VIP 2026": "bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]",   // Vert
  "Liste SAV France": "bg-[#FDF2F8] text-[#DB2777] border border-[#FCE7F3]", // Rose
  "Liste Relance Q3": "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]", // Orange
  "Liste Standard": "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",   // Bleu
};

export function getListColor(listName) {
  if (!listName || listName === '-') return "bg-gray-100 text-gray-700 border border-gray-200";
  if (knownListColors[listName]) return knownListColors[listName];
  // Liste pas encore listée -> couleur générée automatiquement
  const index = hashString(listName) % genericGroupColors.length;
  return genericGroupColors[index];
}

// --- État SIP peers (Opérateurs) ---
export const getStatusColorClass = (row) => {
  if (row.status !== 'OK') return 'text-red-600';
  if (row.latency == null) return 'text-emerald-600';
  if (row.latency < 20) return 'text-emerald-600';
  if (row.latency < 100) return 'text-amber-600';
  return 'text-red-600';
};

// --- Statut PanneauLive ---
export const liveAgentStatusLabels = {
  READY: 'READY',
  INCALL: 'INCALL',
  PAUSED: 'PAUSED',
  DEAD: 'DEAD',
};

export const liveAgentStatusColors = {
  READY: 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]',
  INCALL: 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]',
  PAUSED: 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]',
  DEAD: 'bg-red-50 text-red-800 border border-red-100',
};

export const knownCampaignColors = {
  "Campagne VIP": "bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7]",       // Vert
  "Campagne Standard": "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",  // Bleu
  "Campagne Relance": "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]",   // Orange
  "Campagne SAV": "bg-[#FDF2F8] text-[#DB2777] border border-[#FCE7F3]",       // Rose
};

export function getCampaignColor(campaignName) {
  if (!campaignName) return "bg-gray-100 text-gray-700 border border-gray-200";
  if (knownCampaignColors[campaignName]) return knownCampaignColors[campaignName];
  // Campagne pas encore listée -> couleur générée automatiquement (même hash que getGroupColor)
  const index = hashString(campaignName) % genericGroupColors.length;
  return genericGroupColors[index];
}
// enregistrement
export const recordingStatusLabels = {
  SALE: 'SALE',
  NI: 'NI',
  DNC: 'DNC',
  CALLBK: 'CALLBK',
  XFER: 'XFER',
};

export const recordingStatusColors = {
  SALE: 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]',
  NI: 'bg-gray-100 text-gray-700 border border-gray-200',
  DNC: 'bg-red-50 text-red-800 border border-red-100',
  CALLBK: 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]',
  XFER: 'bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]',
};

export const booleanLabels = { Y: 'Oui', N: 'Non' };

export const booleanColors = {
  Y: 'bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]',
  N: 'bg-red-50 text-red-800 border border-red-100',
};

