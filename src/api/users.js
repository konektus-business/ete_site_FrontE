export const mockUsers = [
  { id: 1, user: '1001', full_name: 'Karim Ben Ali', user_group: 'Superviseurs', phone_login: '1001', active: 'Y', last_login: '2026-07-17 09:12', ip: '196.203.12.4', country: 'Tunisie' },
  { id: 2, user: '1002', full_name: 'Sami Trabelsi', user_group: 'Agents', phone_login: '1002', active: 'Y', last_login: '2026-07-16 18:45', ip: '105.98.34.2', country: 'Tunisie' },
  { id: 3, user: '6666', full_name: 'Admin Système', user_group: 'Admin', phone_login: '-', active: 'Y', last_login: '2026-07-16 22:00', ip: '10.0.0.1', country: '-' },
];

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsers), 300);
  });
};