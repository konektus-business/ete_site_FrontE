// src/api/dashboardStats.js

export const getDashboardStats = async (period = '7j') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        agentsConnectes: { 
          total: 24, 
          variation: 8, 
          sparkline: [18, 20, 19, 22, 21, 23, 24] 
        },
        ventes: { 
          total: 156, 
          variation: 12, 
          sparkline: [110, 120, 118, 135, 130, 148, 156] 
        },
        campagnesActives: { 
          total: 7, 
          variation: -3, 
          sparkline: [9, 8, 8, 7, 8, 7, 7] 
        },
        appels: { 
          total: 3842, 
          variation: 15, 
          sparkline: [3100, 3300, 3250, 3500, 3600, 3700, 3842] 
        },
        appelsFixes: { 
          total: 1204, 
          variation: 5, 
          sparkline: [1050, 1080, 1100, 1150, 1170, 1190, 1204] 
        },
        appelsMobiles: { 
          total: 2638, 
          variation: 18, 
          sparkline: [2050, 2200, 2150, 2350, 2450, 2550, 2638] 
        },
        minutesFixes: { 
          total: 842, 
          variation: 4, 
          sparkline: [780, 800, 790, 810, 820, 830, 842] 
        },
        minutesMobiles: { 
          total: 1204, 
          variation: 21, 
          sparkline: [950, 1000, 980, 1050, 1100, 1150, 1204] 
        },
      });
    }, 250);
  });
};