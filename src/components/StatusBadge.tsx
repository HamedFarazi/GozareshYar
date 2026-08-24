import type { ReactNode } from 'react';

interface StatusBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'info' | 'warning';
  icon?: ReactNode;
}

export function StatusBadge({ children, variant = 'success', icon }: StatusBadgeProps) {
  const variantClasses = {
    success: 'bg-green-50 text-green-700 border-green-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${variantClasses[variant]}`}>
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}