export const mockCurrentUser = {
  name: 'Karim Ben Ali',
  role: 'Super Admin',
  avatarUrl: '/avatar.jpg',
};

export const getCurrentUser = async () => {
  // Plus tard : return axios.get('/api/auth')
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCurrentUser), 300);
  });
};
const MOCK_ADMIN_PASSWORD = 'admin123';

export const verifyAdminPassword = async (password) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(password === MOCK_ADMIN_PASSWORD), 300);
  });
};