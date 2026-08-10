const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function SolutionsSkeleton() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white/60">
      {/* Hero */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 pt-28 pb-6 sm:gap-8 sm:px-6 sm:pt-36 sm:pb-8 md:mt-[150px] md:pt-16">
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-6">
          <Bar className="h-8 w-full max-w-[600px]" />
          <Bar className="h-8 w-3/4 max-w-[420px]" />
          <Bar className="h-16 w-full max-w-2xl" />
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Bar className="h-11 w-40 rounded-full" />
            <Bar className="h-11 w-48 rounded-full" />
          </div>
        </div>
        <Bar className="mx-auto h-[220px] w-full max-w-[1143px] rounded-2xl sm:h-[400px] lg:h-[600px]" />
      </div>

      {/* Stats */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-14 sm:grid-cols-3 sm:gap-10 sm:py-24 md:py-32">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Bar className="h-10 w-20" />
            <Bar className="h-5 w-32" />
          </div>
        ))}
      </div>

      {/* Section intro */}
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-10 text-center sm:gap-6 sm:py-12">
        <Bar className="h-4 w-40" />
        <Bar className="h-9 w-full max-w-md" />
        <Bar className="h-16 w-full" />
      </div>

      {/* Module cards */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} className="h-[320px] w-full rounded-2xl sm:rounded-3xl lg:h-[420px]" />
        ))}
      </div>

      {/* Solutions section heading */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:gap-16 sm:px-6 sm:py-12">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <Bar className="h-px w-16 sm:w-24 md:w-40" />
          <Bar className="h-6 w-48" />
          <Bar className="h-px w-16 sm:w-24 md:w-40" />
        </div>

        {/* Solution cards */}
        <div className="flex flex-col gap-14 sm:gap-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-6 lg:flex-row sm:gap-10">
              <div className="flex w-full flex-col gap-3 lg:w-1/2 sm:gap-4">
                <Bar className="h-8 w-2/3" />
                <Bar className="h-16 w-full" />
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Bar key={j} className="h-4 w-5/6" />
                  ))}
                </div>
              </div>
              <Bar className="aspect-[16/10] w-full rounded-2xl lg:w-1/2 sm:rounded-3xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-10 sm:gap-16 sm:px-6 sm:py-16">
        <div className="flex items-center gap-3 sm:gap-5">
          <Bar className="h-px w-16 sm:w-24 md:w-40" />
          <Bar className="h-6 w-64" />
          <Bar className="h-px w-16 sm:w-24 md:w-40" />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bar key={i} className="h-[220px] rounded-2xl sm:rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Bar className="h-[260px] w-full rounded-[28px] sm:h-[300px] sm:rounded-[36px] md:rounded-[48px]" />
      </div>
    </div>
  );
}