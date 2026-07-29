// Transforme "AGENT" en "Agent" (ou "SUPER ADMIN" en "Super Admin")
export const formatGroupName = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};