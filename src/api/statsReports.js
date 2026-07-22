export const getAgentsStats = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allData = [
        { id: 1, agent: 'Karim Ben Ali', login: '1001', appels: 84, fiches: 22, dureeTotale: '02:14:30', dureeMoyenne: '00:01:35', ventes: 9 },
        { id: 2, agent: 'Sami Trabelsi', login: '1002', appels: 63, fiches: 15, dureeTotale: '01:48:12', dureeMoyenne: '00:01:43', ventes: 5 },
        { id: 3, agent: 'Nadia Chaouch', login: '1003', appels: 97, fiches: 30, dureeTotale: '02:40:05', dureeMoyenne: '00:01:39', ventes: 14 },
        { id: 4, agent: 'Youssef Gharbi', login: '1004', appels: 42, fiches: 9, dureeTotale: '00:58:20', dureeMoyenne: '00:01:23', ventes: 2 },
      ];

      const factor = { today: 1, yesterday: 0.8, week: 4.5, month: 18, custom: 1 }[filters.period] || 1;

      const filtered = allData.map((row) => {
        const appels = Math.round(row.appels * factor);
        const ventes = Math.round(row.ventes * factor);
        return {
          ...row,
          appels,
          fiches: Math.round(row.fiches * factor),
          ventes,
          tauxConversion: appels > 0 ? Number(((ventes / appels) * 100).toFixed(1)) : 0,
        };
      });

      resolve(filtered);
    }, 300);
  });
};

export const getCampaignsList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 'CAMP_VIP', label: 'Campagne VIP' },
        { value: 'CAMP_STANDARD', label: 'Campagne Standard' },
        { value: 'CAMP_RELANCE', label: 'Campagne Relance' },
        { value: 'CAMP_SAV', label: 'Campagne SAV' },
      ]);
    }, 200);
  });
};

export const getInboundStats = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: brancher sur de vraies données une fois Chart.js installé
      resolve({
        labels: ['08h', '09h', '10h', '11h', '12h', '13h', '14h'],
        totalFiches: [12, 19, 15, 22, 18, 9, 14],
        avgTalk: [95, 102, 88, 110, 99, 87, 93],
        avgDispo: [20, 25, 18, 30, 22, 15, 19],
        avgWait: [8, 12, 6, 15, 10, 5, 7],
        avgPause: [3, 5, 2, 4, 3, 2, 3],
      });
    }, 300);
  });
};

export const getListsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 'LIST_VIP_2026', label: 'Liste VIP 2026' },
        { value: 'LIST_PROSPECTS', label: 'Liste Prospects' },
        { value: 'LIST_RELANCE_Q3', label: 'Liste Relance Q3' },
      ]);
    }, 200);
  });
};

export const getOutboundStats = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // TODO: brancher sur de vraies données une fois Chart.js installé
      resolve({
        labels: ['08h', '09h', '10h', '11h', '12h', '13h', '14h'],
        totalFiches: [8, 14, 11, 17, 13, 6, 10],
        avgTalk: [110, 98, 105, 120, 115, 90, 102],
        avgDispo: [22, 19, 24, 28, 20, 16, 21],
        avgWait: [10, 8, 12, 14, 9, 6, 8],
        avgPause: [4, 3, 5, 4, 3, 2, 4],
      });
    }, 300);
  });
};

export const getRHStats = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        widgets: {
          agentsActifs: 18,
          productionTotale: '14:32:10',
          appelsTotal: 642,
          pausesTotales: '03:12:45',
        },
        rows: [
          { id: 1, agent: 'Karim Ben Ali', login: '1001', premiereConnexion: '08:02:15', derniereDeconnexion: '17:01:40', debrief: '00:12:30', pauses: '00:45:00', pausesProductives: '00:20:00', pausesNonProductives: '00:25:00', menu: '00:05:10', production: '07:45:20', presence: '08:59:25', dureeComm: '02:14:30' },
          { id: 2, agent: 'Sami Trabelsi', login: '1002', premiereConnexion: '08:15:02', derniereDeconnexion: '16:50:10', debrief: '00:08:45', pauses: '00:38:00', pausesProductives: '00:15:00', pausesNonProductives: '00:23:00', menu: '00:03:20', production: '07:10:05', presence: '08:35:08', dureeComm: '01:48:12' },
          { id: 3, agent: 'Nadia Chaouch', login: '1003', premiereConnexion: '07:58:40', derniereDeconnexion: '17:10:00', debrief: '00:15:00', pauses: '00:50:30', pausesProductives: '00:30:00', pausesNonProductives: '00:20:30', menu: '00:06:00', production: '08:00:30', presence: '09:11:20', dureeComm: '02:40:05' },
        ],
      });
    }, 300);
  });
};

export const getGlobalStatusStats = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rows: [
          { id: 1, qualification: 'Vente confirmée', code: 'SALE', nombre: 142, pourcentage: 22.1 },
          { id: 2, qualification: 'Rappel programmé', code: 'CALLBACK', nombre: 98, pourcentage: 15.3 },
          { id: 3, qualification: 'Non intéressé', code: 'NI', nombre: 201, pourcentage: 31.4 },
          { id: 4, qualification: 'Répondeur', code: 'AM', nombre: 87, pourcentage: 13.6 },
          { id: 5, qualification: 'Ligne occupée', code: 'BUSY', nombre: 112, pourcentage: 17.5 },
        ],
        hourly: {
          labels: ['08h', '09h', '10h', '11h', '12h', '13h', '14h'],
          data: [45, 62, 58, 71, 65, 40, 52],
        },
      });
    }, 300);
  });
};

export const getAgentStatusSummary = async (filters) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, agent: 'Karim Ben Ali', totalOccurrences: 84 },
        { id: 2, agent: 'Sami Trabelsi', totalOccurrences: 63 },
        { id: 3, agent: 'Nadia Chaouch', totalOccurrences: 97 },
      ]);
    }, 300);
  });
};

export const getAgentStatusDetail = async (agentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, code: 'SALE', codeStatut: 'Vente confirmée', nombre: 22, pourcentage: 26.2 },
        { id: 2, code: 'CALLBACK', codeStatut: 'Rappel programmé', nombre: 15, pourcentage: 17.9 },
        { id: 3, code: 'NI', codeStatut: 'Non intéressé', nombre: 30, pourcentage: 35.7 },
        { id: 4, code: 'AM', codeStatut: 'Répondeur', nombre: 17, pourcentage: 20.2 },
      ]);
    }, 300);
  });
};