// Convertit un entier HHMM (format VICIdial, ex: 900, 2100) en chaîne 'HH:MM'
// utilisable directement dans un <input type="time">
export const hhmmToTimeInput = (hhmm) => {
  if (hhmm === null || hhmm === undefined || hhmm === '') return '';
  // padStart(4, '0') : "900" -> "0900" pour toujours avoir 4 chiffres avant de découper
  const str = String(hhmm).padStart(4, '0');
  return `${str.slice(0, 2)}:${str.slice(2)}`;
};

// Fait l'inverse : convertit la valeur d'un <input type="time"> ('09:00')
// vers l'entier HHMM attendu par VICIdial (900)
export const timeInputToHhmm = (timeStr) => {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':');
  // ex: '09:00' -> 9 * 100 + 0 = 900
  return parseInt(h, 10) * 100 + parseInt(m, 10);
};