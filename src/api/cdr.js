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

// Configuration des coûts par destination
const cdrConfigs = {
  Tunisie: {
    fixe: { prix: 0.015, prefixes: '7' },
    mobile: {
      Orange: { prix: 0.032, prefixes: '2' },
      Ooredoo: { prix: 0.035, prefixes: '5' },
      'Tunisie Telecom': { prix: 0.030, prefixes: '9' },
    },
  },
  France: {
    fixe: { prix: 0.010, prefixes: '1,2,3,4,5' },
    mobile: {
      Orange: { prix: 0.020, prefixes: '6' },
      SFR: { prix: 0.019, prefixes: '6' },
      Bouygues: { prix: 0.018, prefixes: '6' },
      Free: { prix: 0.015, prefixes: '7' },
    },
  },
  Algérie: {
    fixe: { prix: 0.025, prefixes: '21,23' },
    mobile: { Djezzy: { prix: 0.05, prefixes: '7' }, Ooredoo: { prix: 0.05, prefixes: '5' }, Mobilis: { prix: 0.048, prefixes: '6' } },
  },
  Maroc: {
    fixe: { prix: 0.022, prefixes: '5' },
    mobile: { 'Maroc Telecom': { prix: 0.045, prefixes: '6' }, Orange: { prix: 0.042, prefixes: '7' }, Inwi: { prix: 0.040, prefixes: '6' } },
  },
  Italie: {
    fixe: { prix: 0.012, prefixes: '0' },
    mobile: { TIM: { prix: 0.025, prefixes: '3' }, Vodafone: { prix: 0.025, prefixes: '3' }, WindTre: { prix: 0.023, prefixes: '3' } },
  },
};

export async function getCdrConfig(pays) {
  await new Promise((r) => setTimeout(r, 200));
  return cdrConfigs[pays] || { fixe: { prix: 0, prefixes: '' }, mobile: {} };
}

export async function saveCdrConfig(pays, config) {
  await new Promise((r) => setTimeout(r, 300));
  cdrConfigs[pays] = config;
  return { success: true };
}

// --- Scénarios diversifiés couvrant TOUS les pays du référentiel ---
const SCENARIOS = [
  // Tunisie
  { destination: 'Tunisie', campaign_id: 'VIP2026', carrier_id: 'ORANGE_TN', type: 'OUTBOUND', prefix: '22', type_detected: 'mobile' },
  { destination: 'Tunisie', campaign_id: 'STD01', carrier_id: 'OOREDOO_TN', type: 'OUTBOUND', prefix: '55', type_detected: 'mobile' },
  { destination: 'Tunisie', campaign_id: 'RELQ3', carrier_id: 'OOREDOO_TN', type: 'OUTBOUND', prefix: '71', type_detected: 'fixe' },
  // France
  { destination: 'France', campaign_id: 'SAVFR', carrier_id: 'OVH_FR', type: 'INBOUND', prefix: '612', type_detected: 'mobile' },
  { destination: 'France', campaign_id: 'SAVFR', carrier_id: 'OVH_FR', type: 'OUTBOUND', prefix: '140', type_detected: 'fixe' },
  // Algérie
  { destination: 'Algérie', campaign_id: 'STD01', carrier_id: 'OOREDOO_TN', type: 'OUTBOUND', prefix: '77', type_detected: 'mobile' },
  { destination: 'Algérie', campaign_id: 'RELQ3', carrier_id: 'OOREDOO_TN', type: 'OUTBOUND', prefix: '23', type_detected: 'fixe' },
  // Maroc
  { destination: 'Maroc', campaign_id: 'VIP2026', carrier_id: 'ORANGE_TN', type: 'OUTBOUND', prefix: '66', type_detected: 'mobile' },
  { destination: 'Maroc', campaign_id: 'STD01', carrier_id: 'ORANGE_TN', type: 'OUTBOUND', prefix: '52', type_detected: 'fixe' },
  // Italie
  { destination: 'Italie', campaign_id: 'SAVFR', carrier_id: 'OVH_FR', type: 'INBOUND', prefix: '33', type_detected: 'mobile' },
  { destination: 'Italie', campaign_id: 'SAVFR', carrier_id: 'OVH_FR', type: 'OUTBOUND', prefix: '06', type_detected: 'fixe' },
];

const generateMockCdr = (count = 130) => Array.from({ length: count }, (_, i) => {
  const scenario = SCENARIOS[i % SCENARIOS.length];
  const length_in_sec = 10 + Math.floor(Math.random() * 480);
  const minutes = length_in_sec / 60;
  
  const baseRate = scenario.type_detected === 'mobile' ? 0.035 : 0.015;
  const prix = Number((minutes * baseRate).toFixed(4));

  const phoneSuffix = String(100000 + (i * 137) % 899999);

  return {
    id: i + 1,
    call_date: new Date(Date.now() - i * 3600 * 1000 * (0.5 + Math.random() * 3)).toISOString(),
    campaign_id: scenario.campaign_id,
    carrier_id: scenario.carrier_id,
    destination: scenario.destination,
    type: scenario.type,
    type_detected: scenario.type_detected,
    phone_number: `+${paysList[scenario.destination]} ${scenario.prefix} ${phoneSuffix.slice(0, 3)} ${phoneSuffix.slice(3)}`,
    length_in_sec,
    prix,
  };
});

const ALL_CDR = generateMockCdr();

export async function getCdrList({ period = 'today', startDate, endDate, type = '', campaignId = '', sort = 'call_date', order = 'DESC' } = {}) {
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
    if (campaignId && r.campaign_id !== campaignId) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sort === 'call_date') cmp = new Date(a.call_date) - new Date(b.call_date);
    else if (sort === 'destination') cmp = a.destination.localeCompare(b.destination);
    else if (sort === 'phone_number') cmp = a.phone_number.localeCompare(b.phone_number);
    else if (sort === 'prix') cmp = a.prix - b.prix;
    return order === 'ASC' ? cmp : -cmp;
  });

  return {
    cdrs: filtered,
    recordings: filtered, // Garantit la compatibilité avec CdrList.jsx
    total_appels: filtered.length,
    total_prix: Number(filtered.reduce((sum, r) => sum + r.prix, 0).toFixed(4)),
    total_prix_fixe: Number(filtered.filter((r) => r.type_detected === 'fixe').reduce((sum, r) => sum + r.prix, 0).toFixed(4)),
    total_prix_mobile: Number(filtered.filter((r) => r.type_detected === 'mobile').reduce((sum, r) => sum + r.prix, 0).toFixed(4)),
  };
}