// src/api/notifications.js
//
// ADAPTE le prefixe et les routes ci-dessous a ton backend PHP reel.
const API_BASE = '/api/notifications';

export async function getNotifications() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Erreur de chargement des notifications');
  return res.json();
  // Format attendu par NotificationsDropdown, un tableau de :
  // { id, message, read: boolean, createdAt: ISOString, link?: string }
}

export async function markNotificationRead(id) {
  const res = await fetch(`${API_BASE}/${id}/read`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Erreur lors du marquage comme lu');
  return res.json();
}

export async function markAllNotificationsRead() {
  const res = await fetch(`${API_BASE}/read-all`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Erreur lors du marquage global');
  return res.json();
}