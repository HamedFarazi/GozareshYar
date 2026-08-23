import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
