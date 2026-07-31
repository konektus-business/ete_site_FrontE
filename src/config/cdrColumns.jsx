import { formatDuration } from '../utils/timeFormat';
import { paysFlags } from '../utils/paysFlags';

export const cdrColumns = [
  { key: 'call_date', label: 'Date', sortable: true, render: (row) => <span className="text-xs text-gray-700 whitespace-nowrap">{new Date(row.call_date).toLocaleString('fr-FR')}</span> },
  {
    key: 'destination',
    label: 'Destination',
    sortable: true,
    render: (row) => {
      const flagCode = paysFlags[row.destination];
      return (
      <div className="flex items-center gap-2">
        {flagCode && <span className={`rounded-[4px] fi fi-${flagCode}`}></span>}
        <span className="font-sans font-normal text-xs leading-4 tracking-normal align-middle text-gray-700">
          {row.destination}
        </span>
    </div>
      );
    },
  },
  // "Type" ici = classification tarifaire (Fixe/Mobile), pas le sens de l'appel
  // (Sortant/Entrant, qui lui est géré par le filtre) — même logique que le PHP
  { key: 'type_detected', label: 'Type', render: (row) => <span className="text-xs text-gray-500 whitespace-nowrap">{row.type_detected === 'mobile' ? 'Mobile' : 'Fixe'}</span> },
  { key: 'phone_number', label: 'Numéro appelé', sortable: true, render: (row) => <span className="text-xs font-mono text-gray-700 whitespace-nowrap">{row.phone_number}</span> },
  { key: 'length_in_sec', label: 'Durée', render: (row) => <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{formatDuration(row.length_in_sec)}</span> },
  { key: 'prix', label: 'Prix (€)', render: (row) => <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{row.prix.toFixed(4)} €</span> },
];