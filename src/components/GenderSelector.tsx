interface GenderSelectorProps {
  label: string;
  value: 'آقای' | 'خانم';
  onChange: (value: 'آقای' | 'خانم') => void;
}

export function GenderSelector({ label, value, onChange }: GenderSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange('آقای')}
          className={`flex-1 px-4 py-2 rounded-md border-2 transition-all ${
            value === 'آقای'
              ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }`}
        >
          آقای
        </button>
        <button
          type="button"
          onClick={() => onChange('خانم')}
          className={`flex-1 px-4 py-2 rounded-md border-2 transition-all ${
            value === 'خانم'
              ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
          }`}
        >
          خانم
        </button>
      </div>
    </div>
  );
}
