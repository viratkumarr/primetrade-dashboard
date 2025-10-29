export default function Input({ className = "", ...props }) {
  const base = "block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500";
  return <input className={`${base} ${className}`} {...props} />;
}