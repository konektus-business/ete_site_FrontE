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
  return Number.parseInt(h, 10) * 100 + Number.parseInt(m, 10);
};

// Convertit une durée "HH:MM:SS" en nombre de minutes (pour les graphiques),
// ex: "00:20:00" -> 20, "01:05:30" -> 65.5
export const durationToMinutes = (hhmmss) => {
  if (!hhmmss) return 0;
  const [h, m, s] = hhmmss.split(':').map(Number);
  return h * 60 + m + (s || 0) / 60;
};

// Formate un nombre de secondes en "HH:MM:SS" (durées d'appel temps réel, PanneauLive)
export const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Formate une date en "il y a X min/h/j" pour les listes type notifications
export const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  return `il y a ${Math.floor(hours / 24)}j`;
};