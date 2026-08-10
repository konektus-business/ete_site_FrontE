// src/api/live.js

// État initial des agents en supervision
let mockAgents = [
  {
    id: 1,
    full_name: 'Karim Ben Ali',
    campaign_name: 'Campagne VIP',
    campaign_id: 'VIP2026',
    status: 'INCALL',
    phone_number: '+216 55 123 456',
    list_name: 'Liste VIP 2026',
    agent_ip: '196.203.12.4',
    last_state_change: new Date(Date.now() - 125000).toISOString(),
    stats: { leads: 22, pos: 9, pause_seconds: 1845, total_seconds: 8423 },
  },
  {
    id: 2,
    full_name: 'Sami Trabelsi',
    campaign_name: 'Campagne Standard',
    campaign_id: 'STD01',
    status: 'READY',
    phone_number: null,
    list_name: null,
    agent_ip: '105.98.34.2',
    last_state_change: new Date(Date.now() - 45000).toISOString(),
    stats: { leads: 15, pos: 5, pause_seconds: 920, total_seconds: 6120 },
  },
  {
    id: 3,
    full_name: 'Nadia Chaouch',
    campaign_name: 'Campagne Relance',
    campaign_id: 'RELQ3',
    status: 'PAUSED',
    phone_number: null,
    list_name: null,
    agent_ip: '197.15.88.21',
    last_state_change: new Date(Date.now() - 300000).toISOString(),
    stats: { leads: 30, pos: 14, pause_seconds: 3600, total_seconds: 12450 },
  },
  {
    id: 4,
    full_name: 'Sarra Mejri',
    campaign_name: 'Campagne VIP',
    campaign_id: 'VIP2026',
    status: 'DEAD',
    phone_number: null,
    list_name: null,
    agent_ip: '196.203.45.7',
    last_state_change: new Date(Date.now() - 600000).toISOString(),
    stats: { leads: 8, pos: 2, pause_seconds: 450, total_seconds: 2340 },
  },
  {
    id: 5,
    full_name: 'Claire Dubois',
    campaign_name: 'Campagne SAV',
    campaign_id: 'SAVFR',
    status: 'INCALL',
    phone_number: '+33 6 12 34 56 78',
    list_name: 'Liste SAV France',
    agent_ip: '82.65.12.3',
    last_state_change: new Date(Date.now() - 45000).toISOString(),
    stats: { leads: 18, pos: 7, pause_seconds: 1200, total_seconds: 7890 },
  },
  {
    id: 6,
    full_name: 'Marc Lefevre',
    campaign_name: 'Campagne Standard',
    campaign_id: 'STD01',
    status: 'READY',
    phone_number: null,
    list_name: null,
    agent_ip: '90.10.34.5',
    last_state_change: new Date(Date.now() - 30000).toISOString(),
    stats: { leads: 12, pos: 4, pause_seconds: 600, total_seconds: 5670 },
  },
  {
    id: 7,
    full_name: 'Mouna Ferjani',
    campaign_name: 'Campagne Relance',
    campaign_id: 'RELQ3',
    status: 'INCALL',
    phone_number: '+216 58 987 654',
    list_name: 'Liste Relance Q3',
    agent_ip: '196.203.9.13',
    last_state_change: new Date(Date.now() - 310000).toISOString(),
    stats: { leads: 25, pos: 11, pause_seconds: 2100, total_seconds: 9876 },
  },
  {
    id: 8,
    full_name: 'Julien Moreau',
    campaign_name: 'Campagne VIP',
    campaign_id: 'VIP2026',
    status: 'READY',
    phone_number: null,
    list_name: null,
    agent_ip: '78.192.4.61',
    last_state_change: new Date(Date.now() - 15000).toISOString(),
    stats: { leads: 10, pos: 3, pause_seconds: 780, total_seconds: 4320 },
  },
  {
    id: 9,
    full_name: 'Youssef Gharbi',
    campaign_name: 'Campagne Standard',
    campaign_id: 'STD01',
    status: 'PAUSED',
    phone_number: null,
    list_name: null,
    agent_ip: '105.98.12.9',
    last_state_change: new Date(Date.now() - 180000).toISOString(),
    stats: { leads: 6, pos: 1, pause_seconds: 1500, total_seconds: 1890 },
  },
  {
    id: 10,
    full_name: 'Hamza Zaidi',
    campaign_name: 'Campagne SAV',
    campaign_id: 'SAVFR',
    status: 'READY',
    phone_number: null,
    list_name: null,
    agent_ip: '197.0.5.44',
    last_state_change: new Date(Date.now() - 90000).toISOString(),
    stats: { leads: 14, pos: 6, pause_seconds: 890, total_seconds: 6540 },
  },
];

// Récupération des données temps réel avec légères variations pour le polling
export const getLiveData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Petite variation aléatoire des appels pour simuler du vrai direct
      const ringingVar = Math.floor(Math.random() * 5) - 2; // -2 à +2
      const hopperVar = Math.floor(Math.random() * 10) - 5;  // -5 à +5

      resolve({
        timestamp: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        outbound: { count: 847, total_seconds: 48235, avg_seconds: 57 },
        inbound: { count: 312, total_seconds: 18942, avg_seconds: 61 },
        sales: 156,
        power: 42,
        calls_placed: 1247,
        ringing: Math.max(5, 18 + ringingVar),
        hopper: Math.max(100, 342 + hopperVar),
        agents: [...mockAgents],
      });
    }, 250);
  });
};

// Fonction pour simuler une action superviseur (ex: raccrocher ou changer statut agent)
export const updateAgentStatusInLive = async (agentId, newStatus) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockAgents = mockAgents.map((ag) => {
        if (ag.id === agentId) {
          return {
            ...ag,
            status: newStatus,
            phone_number: newStatus === 'INCALL' ? ag.phone_number : null,
            list_name: newStatus === 'INCALL' ? ag.list_name : null,
            last_state_change: new Date().toISOString(),
          };
        }
        return ag;
      });
      resolve({ success: true });
    }, 200);
  });
};