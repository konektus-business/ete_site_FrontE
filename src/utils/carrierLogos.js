import ooredoo from '../assets/carrierLogos/ooredoo.png';
import orange from '../assets/carrierLogos/orange.png';

const normalize = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');

// Logos statiques par défaut (immutabilité garantie par Object.freeze)
export const carrierLogos = Object.freeze({
  ooredoo,
  ooredootunisie: ooredoo,
  orange,
  orangetunisie: orange,
});

/**
 * Récupère le logo de l'opérateur à partir de l'objet row.
 * Priorité au logo personnalisé uploade (base64).
 */
export const getCarrierLogo = (row) => {
  if (row?.logo) return row.logo;
  return carrierLogos[normalize(row?.carrier_name ?? '')] ?? null;
};

// Palette de couleurs pour l'affichage des noms d'opérateurs
const nameColors = Object.freeze([
  { text: '#5B21B6' }, // violet
  { text: '#9D174D' }, // pink
  { text: '#065F46' }, // emerald
  { text: '#334155' }, // slate
  { text: '#92400E' }, // amber
  { text: '#1E40AF' }, // blue
  { text: '#9F1239' }, // rose
]);

export const getCarrierNameColor = (name = '') => {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash += name.codePointAt(i);
  }
  return nameColors[hash % nameColors.length];
};