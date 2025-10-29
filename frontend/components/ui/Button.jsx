export default function Button({ className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const color = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600";
  return (
    <button className={`${base} ${color} ${className}`} {...props}>
      {children}
    </button>
  );
}