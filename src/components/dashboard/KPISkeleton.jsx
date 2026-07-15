export default function KPISkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex-1 min-w-[220px] animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-14 bg-gray-200 rounded-full" />
      </div>
      <div className="h-7 w-20 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>
  );
}