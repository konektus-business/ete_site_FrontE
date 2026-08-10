const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function WebinarSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-28 sm:px-6 sm:pt-40 lg:pt-[220px]">
        {/* Hero */}
        <div className="flex w-full flex-col items-center gap-5 text-center sm:gap-6">
          <Bar className="h-9 w-full max-w-[700px] sm:h-11" />
          <Bar className="h-9 w-2/3 max-w-[400px] sm:h-11" />
          <Bar className="mt-2 h-14 w-full max-w-[746px]" />
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:gap-4">
            <Bar className="h-11 w-48 rounded-2xl" />
            <Bar className="h-11 w-40 rounded-2xl" />
          </div>
          <Bar className="mt-8 h-[300px] w-full max-w-[1265px] rounded-2xl sm:h-[420px]" />
        </div>

        {/* Prochains webinaires */}
        <div className="mt-16 flex w-full flex-col gap-8 sm:mt-20 sm:gap-10 lg:mt-24 lg:gap-12">
          <Bar className="h-8 w-72" />
          <div className="flex flex-col gap-6 sm:gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <Bar key={i} className="h-[420px] w-full rounded-[24px] sm:h-[280px] lg:rounded-[32px]" />
            ))}
          </div>
        </div>

        {/* Replays */}
        <div className="mt-16 flex w-full flex-col gap-8 sm:mt-20 sm:gap-10 lg:mt-24 lg:gap-12">
          <Bar className="h-8 w-72" />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Bar key={i} className="h-[320px] w-full rounded-3xl" />
            ))}
          </div>
        </div>

        {/* Events & Community */}
        <div className="mt-16 flex w-full flex-col gap-10 sm:mt-20 sm:gap-12 lg:mt-24 lg:gap-16">
          <Bar className="h-8 w-80" />
          <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-end lg:gap-10">
            <div className="flex flex-1 flex-wrap justify-center gap-6 sm:gap-7 lg:justify-start">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bar key={i} className="h-[220px] w-full max-w-[327px] rounded-[24px] lg:h-[254px] lg:rounded-[32px]" />
              ))}
            </div>
            <Bar className="w-full max-w-[514px] shrink-0 self-center h-[400px] rounded-[24px] sm:rounded-[40px] lg:h-[542px] lg:self-auto" />
          </div>
        </div>

        {/* Final CTA */}
        <Bar className="mt-16 mb-16 h-[300px] w-full rounded-[24px] sm:mt-20 sm:mb-20 sm:h-[280px] sm:rounded-[32px] lg:mt-24 lg:mb-24 lg:rounded-[40px]" />
      </div>
    </div>
  );
}