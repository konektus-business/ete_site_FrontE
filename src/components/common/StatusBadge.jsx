import React from 'react';

const StatusBadge = ({ status }) => {
  const statusLabels = {
    prospect: "Prospect",
    client_actif: "Client Actif",
    suspendu: "Suspendu",
    resilie: "Résilié"
  };

  const statusColors = {
    prospect: "bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE]",
    client_actif: "bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5]",
    suspendu: "bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]",
    resilie: "bg-red-50 text-red-800 border border-red-100"
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        whitespace-nowrap px-2.5 py-1 rounded-full 
        font-bold text-[11px] leading-none align-middle
        ${statusColors[status] || 'bg-gray-100 text-gray-800'}
      `}
    >
      {statusLabels[status] || status}
    </span>
  );
};

export default StatusBadge;