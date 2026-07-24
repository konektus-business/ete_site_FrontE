import React from 'react';
import { statusLabels as defaultStatusLabels, statusColors as defaultStatusColors } from '../../utils/statusConstants' ;

const StatusBadge = ({ 
  status, 
  statusLabels = defaultStatusLabels,
  statusColors = defaultStatusColors
}) => {
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