const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

export default function ContactSkeleton() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <div className="relative min-h-[820px] w-full overflow-hidden bg-[#0A1A17] sm:min-h-[941px]">
        <div className="relative z-10 mx-auto flex w-full max-w-[1248px] flex-col items-center gap-9 px-5 pb-16 pt-28 sm:gap-[46px] sm:px-8 sm:pt-40 lg:px-0 lg:pt-[206px]">
          <div className="flex w-full flex-col items-center gap-4 text-center sm:gap-5">
            <Bar className="h-10 w-full max-w-[520px] bg-white/10 sm:h-12" />
            <Bar className="h-7 w-full max-w-[726px] bg-white/10" />
            <Bar className="mt-2 h-14 w-full max-w-[307px] rounded-full bg-white/10 sm:h-[62px]" />
          </div>

          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <Bar key={i} className="h-[340px] w-full max-w-[560px] rounded-3xl bg-white/10 sm:h-[378px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Offices */}
      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[1253px] flex-col gap-10 px-5 sm:mt-24 sm:gap-[62px] sm:px-8 lg:mt-[115px] lg:px-0">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Bar className="h-9 w-56" />
          <Bar className="h-6 w-full max-w-[520px]" />
        </div>
        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:flex lg:items-center lg:gap-[41px]">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bar key={i} className="h-[380px] w-full max-w-[389px] rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-5 mt-20 mb-16 flex min-h-[220px] items-center justify-center overflow-hidden rounded-3xl py-10 sm:mx-8 sm:mt-28 sm:mb-24 sm:min-h-[280px] lg:mx-[86px] lg:mt-40 lg:mb-32">
        <div className="flex flex-col items-center gap-6 px-4 sm:gap-[34px]">
          <Bar className="h-9 w-full max-w-[640px] sm:h-11" />
          <Bar className="h-14 w-64 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}