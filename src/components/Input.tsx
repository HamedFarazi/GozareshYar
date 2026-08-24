import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  suffix?: string;
}

export function Input({ label, id, helperText, suffix, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={`
            w-full px-4 py-3 
            border border-gray-200 
            rounded-xl 
            bg-white
            text-gray-900
            text-base
            placeholder:text-gray-400
            focus:border-blue-500 
            focus:ring-2 focus:ring-blue-100 
            focus:outline-none
            transition-all duration-150
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${suffix ? 'pr-12' : ''}
            ${className}
          `}
        />
        {suffix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}