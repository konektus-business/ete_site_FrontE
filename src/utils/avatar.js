export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.slice(0,2).map((n) => n.charAt(0).toUpperCase());
  return initials.join('');
}
export const  getAvatarColor = (id) => {
  const colors = [
    'bg-violet-500',
    'bg-pink-500',
    'bg-emerald-500',
    'bg-slate-500',
    'bg-amber-500',
  ];
  return colors[id % colors.length];
};