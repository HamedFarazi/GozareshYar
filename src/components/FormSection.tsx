import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

interface FormSectionProps {
  title: string;
  icon: ReactNode;
  description?: string;
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'cyan';
  children: ReactNode;
}

export function FormSection({ title, icon, description, color = 'blue', children }: FormSectionProps) {
  const accentClass = {
    blue: 'card-accent-blue',
    green: 'card-accent-green',
    purple: 'card-accent-purple',
    amber: 'card-accent-amber',
    cyan: 'card-accent-cyan',
  }[color];

  return (
    <div className={`premium-card ${accentClass}`}>
      <SectionHeader 
        icon={icon}
        title={title}
        description={description}
        color={color}
      />
      <div className="section-divider"></div>
      <div className="space-y-4 lg:space-y-6 pt-3 lg:pt-4">
        {children}
      </div>
    </div>
  );
}