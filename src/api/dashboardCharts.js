// Simule une série temporelle d'appels selon la période choisie (7 jours / 30 jours / 6 mois),
// avec une courbe "actuelle" et une courbe "période précédente" pour comparaison
// (comme les 2 lignes de la maquette "Revenus actuels" / "Revenus mois précédent")
export const getCallsEvolution = async (period = '7j') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datasets = {
        '7j': {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          actuel: [420, 480, 510, 490, 560, 300, 280],
          precedent: [400, 430, 460, 440, 500, 270, 260],
        },
        '30j': {
          labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
          actuel: Array.from({ length: 30 }, () => 300 + Math.floor(Math.random() * 300)),
          precedent: Array.from({ length: 30 }, () => 280 + Math.floor(Math.random() * 280)),
        },
        '6mois': {
          labels: ['Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'],
          actuel: [8200, 8900, 9100, 9800, 10200, 10950],
          precedent: [7800, 8300, 8600, 9200, 9600, 10100],
        },
      };
      resolve(datasets[period] || datasets['7j']);
    }, 300);
  });
};

// Simule la répartition des ventes/appels par campagne (pour le donut),
// réutilise les mêmes libellés que getCampaignsList() dans statsReports.js
export const getCampaignsRepartition = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: 'Campagne VIP', value: 45, color: '#006B57' },
        { label: 'Campagne Standard', value: 142, color: '#1EB394' },
        { label: 'Campagne Relance', value: 67, color: '#6EE7B7' },
        { label: 'Campagne SAV', value: 30, color: '#DCFCE7' },
      ]);
    }, 300);
  });
};