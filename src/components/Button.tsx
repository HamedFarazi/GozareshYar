import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'gradient';
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';
  
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-5 py-3.5 text-base',
    lg: 'px-6 py-4 text-base',
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 focus:ring-offset-0 shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:ring-gray-400 focus:ring-offset-0',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 focus:ring-offset-0 shadow-sm',
    success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 focus:ring-offset-0 shadow-sm',
    gradient: 'gradient-button',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      {...props}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}