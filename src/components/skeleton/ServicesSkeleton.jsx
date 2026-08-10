const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function ServicesSkeleton() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero */}
      <div className="mx-auto flex max-w-[1390px] flex-col items-center gap-8 px-4 pt-14 mt-20 sm:mt-28 sm:px-6 sm:pt-16 md:mt-[160px] md:flex-row md:gap-14 md:px-24 md:pt-24">
        <div className="flex flex-1 flex-col items-center gap-6 sm:gap-8 md:items-start">
          <div className="flex w-full flex-col gap-3 sm:gap-4">
            <Bar className="h-9 w-full max-w-[520px]" />
            <Bar className="h-9 w-3/4 max-w-[400px]" />
            <Bar className="h-24 w-full" />
          </div>
          <Bar className="h-12 w-52 rounded-3xl" />
        </div>
        <Bar className="aspect-[612/500] w-full max-w-[612px] flex-1 rounded-2xl" />
      </div>

      {/* Feature strip (desktop) */}
      <div className="mx-auto -mt-8 hidden max-w-[1024px] px-6 md:mt-16 md:block md:px-24">
        <div className="grid grid-cols-1 gap-8 rounded-2xl p-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Bar className="size-14 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col gap-2">
                <Bar className="h-4 w-24" />
                <Bar className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature strip (mobile) */}
      <div className="mx-auto mt-6 px-4 sm:px-6 md:hidden">
        <div className="flex flex-col gap-5 rounded-2xl p-5 sm:p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Bar className="size-12 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col gap-2">
                <Bar className="h-3 w-20" />
                <Bar className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services list */}
      <div className="mx-auto flex max-w-[1390px] flex-col items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:gap-16 md:px-24 md:py-32">
        <div className="flex items-center gap-3 sm:gap-5">
          <Bar className="hidden h-px w-[80px] md:block md:w-[165px]" />
          <Bar className="h-8 w-48" />
          <Bar className="hidden h-px w-[80px] md:block md:w-[165px]" />
        </div>

        <div className="flex w-full flex-col gap-16 sm:gap-20 md:gap-32">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className={`flex w-full flex-col items-center gap-8 sm:gap-10 md:flex-row md:gap-12 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <Bar className="aspect-[496/360] w-full max-w-[496px] flex-1 rounded-2xl" />
              <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
                <Bar className="size-14 rounded-2xl md:size-16" />
                <Bar className="h-8 w-2/3" />
                <Bar className="h-16 w-full" />
                <div className="flex w-full flex-col gap-3 pt-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Bar key={j} className="h-4 w-5/6" />
                  ))}
                </div>
                <Bar className="mt-3 h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto flex max-w-[1245px] flex-col items-center gap-10 px-4 pb-16 sm:gap-12 sm:px-6 sm:pb-20 md:gap-16 md:px-24 md:pb-24">
        <div className="flex items-center gap-3 sm:gap-5">
          <Bar className="hidden h-px w-[80px] md:block md:w-[165px]" />
          <Bar className="h-8 w-64" />
          <Bar className="hidden h-px w-[80px] md:block md:w-[165px]" />
        </div>
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Bar className="h-12 w-24" />
              <Bar className="h-5 w-40" />
              <Bar className="h-10 w-full max-w-[330px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-[1216px] px-4 pb-16 sm:px-6 sm:pb-20 md:px-0 md:pb-24">
        <Bar className="h-[300px] w-full rounded-[28px] sm:h-[340px] sm:rounded-[36px] md:h-[420px] md:rounded-[48px]" />
      </div>
    </div>
  );
}