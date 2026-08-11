// src/constants/notificationTypes.js
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Bell } from 'lucide-react';

// Centralise l'apparence de chaque type de notif : icone, couleur, fond teinte.
// Meme pattern que statusConstants.js -> une seule source de verite,
// pas de couleurs hex eparpillees dans les composants.
export const NOTIFICATION_TYPES = {
  success: {
    icon: CheckCircle2,
    iconColor: '#10B981',
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50/60',
  },
  danger: {
    icon: AlertCircle,
    iconColor: '#EF4444',
    dot: 'bg-red-500',
    bg: 'bg-red-50/60',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: '#F59E0B',
    dot: 'bg-amber-500',
    bg: 'bg-amber-50/60',
  },
  info: {
    icon: Info,
    iconColor: '#3B82F6',
    dot: 'bg-blue-500',
    bg: 'bg-blue-50/60',
  },
  primary: {
    icon: Bell,
    iconColor: '#6366F1',
    dot: 'bg-indigo-500',
    bg: 'bg-indigo-50/60',
  },
};

// Fallback si un type inconnu/absent arrive du backend
export const DEFAULT_NOTIFICATION_TYPE = NOTIFICATION_TYPES.info;

export const getNotificationTypeConfig = (type) => NOTIFICATION_TYPES[type] || DEFAULT_NOTIFICATION_TYPE;