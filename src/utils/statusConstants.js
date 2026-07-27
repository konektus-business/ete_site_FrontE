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
{"-----------------------------------------------"}
export const userStatusLabels = {
  actif: "Actif",
  inactif: "Inactif",
};

export const userStatusColors = {
  actif: "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
  inactif: "bg-red-50 text-red-800 border border-red-100",
};

export const genericGroupColors = [
  "bg-[#FDF2F8] text-[#DB2777] border border-[#FCE7F3]",
  "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
  "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
  "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]",
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
  const index = hashString(group) % genericGroupColors.length;
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