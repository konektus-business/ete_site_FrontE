// Classes Tailwind réutilisées dans toutes les pages avec formulaires/filtres.
// Centralisé pour éviter de recopier les mêmes chaînes dans 9 fichiers.

// Label au-dessus d'un champ (identique partout dans le projet)
export const labelClass = 'block text-xs font-medium text-gray-500 mb-1.5';

// Input utilisé dans les barres de FILTRES (pages Stats : période, dates...)
// Hauteur fixe 38px pour s'aligner avec les boutons "Appliquer" à côté
export const filterInputClass =
  'w-full h-[38px] rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

// Input utilisé dans les FORMULAIRES de création/édition (CarrierForm,
// ScheduleForm, AddAgent, AddSupUser, Groups...)
export const formInputClass =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors';

