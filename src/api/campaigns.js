const DIAL_METHODS = ['MANUAL', 'RATIO', 'ADAPT_HARD_LIMIT', 'INBOUND_MAN'];
export const dialMethods = DIAL_METHODS;

let mockCampaigns = [
  { campaign_id: 'VIP2026', campaign_name: 'Campagne VIP', dial_method: 'RATIO', campaign_script: 'script_vip.txt', campaign_cid: '+21620100000', lead_order: 'DOWN', active: 'Y' },
  { campaign_id: 'STD01', campaign_name: 'Campagne Standard', dial_method: 'MANUAL', campaign_script: 'script_std.txt', campaign_cid: '+21621100000', lead_order: 'UP', active: 'Y' },
  { campaign_id: 'RELQ3', campaign_name: 'Campagne Relance', dial_method: 'ADAPT_HARD_LIMIT', campaign_script: '', campaign_cid: '+21622100000', lead_order: 'DOWN', active: 'N' },
  { campaign_id: 'SAVFR', campaign_name: 'Campagne SAV', dial_method: 'INBOUND_MAN', campaign_script: 'script_sav.txt', campaign_cid: '+33612345678', lead_order: 'UP', active: 'Y' },
];

let mockLists = {
  VIP2026: [{ list_id: 'L001', list_name: 'Liste VIP 2026', list_description: 'Clients premium', active: 'Y' }],
  SAVFR: [{ list_id: 'L010', list_name: 'Liste SAV France', list_description: 'Réclamations en cours', active: 'Y' }],
};

export async function getCampaigns() {
  await new Promise((r) => setTimeout(r, 300));
  return [...mockCampaigns];
}

export async function getCampaign(campaignId) {
  await new Promise((r) => setTimeout(r, 200));
  return mockCampaigns.find((c) => c.campaign_id === campaignId) || null;
}

export async function createCampaign(data) {
  await new Promise((r) => setTimeout(r, 300));
  if (mockCampaigns.some((c) => c.campaign_id === data.campaign_id)) {
    throw new Error('exists');
  }
  mockCampaigns.push({ ...data });
  return { success: true };
}

export async function updateCampaign(originalId, data) {
  await new Promise((r) => setTimeout(r, 300));
  mockCampaigns = mockCampaigns.map((c) => (c.campaign_id === originalId ? { ...data } : c));
  return { success: true };
}

export async function deleteCampaign(campaignId) {
  await new Promise((r) => setTimeout(r, 300));
  mockCampaigns = mockCampaigns.filter((c) => c.campaign_id !== campaignId);
  delete mockLists[campaignId];
  return { success: true };
}

export async function getCampaignLists(campaignId) {
  await new Promise((r) => setTimeout(r, 200));
  return mockLists[campaignId] || [];
}

let mockCampaignStatuses = {
  VIP2026: [
    { status: 'SALE', status_name: 'Vente', selectable: 'Y', human_answered: 'Y', category: 'SALE', sale: 'Y', dnc: 'N', customer_contact: 'Y', not_interested: 'N', unworkable: 'N', scheduled_callback: 'N', completed: 'Y', min_sec: 0, max_sec: 0, answering_machine: 'N' },
    { status: 'NI', status_name: 'Pas intéressé', selectable: 'Y', human_answered: 'Y', category: 'NI', sale: 'N', dnc: 'N', customer_contact: 'Y', not_interested: 'Y', unworkable: 'N', scheduled_callback: 'N', completed: 'Y', min_sec: 0, max_sec: 0, answering_machine: 'N' },
  ],
};

export async function getCampaignsWithStatusCount() {
  await new Promise((r) => setTimeout(r, 300));
  return mockCampaigns
    .filter((c) => c.active === 'Y')
    .map((c) => ({ ...c, status_count: (mockCampaignStatuses[c.campaign_id] || []).length }));
}

export async function getCampaignStatuses(campaignId) {
  await new Promise((r) => setTimeout(r, 200));
  return mockCampaignStatuses[campaignId] || [];
}

export async function addCampaignStatus(campaignId, data) {
  await new Promise((r) => setTimeout(r, 300));
  const list = mockCampaignStatuses[campaignId] || (mockCampaignStatuses[campaignId] = []);
  if (list.some((s) => s.status === data.status)) throw new Error('exists');
  list.push({ ...data });
  return { success: true };
}

export async function updateCampaignStatus(campaignId, originalStatus, data) {
  await new Promise((r) => setTimeout(r, 300));
  mockCampaignStatuses[campaignId] = (mockCampaignStatuses[campaignId] || []).map((s) =>
    s.status === originalStatus ? { ...data } : s
  );
  return { success: true };
}

export async function deleteCampaignStatus(campaignId, status) {
  await new Promise((r) => setTimeout(r, 300));
  mockCampaignStatuses[campaignId] = (mockCampaignStatuses[campaignId] || []).filter((s) => s.status !== status);
  return { success: true };
}

// Agrège les statuts de TOUTES les campagnes,
// pour la vue d'ensemble sur StatusPicker
export async function getGlobalStatusStats() {
  await new Promise((r) => setTimeout(r, 200));
  const allStatuses = Object.values(mockCampaignStatuses).flat();
  return {
    total: allStatuses.length,
    sale: allStatuses.filter((s) => s.sale === 'Y').length,
    dnc: allStatuses.filter((s) => s.dnc === 'Y').length,
    callback: allStatuses.filter((s) => s.scheduled_callback === 'Y').length,
  };
}