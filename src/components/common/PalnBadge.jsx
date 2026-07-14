const PlanBadge = ({ plan }) => {
  const PlanLabels = {
    pro: "Pro",
    avance: "Avancé",
    essentiel: "Essentiel"
  };
  const PlanColors = {
    pro: "bg-[#006B57] text-white",
    avance: "bg-[#1EB394] text-white",
    essentiel: "bg-[#DCFCE7] text-[#006B57]",
  };

  return (
    <span className={`w-[60px] h-[20px] flex items-center justify-center rounded-[4px] text-[10px] font-bold uppercase ${PlanColors[plan] || 'bg-gray-100 text-gray-800'}`}>
      {PlanLabels[plan] || plan}
    </span>
  );
};
export default PlanBadge;