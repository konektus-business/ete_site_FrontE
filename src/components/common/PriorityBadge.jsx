import { priorityLabels as defaultPriorityLabels, priorityColors as defaultPriorityColors } from '../../utils/statusConstants';

const PriorityBadge = ({ 
  priority, 
  priorityLabels = defaultPriorityLabels,
  priorityColors = defaultPriorityColors
}) => {
  return (
    <span 
      className={`
        inline-flex items-center justify-center
        whitespace-nowrap px-2.5 py-1 rounded-full 
        font-bold text-[11px] leading-none align-middle
        ${priorityColors[priority] || 'bg-gray-100 text-gray-800'}
      `}
    >
      {priorityLabels[priority] || priority}
    </span>
  );
};

export default PriorityBadge;