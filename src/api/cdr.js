export const paysList = {
  Tunisie: 216,
  France: 33,
  Algérie: 213,
  Maroc: 212,
  Italie: 39,
};

export const operateursMobiles = {
  Tunisie: ['Ooredoo', 'Orange', 'Tunisie Telecom'],
  France: ['Orange', 'SFR', 'Bouygues', 'Free'],
  Algérie: ['Djezzy', 'Ooredoo', 'Mobilis'],
  Maroc: ['Maroc Telecom', 'Orange', 'Inwi'],
  Italie: ['TIM', 'Vodafone', 'WindTre'],
};

// Config des coûts par pays, en mémoire (comme une base qui persisterait
// tant que la page n'est pas rechargée)
const cdrConfigs = {
  Tunisie: {
    fixe: { prix: 0.015, prefixes: '1,2,3,4,5,9' },
    mobile: {
      Ooredoo: { prix: 0.035, prefixes: '5' },
      Orange: { prix: 0.032, prefixes: '2' },
      'Tunisie Telecom': { prix: 0.03, prefixes: '9' },
    },
  },
  France: {
    fixe: { prix: 0.01, prefixes: '1,2,3,4,5' },
    mobile: {
      Orange: { prix: 0.02, prefixes: '6' },
      SFR: { prix: 0.019, prefixes: '6' },
      Bouygues: { prix: 0.018, prefixes: '6' },
      Free: { prix: 0.015, prefixes: '7' },
    },
  },
};

export async function getCdrConfig(pays) {
  await new Promise((r) => setTimeout(r, 200));
  return cdrConfigs[pays] || { fixe: { prix: '', prefixes: '' }, mobile: {} };
}

export async function saveCdrConfig(pays, config) {
  await new Promise((r) => setTimeout(r, 300));
  cdrConfigs[pays] = config;
  return { success: true };
}

// --- Liste des appels (CDR) ---
const DESTINATIONS = ['Tunisie', 'France', 'Algérie', 'Maroc', 'Italie'];
const TYPES = ['OUTBOUND', 'INBOUND'];

const generateMockCdr = (count = 130) => Array.from({ length: count }, (_, i) => {
  const destination = DESTINATIONS[i % DESTINATIONS.length];
  const typeDetected = i % 3 === 0 ? 'mobile' : 'fixe';
  const prix = typeDetected === 'mobile' ? 0.02 + Math.random() * 0.02 : 0.01 + Math.random() * 0.01;
  return {
    id: i + 1,
    call_date: new Date(Date.now() - i * 3600 * 1000 * (1 + Math.random() * 5)).toISOString(),
    destination,
    type: TYPES[i % TYPES.length],
    type_detected: typeDetected,
    phone_number: `+${paysList[destination]} ${String(100000 + i * 53).slice(0, 8)}`,
    length_in_sec: 10 + Math.floor(Math.random() * 500),
    prix: Number(prix.toFixed(4)),
  };
});

const ALL_CDR = generateMockCdr();

export async function getCdrList({ period = 'today', startDate, endDate, type = '', sort = 'call_date', order = 'DESC' } = {}) {
  await new Promise((r) => setTimeout(r, 300));

  const now = new Date();
  let periodStart = null;
  switch (period) {
    case 'today': periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()); break;
    case 'yesterday': periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); break;
    case 'week': periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7); break;
    case 'month': periodStart = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); break;
    case 'custom': periodStart = startDate ? new Date(startDate) : null; break;
    default: periodStart = null;
  }
  const periodEnd = period === 'custom' && endDate ? new Date(endDate) : now;

  let filtered = ALL_CDR.filter((r) => {
    const d = new Date(r.call_date);
    if (periodStart && d < periodStart) return false;
    if (periodEnd && d > periodEnd) return false;
    if (type && r.type !== type) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sort === 'call_date') cmp = new Date(a.call_date) - new Date(b.call_date);
    else if (sort === 'destination') cmp = a.destination.localeCompare(b.destination);
    else if (sort === 'phone_number') cmp = a.phone_number.localeCompare(b.phone_number);
    return order === 'ASC' ? cmp : -cmp;
  });

  return {
    recordings: filtered,
    total_appels: filtered.length,
    total_prix: filtered.reduce((sum, r) => sum + r.prix, 0),
    total_prix_fixe: filtered.filter((r) => r.type_detected === 'fixe').reduce((sum, r) => sum + r.prix, 0),
    total_prix_mobile: filtered.filter((r) => r.type_detected === 'mobile').reduce((sum, r) => sum + r.prix, 0),
  };
}