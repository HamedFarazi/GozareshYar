import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
}

export function Textarea({ label, id, helperText, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={`
          premium-input
          w-full
          text-gray-900
          placeholder:text-gray-400
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