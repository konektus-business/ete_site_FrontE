import { Users, DollarSign, Megaphone, Phone, ArrowLeftRight, Smartphone, Clock, PhoneCall } from 'lucide-react';

export const widgetsConfig = [
  {
    key: 'agentsConnectes',
    icon: Users,
    title: 'Agents connectés',
    badge: 'EN DIRECT',
    variationLabel: 'vs hier',
  },
  {
    key: 'ventes',
    icon: DollarSign,
    title: 'Ventes',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
  },
  {
    key: 'campagnesActives',
    icon: Megaphone,
    title: 'Campagnes actives',
    badge: 'EN DIRECT',
    variationLabel: 'vs hier',
  },
  {
    key: 'appels',
    icon: Phone,
    title: 'Appels',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
  },
  {
    key: 'appelsFixes',
    icon: ArrowLeftRight,
    title: 'Appels fixes',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
  },
  {
    key: 'appelsMobiles',
    icon: Smartphone,
    title: 'Appels mobiles',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
  },
  {
    key: 'minutesFixes',
    icon: PhoneCall,
    title: 'Minutes fixes',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
    suffix: ' min',
  },
  {
    key: 'minutesMobiles',
    icon: Clock,
    title: 'Minutes mobiles',
    badge: 'PÉRIODE',
    variationLabel: 'vs période précédente',
    suffix: ' min',
  },
];