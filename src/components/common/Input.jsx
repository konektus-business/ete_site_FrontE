export default function Input({
  as = "input",
  className = "",
  error,
  label,
  ...props
}) {
  const Component = as;

  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      {label}
      <Component
        className={`rounded-md border border-slate-200 px-3 py-2 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-normal text-red-500">{error}</span>}
    </label>
  );
}
