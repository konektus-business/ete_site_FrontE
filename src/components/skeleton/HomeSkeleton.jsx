const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function HomeSkeleton() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <div className="flex min-h-[560px] w-full flex-col items-center gap-8 bg-[#0A1A17] px-4 pb-24 pt-28 sm:min-h-[720px] sm:pb-40 sm:pt-40 lg:h-[941px] lg:pb-[260px] lg:pt-[210px]">
        <Bar className="h-8 w-3/4 max-w-[600px] bg-white/10" />
        <Bar className="h-5 w-1/2 max-w-[420px] bg-white/10" />
        <Bar className="h-12 w-full max-w-[319px] rounded-full bg-white/10" />
      </div>

      {/* Dashboard preview */}
      <div className="mx-auto -mt-16 w-full max-w-[92%] sm:-mt-32 lg:-mt-[380px] lg:w-[1264px]">
        <Bar className="h-[220px] w-full rounded-2xl sm:h-[360px] lg:h-[620px]" />
      </div>

      {/* Logo marquee */}
      <div className="mx-auto flex w-full max-w-[1248px] items-center justify-center gap-10 overflow-hidden py-8 sm:py-[54px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Bar key={i} className="h-[40px] w-[110px] shrink-0 sm:h-[55px] sm:w-[149px]" />
        ))}
      </div>

      {/* Konvictions */}
      <div className="mx-auto w-full max-w-[1248px] px-4 py-16 sm:py-20 lg:py-[100px]">
        <Bar className="mb-4 h-8 w-64" />
        <Bar className="mb-10 h-6 w-full max-w-[900px] sm:mb-14 lg:mb-16" />
        <div className="flex flex-col items-stretch gap-6 lg:flex-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bar key={i} className="h-[420px] flex-1 rounded-[24px]" />
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto w-full max-w-[1248px] px-4 py-14 sm:py-16 lg:py-20">
        <Bar className="mb-3 h-4 w-24" />
        <Bar className="mb-3 h-8 w-72" />
        <Bar className="mb-10 h-6 w-full max-w-[770px] sm:mb-16" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bar key={i} className="h-[150px] rounded-[16px] sm:h-[170px] lg:h-[178px]" />
          ))}
        </div>
        {/* Vision */}
        <div className="mt-14 flex flex-col items-center gap-8 sm:gap-12 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <Bar className="h-4 w-32" />
            <Bar className="h-9 w-full max-w-[500px]" />
            <Bar className="h-24 w-full max-w-[619px]" />
            <Bar className="h-10 w-40 rounded-full" />
          </div>
          <Bar className="h-[260px] w-full flex-1 rounded-2xl" />
        </div>
        {/* Feature strip */}
        <div className="mx-auto mt-10 grid max-w-[1024px] grid-cols-1 gap-6 sm:mt-16 sm:gap-8 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bar key={i} className="h-16 rounded-[16px]" />
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mx-auto w-full max-w-[1248px] px-4 py-16 sm:py-20 lg:py-[100px]">
        <Bar className="mb-3 h-4 w-24" />
        <Bar className="mb-3 h-8 w-48" />
        <Bar className="mb-8 h-6 w-full max-w-[576px] sm:mb-10 lg:mb-[54px]" />
        <div className="flex gap-5 overflow-hidden sm:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} className="h-[300px] w-[210px] shrink-0 rounded-[20px] sm:h-[330px] sm:w-[240px] lg:h-[356px] lg:w-[260px]" />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto w-full max-w-[1248px] px-4 py-14 sm:py-20">
        <Bar className="mx-auto mb-10 h-8 w-72 sm:mb-16" />
        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bar key={i} className="h-[220px] flex-1 rounded-[24px]" />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto w-full max-w-[1248px] px-4 py-10 sm:py-[60px]">
        <Bar className="h-[220px] w-full rounded-[24px] sm:h-[260px]" />
      </div>
    </div>
  );
}