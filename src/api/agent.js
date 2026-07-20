// src/api/agent.js
export const createAgent = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Date.now() });
    }, 300);
  });
};
export const createSupUser = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...data, id: Date.now() });
    }, 300);
  });
};