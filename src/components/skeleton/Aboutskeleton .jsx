const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function AboutSkeleton() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero */}
      <div className="mx-auto flex max-w-[1440px] flex-col px-5 pt-[140px] sm:px-12 sm:pt-[200px] lg:px-24">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex max-w-[601px] flex-col items-center gap-8 lg:items-start">
            <div className="flex w-full flex-col gap-6 sm:gap-7">
              <div className="flex w-full flex-col gap-3">
                <Bar className="h-9 w-full max-w-[520px]" />
                <Bar className="h-9 w-3/4 max-w-[400px]" />
              </div>
              <Bar className="h-24 w-full" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Bar className="h-9 w-40 rounded-full" />
              <Bar className="h-9 w-48 rounded-full" />
            </div>
          </div>
          <Bar className="size-[220px] shrink-0 rounded-full sm:size-[300px] lg:size-[376px]" />
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-16 flex w-full min-h-[380px] items-center justify-center overflow-hidden py-16 sm:min-h-[480px] sm:py-24 lg:py-32">
        <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-wrap items-start justify-center gap-x-6 gap-y-10 px-6 sm:gap-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 basis-[45%] sm:basis-auto">
              <Bar className="h-12 w-24 sm:h-16 sm:w-28" />
              <Bar className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-20 px-5 pb-20 sm:gap-32 sm:px-12 sm:pb-32 lg:px-24 mt-16">
        {/* Mission slider */}
        <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-[500px] flex-col gap-4">
            <Bar className="h-8 w-64" />
            <Bar className="h-24 w-full" />
          </div>
          <div className="flex w-full max-w-[549px] items-center justify-between gap-3 sm:gap-4">
            <Bar className="size-6 shrink-0 rounded-full" />
            <Bar className="h-[280px] w-full rounded-[20px] sm:h-[412px] sm:w-[447px] sm:rounded-[30px]" />
            <Bar className="size-6 shrink-0 rounded-full" />
          </div>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-10 sm:gap-16">
          <Bar className="mx-auto h-8 w-48 sm:mx-0" />
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Bar key={i} className="h-[220px] w-full max-w-[336px] rounded-xl" />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:-mt-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Bar key={i} className="h-[220px] w-full max-w-[336px] rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="flex flex-col gap-8 sm:gap-11">
          <div className="flex flex-col gap-3 sm:gap-4">
            <Bar className="mx-auto h-8 w-72 sm:mx-0" />
            <Bar className="mx-auto h-5 w-full max-w-md sm:mx-0" />
          </div>
          <div className="flex flex-col items-center gap-9 sm:items-end">
            <Bar className="h-5 w-36" />
            <div className="grid w-full grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Bar key={i} className="aspect-[271/326] w-full max-w-[271px] mx-auto rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Bar className="h-[260px] w-full rounded-[32px] sm:h-[320px] sm:rounded-[64px]" />
      </div>
    </div>
  );
}