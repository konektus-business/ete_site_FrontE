// src/api/dashboardCharts.js

// Évolution temporelle des appels (Courbes comparatives)
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
          actuel: [
            310, 340, 410, 450, 430, 490, 520, 300, 280, 410, 
            430, 480, 500, 530, 510, 320, 290, 440, 460, 490, 
            510, 540, 560, 310, 290, 450, 480, 520, 550, 580
          ],
          precedent: [
            290, 320, 380, 410, 400, 450, 480, 270, 250, 380, 
            400, 440, 460, 490, 470, 290, 270, 410, 420, 450, 
            470, 500, 510, 280, 260, 410, 430, 470, 500, 520
          ],
        },
        '6mois': {
          labels: ['Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul'],
          actuel: [8200, 8900, 9100, 9800, 10200, 10950],
          precedent: [7800, 8300, 8600, 9200, 9600, 10100],
        },
      };

      resolve(datasets[period] || datasets['7j']);
    }, 250);
  });
};

// Répartition des ventes et appels par campagne (Graphique Donut)
export const getCampaignsRepartition = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: 'Campagne VIP', value: 45, color: '#006B57' },
        { label: 'Campagne Standard', value: 142, color: '#1EB394' },
        { label: 'Campagne Relance', value: 67, color: '#6EE7B7' },
        { label: 'Campagne SAV', value: 30, color: '#DCFCE7' },
      ]);
    }, 250);
  });
};