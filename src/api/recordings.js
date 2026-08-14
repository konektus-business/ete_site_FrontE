// src/api/recordings.js

const STATUSES = ['SALE', 'NI', 'DNC', 'CALLBK', 'XFER'];

// Mappage des agents avec leurs listes et indicatifs téléphoniques correspondants
const AGENT_CONFIGS = [
  { agent: 'Karim Ben Ali', list: 'Liste VIP 2026', phonePrefix: '+216 55' },
  { agent: 'Sami Trabelsi', list: 'Liste Standard', phonePrefix: '+216 20' },
  { agent: 'Nadia Chaouch', list: 'Liste Relance Q3', phonePrefix: '+216 58' },
  { agent: 'Claire Dubois', list: 'Liste SAV France', phonePrefix: '+33 6' },
  { agent: 'Mouna Ferjani', list: 'Liste Relance Q3', phonePrefix: '+216 98' },
];

//  exemple d'enregistrement audio pour tester le lecteur audio du CRM
const SAMPLE_AUDIO_URLS = [
  new URL('./recording_mock.mp3', import.meta.url).href,
];

const generateMockRecordings = (count = 145) => {
  const baseTime = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const config = AGENT_CONFIGS[i % AGENT_CONFIGS.length];
    const phoneNum = `${config.phonePrefix} ${(100000 + i * 37).toString().padStart(6, '0')}`;
    const recDate = new Date(baseTime - i * 3600 * 1000 * (1 + (i % 4) * 0.7));

    return {
      id: i + 1,
      filename: `REC_${recDate.toISOString().slice(0, 10).replace(/-/g, '')}_${1000 + i}.wav`,
      date: recDate.toISOString(),
      agent: config.agent,
      phone: phoneNum,
      status: STATUSES[i % STATUSES.length],
      list: config.list,
      duration: 35 + ((i * 23) % 420), // Durée en secondes (ex: 35s à 455s)
      url: SAMPLE_AUDIO_URLS[i % SAMPLE_AUDIO_URLS.length],
    };
  });
};

const ALL_RECORDINGS = generateMockRecordings();

export async function getRecordings({ period = 'today', startDate, endDate, search = '' } = {}) {
  await new Promise((r) => setTimeout(r, 300));

  const now = new Date();
  let periodStart = null;
  let periodEnd = null;

  switch (period) {
    case 'today': {
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      periodEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      break;
    }
    case 'yesterday': {
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
      periodEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
      break;
    }
    case 'week': {
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0);
      periodEnd = now;
      break;
    }
    case 'month': {
      periodStart = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0);
      periodEnd = now;
      break;
    }
    case 'custom': {
      periodStart = startDate ? new Date(startDate) : null;
      periodEnd = endDate ? new Date(endDate) : now;
      if (periodEnd && endDate && !endDate.includes('T')) {
        periodEnd.setHours(23, 59, 59, 999);
      }
      break;
    }
    default:
      periodStart = null;
      periodEnd = null;
  }

  let filtered = ALL_RECORDINGS.filter((r) => {
    const d = new Date(r.date);
    if (periodStart && d < periodStart) return false;
    if (periodEnd && d > periodEnd) return false;
    return true;
  });

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.agent.toLowerCase().includes(s) ||
        r.phone.toLowerCase().includes(s) ||
        r.status.toLowerCase().includes(s) ||
        r.list.toLowerCase().includes(s) ||
        (r.filename && r.filename.toLowerCase().includes(s))
    );
  }

  return { recordings: filtered, total: filtered.length };
}

let currentSettings = {
  recordings_path: '/var/spool/asterisk/monitor',
  retention_days: 90,
  preferred_format: 'wav',
  direct_play: true,
};

export async function getRecordingSettings() {
  await new Promise((r) => setTimeout(r, 200));
  return { ...currentSettings };
}

export async function saveRecordingSettings(settings) {
  await new Promise((r) => setTimeout(r, 300));
  currentSettings = { ...currentSettings, ...settings };
  return { ...currentSettings };
}