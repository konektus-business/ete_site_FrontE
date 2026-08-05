// src/config/liveWidgets.js
// Config centralisée des widgets du PanneauLive, même pattern que dashboardWidgets.js.
// getValue() extrait la métrique brute depuis la réponse de getLiveData(),
// format() est optionnel (ex: secondes -> HH:MM:SS).
import { PhoneOutgoing, PhoneIncoming, Clock, Timer, DollarSign, Hourglass, Gauge, PhoneCall, BellRing, Layers } from 'lucide-react';
import { formatDuration } from '../utils/timeFormat';

export const outboundWidgetsConfig = [
  { key: 'outboundCount',    icon: PhoneOutgoing, title: 'Appels sortants', accentColor: '#3B82F6', getValue: (d) => d.outbound.count },
  { key: 'outboundDuration', icon: Clock,          title: 'Durée totale',   accentColor: '#06B6D4', getValue: (d) => d.outbound.total_seconds, format: formatDuration },
  { key: 'outboundAvg',      icon: Timer,          title: 'Durée moyenne',  accentColor: '#F59E0B', getValue: (d) => d.outbound.avg_seconds,   format: formatDuration },
  { key: 'sales',            icon: DollarSign,     title: 'Ventes',         accentColor: '#EF4444', getValue: (d) => d.sales },
];

export const inboundWidgetsConfig = [
  { key: 'inboundCount',    icon: PhoneIncoming, title: 'Appels entrants', accentColor: '#10B981', getValue: (d) => d.inbound.count },
  { key: 'inboundDuration', icon: Clock,         title: 'Durée totale',    accentColor: '#F97316', getValue: (d) => d.inbound.total_seconds, format: formatDuration },
  { key: 'inboundAvg',      icon: Timer,         title: 'Durée moyenne',   accentColor: '#EF4444', getValue: (d) => d.inbound.avg_seconds,   format: formatDuration },
  { key: 'waiting',         icon: Hourglass,     title: 'En attente',      accentColor: '#8B5CF6', getValue: () => 0 },
];

export const powerWidgetsConfig = [
  { key: 'power',       icon: Gauge,    title: 'Puissance (Auto Dial)', accentColor: '#3B82F6', getValue: (d) => d.power },
  { key: 'callsPlaced', icon: PhoneCall, title: 'Appels lancés',        accentColor: '#06B6D4', getValue: (d) => d.calls_placed },
  { key: 'ringing',     icon: BellRing, title: 'Ringing',               accentColor: '#F59E0B', getValue: (d) => d.ringing },
  { key: 'hopper',      icon: Layers,   title: 'Hopper',                accentColor: '#EF4444', getValue: (d) => d.hopper },
];