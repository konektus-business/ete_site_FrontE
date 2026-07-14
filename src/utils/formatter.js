const formatter = new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
export const formatCurrency = (amount) => {
    return formatter.format(amount);
}
export function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    if (weeks < 1) return "cette semaine";
    return `Il y'a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Il y'a ${months} mois`;
  }

  const years = Math.floor(diffDays / 365);
  return `Client depuis ${years} an${years > 1 ? 's' : ''}`;
}