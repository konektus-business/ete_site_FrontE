export const getDashboardStats = async (startDate, endDate) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        agentsConnectes: { total: 24, variation: 8 },
        ventes: { total: 156, variation: 12 },
        campagnesActives: { total: 7, variation: -3 },
        appels: { total: 3842, variation: 15 },
        appelsFixes: { total: 1204, variation: 5 },
        appelsMobiles: { total: 2638, variation: 18 },
        minutesFixes: { total: 842, variation: 4 },
        minutesMobiles: { total: 1204, variation: 21 },
      });
    }, 300);
  });
};

