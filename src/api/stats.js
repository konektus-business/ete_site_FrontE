const mockDashboardStats = {
  revenus: {
    montant: 24850,
    variation: 18,
    objectif: 30000,
  },
  abonnements: {
    total: 47,
    variation: 12,
    parPlan: { essentiel: 18, avance: 22, pro: 7 },
  },
  utilisateursActifs: {
    total: 328,
    variation: 34,
    connectesAujourdhui: 87,
  },
  tauxConversion: {
    pourcentage: 34,
    variation: 4,
    essaisTotal: 138,
  },
};

export const getDashboardStats = async () => {
  // Plus tard : return axios.get('/api/stats/dashboard')
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDashboardStats), 300);
  });
};