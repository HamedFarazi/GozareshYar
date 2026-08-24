import type { ReactNode } from 'react';
import { SectionHeader } from './SectionHeader';

interface FormSectionProps {
  title: string;
  icon: ReactNode;
  description?: string;
  children: ReactNode;
}

export function FormSection({ title, icon, description, children }: FormSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6">
        <SectionHeader 
          icon={icon}
          title={title}
          description={description}
        />
        <div className="space-y-5">
          {children}
        </div>
      </div>
    </div>
  );
}