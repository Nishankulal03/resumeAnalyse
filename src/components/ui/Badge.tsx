interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export function Badge({ text, variant = 'info' }: BadgeProps) {
  const variants = {
    success: 'bg-gradient-to-r from-green-200 to-emerald-300 text-emerald-800',
    warning: 'bg-gradient-to-r from-yellow-200 to-amber-300 text-amber-800',
    error: 'bg-gradient-to-r from-red-200 to-rose-300 text-rose-800',
    info: 'bg-gradient-to-r from-blue-200 to-indigo-300 text-indigo-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${variants[variant]}`}>
      {text}
    </span>
  );
}