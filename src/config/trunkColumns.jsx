import { getStatusColorClass } from '../utils/statusConstants';


export const trunkColumns = [
  {
    key: 'name',
    label: 'Nom',
    render: (row) => <span className="text-xs font-medium text-gray-900">{row.name}</span>,
  },
  {
    key: 'host',
    label: 'Host',
    render: (row) => <span className="text-xs text-gray-700">{row.host}</span>,
  },
  {
    key: 'port',
    label: 'Port',
    render: (row) => <span className="text-xs text-gray-700">{row.port}</span>,
  },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => (
      <span className={`text-xs font-medium ${getStatusColorClass(row)}`}>{row.raw}</span>
    ),
  },
];