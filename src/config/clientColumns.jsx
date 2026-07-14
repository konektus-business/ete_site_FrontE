import StatusBadge from '../components/common/StatusBadge';
import PlanBadge from '../components/common/PalnBadge';
import { formatCurrency } from '../utils/formatter';
import Modal from '../components/common/Modal';
import {getInitials, getAvatarColor} from '../utils/avatar';
import { Eye, FileText, MoreVertical } from 'lucide-react';
import { getTimeAgo } from '../utils/formatter';
const paysFlags = {
  Tunisie: "tn",
  France: "fr",
};


export const clientsTable = {
columns: [
  {
    key: 'select',
    label: (
      <input 
        type="checkbox" 
        defaultChecked={false} 
        className="appearance-none w-4 h-4 rounded-[4px] border-[1px] border-solid border-[#6B7280] bg-white checked:bg-[#006B57] cursor-pointer"
      />
    ),
    render: (client) => (
      <input 
        type="checkbox" 
        defaultChecked={false} 
        className="appearance-none w-4 h-4 rounded-[4px] border-[1px] border-solid border-[#6B7280] bg-white checked:bg-[#006B57] cursor-pointer"
      />
    )
  },

  {
    key: 'nom',
    label: 'Client',
    render: (client) => (
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${getAvatarColor(client.id)}`}>
          {getInitials(`${client.prenom} ${client.nom}`)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{client.prenom} {client.nom}</p>
          <p className="text-xs text-gray-400">{client.societe}</p>
        </div>
      </div>
    )
  },
    {
      key: 'contact',
      label: 'Contact',
      render: (client) => (
        <div>
        <a 
          href={`mailto:${client.email}`}
          onClick={(e) => e.stopPropagation()}
          className="font-sans font-medium text-xs leading-4 tracking-normal align-middle text-[#2563EB] hover:underline"
        >
          {client.email}
        </a>
          <p className="font-sans font-normal text-[11px] leading-none tracking-normal align-middle text-gray-500">
            {client.telephone}
          </p>
        </div>
      )
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (client) => (
        <div align="left">
          <PlanBadge plan={client.plan.type} />
          <p className="font-sans font-medium text-[11px] leading-none tracking-normal align-middle text-gray-500 mt-1">
            {client.plan.frequence.charAt(0).toUpperCase() + client.plan.frequence.slice(1)} <br /> {client.plan.utilisateurs} utilisateurs
          </p>
        </div>
      )
    },
    {
      key: 'pays',
      label: 'Pays',
      render: (client) => (
        <div className="flex items-center gap-2">
          <span className={`rounded-[4px] fi fi-${paysFlags[client.pays]}`}></span>
          <span className="font-sans font-normal text-xs leading-4 tracking-normal align-middle text-gray-700">{client.pays}</span>
        </div>
      )
    },
    { key: 'date_creation', 
      label: "Date d'inscription",
      render: (client) => (
        <div>
          <span className="font-sans font-semibold text-xs leading-4 tracking-normal align-middle text-[#111827]"> 
            {client.date_creation}
          </span>
          <p className="text-xs text-[#6B7280]">{getTimeAgo(client.date_creation)}</p>
        </div>
      )
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (client) => <StatusBadge status={client.statut} />
    },
    {
      key: 'solde',
      label: 'Valeur Client',
      render: (client) => (
        <span className="font-sans font-semibold text-xs leading-4 tracking-normal align-middle text-gray-900">
          {formatCurrency(client.solde)}
        </span>
      )
    },
    {
    key: 'actions',
    label: 'Actions',
    render: (client) => (
        <div className="flex items-center gap-2 text-gray-400">
        <Eye className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        <FileText className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        <MoreVertical className="w-4 h-4 cursor-pointer hover:text-gray-700" />
        </div>
     )
    },
  ],
};