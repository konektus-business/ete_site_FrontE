const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function BlogSkeleton() {
  return (
    <div className="relative w-full overflow-hidden pt-28 pb-12 sm:pt-40 sm:pb-16 lg:pt-[220px] lg:pb-20">
      {/* Hero */}
      <div className="mx-auto flex w-full max-w-[1187px] flex-col items-center gap-12 px-5 sm:gap-16 sm:px-8 lg:gap-[120px] lg:px-0">
        <div className="flex w-full flex-col items-center gap-4">
          <Bar className="h-8 w-full max-w-[600px] sm:h-10" />
          <Bar className="h-8 w-3/4 max-w-[400px] sm:h-10" />
          <Bar className="mt-2 h-14 w-full max-w-[745px]" />
        </div>

        <div className="flex w-full flex-col items-center gap-8 sm:gap-11 lg:flex-row">
          <Bar className="h-[220px] w-full shrink-0 rounded-[15px] sm:h-[280px] lg:h-[343px] lg:w-[642px]" />
          <div className="flex w-full flex-col items-start gap-3 lg:w-[502px]">
            <div className="flex items-center gap-3 sm:gap-4">
              <Bar className="h-6 w-28 rounded" />
              <Bar className="h-6 w-20 rounded" />
            </div>
            <div className="flex w-full flex-col items-start gap-4 sm:gap-5">
              <Bar className="h-16 w-full" />
              <Bar className="h-20 w-full" />
            </div>
            <Bar className="h-5 w-28" />
          </div>
        </div>
      </div>

      {/* Blog grid */}
      <div className="mx-auto mt-20 w-full max-w-[1244px] px-5 sm:mt-28 sm:px-8 lg:mt-40 lg:px-0">
        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#e5e5e5] pb-3 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} className="h-6 w-28" />
          ))}
        </div>

        {/* Posts grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-9 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex w-full max-w-[390px] flex-col items-start gap-5 sm:gap-8">
              <Bar className="aspect-[3/2] w-full rounded-[15px]" />
              <div className="flex w-full flex-col items-start gap-3 sm:gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <Bar className="h-4 w-16" />
                  <Bar className="h-4 w-24" />
                </div>
                <Bar className="h-14 w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-14 flex justify-center sm:mt-20">
          <Bar className="h-12 w-32 rounded-3xl" />
        </div>
      </div>

      {/* Newsletter */}
      <div className="mx-auto mt-20 w-full max-w-[1244px] px-5 sm:mt-28 sm:px-8 lg:mt-40 lg:px-0">
        <Bar className="flex h-[320px] w-full flex-col items-center rounded-[24px] sm:h-[360px] sm:rounded-[40px] lg:h-[400px]" />
      </div>
    </div>
  );
}