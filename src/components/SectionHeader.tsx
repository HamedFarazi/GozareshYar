import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  description?: string;
}

export function SectionHeader({ icon, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <div className="text-blue-600">
            {icon}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-600 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4"></div>
    </div>
  );
}