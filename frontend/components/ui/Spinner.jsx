export default function Spinner({ size = 20, className = "" }) {
  const border = Math.max(2, Math.floor(size / 10));
  return (
    <div
      className={`inline-block animate-spin rounded-full border-${border} border-zinc-200 border-t-blue-600 ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}