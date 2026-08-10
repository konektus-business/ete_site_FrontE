// src/api/groups.js
let mockGroups = [
  { group_name: 'ADMIN' },
  { group_name: 'SUPERVISEUR' },
  { group_name: 'AGENT' },
  { group_name: 'EQUIPE_SAV' },
  { group_name: 'EQUIPE_VENTE' },
];

export const getGroups = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...mockGroups];
};

export const createGroup = async (groupName) => {
  await new Promise((resolve, reject) => {
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

export const updateGroup = async (oldGroupName, newGroupName) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockGroups.some(
        (g) => g.group_name.toLowerCase() === newGroupName.toLowerCase()
      );
      if (exists && oldGroupName.toLowerCase() !== newGroupName.toLowerCase()) {
        reject(new Error('exists'));
        return;
      }
      mockGroups = mockGroups.map((g) =>
        g.group_name === oldGroupName ? { group_name: newGroupName } : g
      );
      resolve({ success: true });
    }, 300);
  });
};

export const deleteGroup = async (groupName) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      mockGroups = mockGroups.filter((g) => g.group_name !== groupName);
      resolve({ success: true });
    }, 300);
  });
};