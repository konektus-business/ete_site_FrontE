export default function KPIWidget({ icon, title, badge, value, variation, variationLabel, children ,subLabel , showPercent}) {
  const isPositive = variation >= 0;

  return (
    <div className="box-border flex flex-col gap-4 p-4 sm:p-6 w-full bg-white border border-[#1EB394]/40 rounded-[16px]">

      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-[36px] h-[38px] shrink-0 bg-emerald-50 rounded-lg flex items-center justify-center">
            {icon}
          </div>
      <span className="font-semibold text-[13px] leading-5 text-[#536175] break-words">
        {title}
      </span>
        </div>
        {badge && (
          <div className="flex flex-col items-start pt-1 pr-[13.09px] pb-1 pl-2 bg-[#F0FDF4] rounded-[4px] shrink-0">
            <span className="font-bold text-[10px] leading-[15px] uppercase text-[#059669] whitespace-nowrap">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="font-bold text-[25px] leading-[36px] text-[#1E293B] truncate">
          {value}
        </div>
        {subLabel && (
          <div className="font-normal text-[11px] leading-[16.5px] align-middle text-[#536175] mb-0.5">
            {subLabel}
          </div>
        )}
        {variation !== undefined && (
          <div className="flex flex-row items-center gap-1 flex-wrap text-[12px] font-medium text-[#536175]">
            <span className={`flex items-center justify-center shrink-0 ${isPositive ? 'text-[#10B981]' : 'text-rose-600 rotate-180'}`}>
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[11px] h-[14px]">
                <path
                  d="M0.667969 5.33268L5.33464 0.666016M5.33464 0.666016L10.0013 5.33268M5.33464 0.666016V12.666"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={`font-bold text-[14px] leading-[20px] align-middle ${isPositive ? 'text-[#10B981]' : 'text-rose-600'}`}>
              {isPositive ? '+' : ''}{variation}{showPercent ? '%' : ''}
            </span>
            <span className="font-normal text-[14px] leading-[20px] text-[#5E6671]">
              {variationLabel || 'vs mois dernier'}
            </span>
          </div>
        )}
      </div>

      {children && (
        <div className="w-full pt-4 border-t border-[#E0E5EA] flex flex-col gap-2">
          {children}
        </div>
      )}
    </div>
  );
}