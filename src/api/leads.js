const FIRST_NAMES = ['Ahmed', 'Sana', 'Karim', 'Ines', 'Yassine', 'Mona', 'Jean', 'Sophie'];
const LAST_NAMES = ['Ben Ali', 'Trabelsi', 'Chaouch', 'Ferjani', 'Gharbi', 'Dubois', 'Martin', 'Moreau'];

const CITIES = {
  TN: [
    { city: 'Tunis', cp: '1000' },
    { city: 'Sousse', cp: '4000' },
    { city: 'Sfax', cp: '3000' },
    { city: 'Djerba', cp: '4180' },
  ],
  FR: [
    { city: 'Paris', cp: '75008' },
    { city: 'Lyon', cp: '69002' },
    { city: 'Marseille', cp: '13001' },
    { city: 'Lille', cp: '59000' },
  ],
};

const CAMPAIGN_MAPPING = [
  { campaign_id: 'VIP2026', list_id: 'L001', list_name: 'Liste VIP 2026', country: 'TN' },
  { campaign_id: 'STD01', list_id: 'L002', list_name: 'Liste Standard TN', country: 'TN' },
  { campaign_id: 'SAVFR', list_id: 'L010', list_name: 'Liste SAV France', country: 'FR' },
  { campaign_id: 'RELQ3', list_id: 'L003', list_name: 'Liste Relance Q3', country: 'TN' },
];

const generateMockLeads = (count = 80) => Array.from({ length: count }, (_, i) => {
  const camp = CAMPAIGN_MAPPING[i % CAMPAIGN_MAPPING.length];
  const isFR = camp.country === 'FR';
  const geoList = CITIES[camp.country];
  const geo = geoList[i % geoList.length];

  // Numéro adapté au pays de la campagne
  const phoneNumber = isFR
    ? `+33 ${i % 2 === 0 ? '6' : '7'}${String(10000000 + i * 137).slice(0, 8)}`
    : `+216 ${50 + (i % 4) * 10} ${String(100000 + i * 13).slice(0, 6)}`;

  return {
    lead_id: 1000 + i,
    campaign_id: camp.campaign_id,
    list_id: camp.list_id,
    list_name: camp.list_name,
    first_name: FIRST_NAMES[i % FIRST_NAMES.length],
    last_name: LAST_NAMES[i % LAST_NAMES.length],
    phone_number: phoneNumber,
    email: `client${i + 1}@example.com`,
    city: geo.city,
    postal_code: geo.cp,
    status: i % 4 === 0 ? 'SALE' : i % 4 === 1 ? 'NI' : i % 4 === 2 ? 'CALLBK' : '',
    agent: i % 2 === 0 ? 'Karim Ben Ali' : 'Sami Trabelsi',
    entry_date: new Date(Date.now() - i * 86400000).toISOString(),
    comments: i % 5 === 0 ? 'Client très intéressé par le service' : '',
  };
});

let mockLeads = generateMockLeads();

export async function searchLeads(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let results = [...mockLeads];
  if (filters.campaign_id) results = results.filter((l) => l.campaign_id === filters.campaign_id);
  if (filters.list_id) results = results.filter((l) => l.list_id === filters.list_id);
  if (filters.status) results = results.filter((l) => l.status === filters.status);
  if (filters.phone) results = results.filter((l) => l.phone_number.replace(/\s+/g, '').includes(filters.phone.replace(/\s+/g, '')));
  if (filters.name) {
    const n = filters.name.toLowerCase();
    results = results.filter((l) => `${l.first_name} ${l.last_name}`.toLowerCase().includes(n));
  }
  return { leads: results, total: results.length };
}

// --- Liste Noire (DNC) ---
let mockDnc = ['+216 20 100 000', '+33 6 12 34 56 78'];

export async function getDncList() {
  await new Promise((r) => setTimeout(r, 200));
  return [...mockDnc];
}

export async function addDncNumber(phone) {
  await new Promise((r) => setTimeout(r, 200));
  if (mockDnc.includes(phone)) throw new Error('exists');
  mockDnc.push(phone);
  return { success: true };
}

export async function deleteDncNumber(phone) {
  await new Promise((r) => setTimeout(r, 200));
  mockDnc = mockDnc.filter((p) => p !== phone);
  return { success: true };
}

// --- Modèles d'export ---
export const availableExportFields = {
  phone_number: 'Téléphone',
  first_name: 'Prénom',
  last_name: 'Nom',
  email: 'Email',
  city: 'Ville',
  postal_code: 'Code postal',
  status: 'Statut',
  agent: 'Agent',
  entry_date: "Date d'entrée",
};

let mockExportTemplates = [
  { id: 1, name: 'Export ventes', format: 'csv', fields: ['phone_number', 'first_name', 'last_name', 'status', 'agent'] },
  { id: 2, name: 'Export complet SAV', format: 'xlsx', fields: ['phone_number', 'first_name', 'last_name', 'email', 'city', 'postal_code', 'status'] },
];

// --- Importation de leads ---
export async function importLeads(campaignId, listId, leadsArray) {
  await new Promise((r) => setTimeout(r, 600));

  const newEntries = leadsArray.map((item, i) => ({
    lead_id: Date.now() + i,
    campaign_id: campaignId,
    list_id: listId,
    first_name: item.first_name || item.prenom || 'N/A',
    last_name: item.last_name || item.nom || 'N/A',
    phone_number: item.phone || item.telephone || '+216 00 000 000',
    email: item.email || '',
    city: item.city || '',
    postal_code: item.postal_code || '',
    status: '',
    agent: '',
    entry_date: new Date().toISOString(),
    comments: 'Importé via fichier CSV',
  }));

  mockLeads.push(...newEntries);
  return { success: true, count: newEntries.length };
}

// --- Modèles d'export ---
export async function getExportTemplates() {
  await new Promise((r) => setTimeout(r, 200));
  return [...mockExportTemplates];
}

export async function saveExportTemplate(data) {
  await new Promise((r) => setTimeout(r, 300));
  if (data.id) {
    mockExportTemplates = mockExportTemplates.map((t) => (t.id === data.id ? { ...data } : t));
  } else {
    mockExportTemplates.push({ ...data, id: Date.now() });
  }
  return { success: true };
}

export async function deleteExportTemplate(id) {
  await new Promise((r) => setTimeout(r, 200));
  mockExportTemplates = mockExportTemplates.filter((t) => t.id !== id);
  return { success: true };
}
// --- Comptage des leads par liste ---
export function getLeadsCountForList(listId) {
  return mockLeads.filter((l) => l.list_id === listId).length;
}

// --- Bases & Matching ---
let mockCustomTables = ['custom_ooredoo_juin', 'custom_orange_mai', 'custom_sav_france_q2'];

export async function getCustomTables() {
  await new Promise((r) => setTimeout(r, 200));
  return [...mockCustomTables];
}

export async function launchExtraction(payload) {
  await new Promise((r) => setTimeout(r, 500));
  if (payload.new_table_name) {
    const tableName = `custom_${payload.new_table_name}`;
    if (!mockCustomTables.includes(tableName)) mockCustomTables.push(tableName);
  }
  return { success: true, rows_matched: Math.floor(Math.random() * 200) + 20 };
}