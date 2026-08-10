// src/api/search.js
import { getGroups } from './groups';
import { getUsers } from './users';
import { getCampaigns } from './campaigns';
import { getCdrList } from './cdr';

// Matching "mot par mot" : chaque mot tape doit se retrouver quelque part
// dans le texte concatene, peu importe l'ordre ou le champ d'origine.
const matchesMulti = (searchableText, query) => {
  const text = (searchableText || '').toString().toLowerCase();
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return words.every((w) => text.includes(w));
};

// Champs reels bases sur users.js / campaigns.js / groups.js / cdr.js
const searchableAgent = (a) =>
  [a.full_name, a.user, a.user_group, a.phone_login, a.country].filter(Boolean).join(' ');

const searchableGroup = (g) =>
  [g.group_name].filter(Boolean).join(' ');

const searchableCampaign = (c) =>
  [c.campaign_name, c.campaign_id, c.dial_method, c.campaign_cid].filter(Boolean).join(' ');

const searchableCdr = (c) =>
  [c.phone_number, c.destination, c.type].filter(Boolean).join(' ');

let cache = null;
let cacheTime = 0;
const CACHE_TTL = 60_000;

const safeArray = (result) => {
  if (result.status !== 'fulfilled' || !result.value) return [];
  const val = result.value;

  if (Array.isArray(val)) return val;
  if (typeof val === 'object') {
    const foundArray = Object.values(val).find((v) => Array.isArray(v));
    return foundArray || [];
  }
  return [];
};

async function loadEntities() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) return cache;

  const [agents, groupes, campagnes, appels] = await Promise.allSettled([
    getUsers(),
    getGroups(),
    getCampaigns(),
    // period 'today' par defaut sur getCdrList limiterait la recherche aux
    // appels du jour -> plage large pour couvrir tout l'historique mock.
    getCdrList({ period: 'custom', startDate: '2000-01-01', endDate: new Date().toISOString() }),
  ]);

  cache = {
    agents: safeArray(agents),
    groupes: safeArray(groupes),
    campagnes: safeArray(campagnes),
    appels: safeArray(appels),
  };
  cacheTime = now;
  return cache;
}

export async function searchGlobal(query) {
  if (!query || query.trim().length < 2) {
    return { agents: [], groupes: [], campagnes: [], appels: [] };
  }

  const data = await loadEntities();

  return {
    agents: data.agents
      .filter((a) => matchesMulti(searchableAgent(a), query))
      .slice(0, 5),
    groupes: data.groupes
      .filter((g) => matchesMulti(searchableGroup(g), query))
      .slice(0, 5),
    campagnes: data.campagnes
      .filter((c) => matchesMulti(searchableCampaign(c), query))
      .slice(0, 5),
    appels: data.appels
      .filter((c) => matchesMulti(searchableCdr(c), query))
      .slice(0, 5),
  };
}