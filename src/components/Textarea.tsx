import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export function Textarea({ label, id, helperText, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
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
          resize-y
          min-h-[140px]
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${className}
        `}
      />
      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
}