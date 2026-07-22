/**
 * Retourne la plage de dates par défaut (7 derniers jours) au format YYYY-MM-DD
 */
export const getDefaultDates = (daysOffset = 7) => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - daysOffset);
  const format = (d) => d.toISOString().split('T')[0];
  return { startDate: format(start), endDate: format(end) };
};