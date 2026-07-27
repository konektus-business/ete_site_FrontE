// Données mock simulant la table call_time du backend VICIdial
const mockSchedules = [
  { id: 1, call_time_id: 'office_hours', call_time_name: 'Heures de bureau', call_time_comments: 'Standard', ct_default_start: 900, ct_default_stop: 1800 },
  { id: 2, call_time_id: 'night_shift', call_time_name: 'Équipe de nuit', call_time_comments: '', ct_default_start: 2100, ct_default_stop: 500 },
];

// Simule GET /schedules.php - liste tous les horaires
export const getSchedules = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // délai réseau simulé, pattern auth.js
  return mockSchedules;
};

// Simule schedule_insert.php - ajoute un nouvel horaire au mock
export const createSchedule = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newSchedule = { id: Date.now(), ...data }; // id généré côté client, temporaire pour le mock
  mockSchedules.push(newSchedule);
  return newSchedule;
};

// Simule schedule_update.php - met à jour un horaire existant
// originalId = call_time_id avant modification (au cas où l'utilisateur change l'ID lui-même)
export const updateSchedule = async (originalId, data) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockSchedules.findIndex((s) => s.call_time_id === originalId);
  if (index !== -1) {
    mockSchedules[index] = { ...mockSchedules[index], ...data };
  }
  return mockSchedules[index];
};

// Simule schedule_delete.php - retire un horaire du mock
export const deleteSchedule = async (callTimeId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockSchedules.findIndex((s) => s.call_time_id === callTimeId);
  if (index !== -1) mockSchedules.splice(index, 1);
};