// src/api/agent.js
import { mockUsers } from './users';

export const createAgent = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAgent = {
        id: Date.now(),
        user: data.user,
        full_name: data.full_name,
        user_group: data.user_group || '-',
        phone_login: data.phone_login || '-',
        active: 'Y', // toujours actif à la création
        last_login: '-',
        ip: '-',
        country: '-',
      };
      mockUsers.push(newAgent);
      resolve(newAgent);
    }, 300);
  });
};

export const createSupUser = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSupUser = {
        id: Date.now(),
        user: data.user,
        full_name: data.full_name,
        user_group: data.user_group || '-',
        phone_login: data.phone_login || '-',
        active: 'Y',
        last_login: '-',
        ip: '-',
        country: '-',
        rights: data.rights, // droits d'accès du super-utilisateur
      };
      mockUsers.push(newSupUser);
      resolve(newSupUser);
    }, 300);
  });
};