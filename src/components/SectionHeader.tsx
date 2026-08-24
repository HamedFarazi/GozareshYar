import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'cyan';
}

export function SectionHeader({ icon, title, description, color = 'blue' }: SectionHeaderProps) {
  const iconClass = {
    blue: 'icon-container icon-blue',
    green: 'icon-container icon-green',
    purple: 'icon-container icon-purple',
    amber: 'icon-container icon-amber',
    cyan: 'icon-container icon-cyan',
  }[color];

  const titleSize = {
    blue: 'text-[18px]',
    green: 'text-[18px]',
    purple: 'text-[18px]',
    amber: 'text-[18px]',
    cyan: 'text-[18px]',
  }[color];

  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        <div className={iconClass}>
          <div className="w-6 h-6">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h2 className={`font-bold text-gray-900 leading-tight ${titleSize}`}>
            {title}
          </h2>
          {description && (
            <p className="text-[13px] text-gray-600 mt-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}