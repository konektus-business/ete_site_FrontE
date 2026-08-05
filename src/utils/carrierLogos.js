import ooredoo from '../assets/carrierLogos/ooredoo.png';
import orange from '../assets/carrierLogos/orange.png';

const normalize = (name) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');

// Logos statiques par défaut (fallback si aucun logo custom n'est uploadé)
export const carrierLogos = {
  ooredoo: ooredoo,
  ooredootunisie: ooredoo,
  orange: orange,
  orangetunisie: orange,
};

// row = carrier complet, pas juste le nom, pour pouvoir checker row.logo en premier
export const getCarrierLogo = (row) => {
  if (row?.logo) return row.logo; // logo uploadé par l'utilisateur (base64), priorité absolue
  return carrierLogos[normalize(row?.carrier_name ?? '')] || null;
};

//nom de l'opérateur
const nameColors = [
  {  text: '#5B21B6' }, // violet
  {  text: '#9D174D' }, // pink
  {  text: '#065F46' }, // emerald
  {  text: '#334155' }, // slate
  {  text: '#92400E' }, // amber
  {  text: '#1E40AF' }, // blue
  {  text: '#9F1239' }, // rose
];

export const getCarrierNameColor = (name = '') => {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return nameColors[hash % nameColors.length];
};
