import ooredoo from '../assets/carrierLogos/ooredoo.png';
import orange from '../assets/carrierLogos/orange.png';

// Clé = carrier_name normalisé (minuscule, sans accents/espaces)
const normalize = (name) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');

export const carrierLogos = {
  ooredoo: ooredoo,
  ooredootunisie: ooredoo,
  orange: orange,
  orangetunisie: orange,
};

export const getCarrierLogo = (carrierName) => carrierLogos[normalize(carrierName)] || null;