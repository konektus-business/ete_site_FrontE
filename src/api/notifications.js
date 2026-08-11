// src/api/notifications.js
//
// Mock façon mockUsers.js : donnees en memoire + async/setTimeout pour
// simuler la latence reseau. Le jour ou le vrai backend PHP existe,
// on remplace juste le contenu des fonctions par des fetch() reels —
// les noms et le format retourne ne changent pas.

let mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Appel terminé',
    message: "L'appel avec Karim Ben Ali s'est terminé avec succès.",
    read: false,
    createdAt: '2026-08-07T09:10:00',
    link: '/crm/panneauLive',
  },
  {
    id: 2,
    type: 'danger',
    title: 'Échec de connexion',
    message: "L'agent Sami Trabelsi n'a pas pu se connecter au softphone.",
    read: false,
    createdAt: '2026-08-07T08:45:00',
    link: '/crm/panneauLive',
  },
  {
    id: 3,
    type: 'warning',
    title: 'File d\'attente saturée',
    message: 'La campagne "Support Client" dépasse 20 appels en attente.',
    read: false,
    createdAt: '2026-08-07T08:30:00',
    link: '/crm/compagnes',
  },
  {
    id: 4,
    type: 'info',
    title: 'Nouveau lead assigné',
    message: 'Un nouveau lead a été assigné à Nadia Chaouch.',
    read: true,
    createdAt: '2026-08-06T17:20:00',
    link: '/crm/panneauLive',
  },
  {
    id: 5,
    type: 'primary',
    title: 'Mise à jour système',
    message: 'La version 2.4 de KonektUs est disponible.',
    read: true,
    createdAt: '2026-08-05T11:00:00',
  },
];

export async function getNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 300);
  });
  // Format attendu par NotificationsDropdown, un tableau de :
  // {
  //   id,
  //   type: 'success' | 'danger' | 'warning' | 'info' | 'primary',
  //   title,
  //   message,
  //   read: boolean,
  //   createdAt: ISOString,
  //   link?: string
  // }
}

export async function markNotificationRead(id) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const index = mockNotifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    mockNotifications[index] = { ...mockNotifications[index], read: true };
  }
  return mockNotifications[index];
}

export async function markAllNotificationsRead() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  mockNotifications = mockNotifications.map((n) => ({ ...n, read: true }));
  return mockNotifications;
}