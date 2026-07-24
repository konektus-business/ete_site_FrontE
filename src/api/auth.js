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