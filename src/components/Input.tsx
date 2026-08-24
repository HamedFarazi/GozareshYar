import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  suffix?: string;
  isTimeInput?: boolean;
}

export function Input({ label, id, helperText, suffix, isTimeInput, className = '', ...props }: InputProps) {
  // For time inputs, add step="60" to encourage 24-hour format
  const timeProps = isTimeInput ? { step: "60", pattern: "[0-9]{2}:[0-9]{2}" } : {};
  
  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...timeProps}
          {...props}
          className={`
            premium-input
            w-full
            text-gray-900
            placeholder:text-gray-400
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${suffix ? 'pr-14' : ''}
            ${className}
          `}
        />
        {suffix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <span className="sales-pill">
              {suffix}
            </span>
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
      {isTimeInput && (
        <p className="text-xs text-blue-600 font-medium">
          فرمت ۲۴ ساعته (مثال: 14:30)
        </p>
      )}
    </div>
  );
}