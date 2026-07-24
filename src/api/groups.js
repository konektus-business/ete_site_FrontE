// src/api/groups.js
let mockGroups = [
  { group_name: 'ADMIN' },
  { group_name: 'SUPERVISEUR' },
  { group_name: 'AGENT' },
];

export const getGroups = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockGroups]), 300);
  });
};

export const createGroup = async (groupName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockGroups.some(
        (g) => g.group_name.toLowerCase() === groupName.toLowerCase()
      );
      if (exists) {
        reject(new Error('exists'));
        return;
      }
      const newGroup = { group_name: groupName };
      mockGroups.push(newGroup);
      resolve(newGroup);
    }, 300);
  });
};

export const deleteGroup = async (groupName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockGroups = mockGroups.filter((g) => g.group_name !== groupName);
      resolve(true);
    }, 300);
  });
};