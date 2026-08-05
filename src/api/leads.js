const FIRST_NAMES = ['Ahmed', 'Sana', 'Karim', 'Ines', 'Yassine', 'Mona'];
const LAST_NAMES = ['Ben Ali', 'Trabelsi', 'Chaouch', 'Ferjani', 'Gharbi', 'Dubois'];

const generateMockLeads = (count = 60) => Array.from({ length: count }, (_, i) => ({
  lead_id: 1000 + i,
  campaign_id: i % 2 === 0 ? 'VIP2026' : 'SAVFR',
  list_id: i % 2 === 0 ? 'L001' : 'L010',
  list_name: i % 2 === 0 ? 'Liste VIP 2026' : 'Liste SAV France',
  first_name: FIRST_NAMES[i % FIRST_NAMES.length],
  last_name: LAST_NAMES[i % LAST_NAMES.length],
  phone_number: `+216 5${i % 10} ${String(100000 + i * 13).slice(0, 6)}`,
  email: `client${i}@example.com`,
  status: i % 3 === 0 ? 'SALE' : i % 3 === 1 ? 'NI' : '',
  agent: i % 2 === 0 ? 'Karim Ben Ali' : 'Sami Trabelsi',
  entry_date: new Date(Date.now() - i * 86400000).toISOString(),
  comments: '',
}));

let mockLeads = generateMockLeads();

export async function searchLeads(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let results = [...mockLeads];
  if (filters.campaign_id) results = results.filter((l) => l.campaign_id === filters.campaign_id);
  if (filters.list_id) results = results.filter((l) => l.list_id === filters.list_id);
  if (filters.status) results = results.filter((l) => l.status === filters.status);
  if (filters.phone) results = results.filter((l) => l.phone_number.includes(filters.phone));
  if (filters.name) {
    const n = filters.name.toLowerCase();
    results = results.filter((l) => `${l.first_name} ${l.last_name}`.toLowerCase().includes(n));
  }
  return { leads: results, total: results.length };
}

let mockDnc = ['+21620100000', '+33612340000'];

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
  phone_number: 'Téléphone', first_name: 'Prénom', last_name: 'Nom', email: 'Email',
  city: 'Ville', postal_code: 'Code postal', status: 'Statut', agent: 'Agent', entry_date: "Date d'entrée",
};

let mockExportTemplates = [
  { id: 1, name: 'Export ventes', format: 'csv', fields: ['phone_number', 'first_name', 'last_name', 'status'] },
];

export async function getExportTemplates() {
  await new Promise((r) => setTimeout(r, 200));
  return [...mockExportTemplates];
}

export async function saveExportTemplate(data) {
  await new Promise((r) => setTimeout(r, 300));
  if (data.id) mockExportTemplates = mockExportTemplates.map((t) => (t.id === data.id ? { ...data } : t));
  else mockExportTemplates.push({ ...data, id: Date.now() });
  return { success: true };
}

export async function deleteExportTemplate(id) {
  await new Promise((r) => setTimeout(r, 200));
  mockExportTemplates = mockExportTemplates.filter((t) => t.id !== id);
  return { success: true };
}

// --- Bases & Matching ---
let mockCustomTables = ['custom_ooredoo_juin', 'custom_orange_mai'];

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