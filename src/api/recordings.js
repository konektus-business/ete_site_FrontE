// Mock imitant get_recordings.php / save_settings.php. La pagination réelle
// est gérée côté client par Table.jsx, comme partout ailleurs dans le CRM —
// ici on renvoie juste la liste déjà filtrée par période/recherche.
const STATUSES = ['SALE', 'NI', 'DNC', 'CALLBK', 'XFER'];
const AGENTS = ['Karim Ben Ali', 'Sami Trabelsi', 'Nadia Chaouch', 'Claire Dubois', 'Mouna Ferjani'];
const LISTS = ['Liste VIP 2026', 'Liste SAV France', 'Liste Relance Q3', 'Liste Standard'];

const generateMockRecordings = (count = 145) => Array.from({ length: count }, (_, i) => ({
  id: i + 1,
  date: new Date(Date.now() - i * 3600 * 1000 * (1 + Math.random() * 6)).toISOString(),
  agent: AGENTS[i % AGENTS.length],
  phone: `+216 ${20 + (i % 70)} ${(100000 + i * 37).toString().slice(0, 6)}`,
  status: STATUSES[i % STATUSES.length],
  list: LISTS[i % LISTS.length],
  duration: 30 + Math.floor(Math.random() * 600),
}));

const ALL_RECORDINGS = generateMockRecordings();

export async function getRecordings({ period = 'today', startDate, endDate, search = '' } = {}) {
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

  let filtered = ALL_RECORDINGS.filter((r) => {
    const d = new Date(r.date);
    if (periodStart && d < periodStart) return false;
    if (periodEnd && d > periodEnd) return false;
    return true;
  });

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter((r) =>
      r.agent.toLowerCase().includes(s) ||
      r.phone.toLowerCase().includes(s) ||
      r.status.toLowerCase().includes(s) ||
      r.list.toLowerCase().includes(s)
    );
  }

  return { recordings: filtered, total: filtered.length };
}

const DEFAULT_SETTINGS = {
  recordings_path: '/var/spool/asterisk/monitor',
  retention_days: 90,
  preferred_format: 'wav',
  direct_play: true,
};

export async function getRecordingSettings() {
  await new Promise((r) => setTimeout(r, 200));
  return { ...DEFAULT_SETTINGS };
}

export async function saveRecordingSettings(settings) {
  await new Promise((r) => setTimeout(r, 300));
  Object.assign(DEFAULT_SETTINGS, settings);
  return { ...DEFAULT_SETTINGS };
}