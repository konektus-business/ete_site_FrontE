import avatar from '../assets/public/avatar.jpg';
export const mockCurrentUser = {
  name: 'Karim Ben Ali',
  role: 'Super Admin',
  avatarUrl: avatar,
};

export const getCurrentUser = async () => {
  // Plus tard : return axios.get('/api/auth')
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCurrentUser), 300);
  });
};
// Mot de passe admin "mocké" pour la confirmation de suppression d'un utilisateur ou d'un groupe.
const MOCK_ADMIN_PASSWORD = 'admin123';
// Vérifie le mot de passe admin (mock) pour la confirmation de suppression.
export const verifyAdminPassword = async (password) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(password === MOCK_ADMIN_PASSWORD), 300);
  });
};