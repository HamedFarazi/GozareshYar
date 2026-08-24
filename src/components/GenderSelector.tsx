interface GenderSelectorProps {
  label: string;
  value: 'آقای' | 'خانم';
  onChange: (value: 'آقای' | 'خانم') => void;
}

export function GenderSelector({ label, value, onChange }: GenderSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => onChange('آقای')}
          className={`
            px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
            ${value === 'آقای'
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }
          `}
        >
          آقای
        </button>
        <button
          type="button"
          onClick={() => onChange('خانم')}
          className={`
            px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
            ${value === 'خانم'
              ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }
          `}
        >
          خانم
        </button>
      </div>
    </div>
  );
}