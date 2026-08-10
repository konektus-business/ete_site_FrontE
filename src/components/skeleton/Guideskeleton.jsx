const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function GuideSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-28 sm:px-6 sm:pt-40 lg:pt-[260px]">
        <div className="flex w-full items-center justify-center gap-10 pb-12 sm:pb-16 lg:gap-20 lg:pb-24">
          <div className="flex w-full max-w-[563px] flex-col gap-5 sm:gap-7">
            <div className="flex flex-col gap-3">
              <Bar className="h-8 w-full max-w-[520px] sm:h-11" />
              <Bar className="h-8 w-3/4 max-w-[400px] sm:h-11" />
            </div>
            <Bar className="h-20 w-full" />
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Bar className="h-12 w-48 rounded-3xl" />
              <Bar className="h-12 w-48 rounded-3xl" />
            </div>
          </div>
          <Bar className="hidden h-[400px] max-w-[658px] flex-1 rounded-2xl lg:block" />
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-10 flex w-full min-h-[320px] items-center justify-center overflow-hidden py-16 sm:mt-16 sm:min-h-[480px] sm:py-24 lg:py-32">
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-wrap items-start justify-center gap-x-6 gap-y-8 px-5 sm:gap-x-8 sm:gap-y-10 sm:px-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Bar className="h-9 w-28 sm:h-12 sm:w-36" />
              <Bar className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Guides by category */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-6">
        <div className="flex w-full flex-col items-center gap-12 py-16 sm:gap-16 sm:py-24">
          <Bar className="h-8 w-72" />

          <div className="flex w-full flex-col gap-10 sm:gap-14">
            {Array.from({ length: 3 }).map((_, catIdx) => (
              <div key={catIdx} className="flex w-full flex-col gap-8">
                <div className="flex items-end justify-between gap-3 border-b border-[#1eb394]/20 pb-2">
                  <Bar className="h-6 w-48" />
                  <Bar className="h-5 w-20" />
                </div>
                <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e5e5]">
                      <Bar className="h-44 w-full rounded-none sm:h-48" />
                      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                        <Bar className="h-4 w-32" />
                        <Bar className="h-6 w-full" />
                        <Bar className="h-10 w-full" />
                        <Bar className="mt-auto h-12 w-full rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Bar className="h-12 w-32 rounded-3xl" />
        </div>

        {/* Final CTA */}
        <Bar className="mb-16 h-[300px] w-full rounded-[24px] sm:mb-24 sm:h-[360px] sm:rounded-[48px]" />
      </div>
    </div>
  );
}