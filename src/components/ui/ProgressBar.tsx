interface ProgressBarProps {
  value: number;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export function ProgressBar({ value, variant = 'info' }: ProgressBarProps) {
  const variants = {
    success: 'from-green-500 to-emerald-600',
    warning: 'from-yellow-500 to-amber-600',
    error: 'from-red-500 to-rose-600',
    info: 'from-blue-500 to-indigo-600'
  };

  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${variants[variant]} transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}