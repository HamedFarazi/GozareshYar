interface GenderSelectorProps {
  label: string;
  value: 'آقای' | 'خانم';
  onChange: (value: 'آقای' | 'خانم') => void;
}

export function GenderSelector({ label, value, onChange }: GenderSelectorProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50/50 p-1 gap-1">
        <button
          type="button"
          onClick={() => onChange('آقای')}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all duration-150
            ${value === 'آقای'
              ? 'gender-selector-selected'
              : 'gender-selector-unselected'
            }
          `}
        >
          آقای
        </button>
        <button
          type="button"
          onClick={() => onChange('خانم')}
          className={`
            px-6 py-3 rounded-lg text-sm font-medium transition-all duration-150
            ${value === 'خانم'
              ? 'gender-selector-selected'
              : 'gender-selector-unselected'
            }
          `}
        >
          خانم
        </button>
      </div>
    </div>
  );
}