import { Ruler } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export function StepAreaSize({ value, onChange, error }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What is the total area?</h2>
      <p className="text-white/50 text-sm mb-6">Enter the total surface area to be painted in square meters.</p>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
          <Ruler className="w-5 h-5" />
        </div>
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. 120"
          className={`w-full pl-12 pr-16 py-4 text-lg rounded-2xl glass-input ${error ? 'glass-input-error' : ''}`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-medium text-sm">m²</span>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[50, 100, 150, 200, 300, 500].map((size) => (
          <button
            key={size}
            onClick={() => onChange(String(size))}
            className="py-2 px-3 rounded-xl text-sm font-medium transition-all duration-150"
            style={
              value === String(size)
                ? {
                    background: 'rgba(245, 158, 11, 0.20)',
                    border: '1.5px solid rgba(245, 158, 11, 0.55)',
                    color: '#FCD34D',
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.10)',
                    color: 'rgba(255,255,255,0.55)',
                  }
            }
          >
            {size} m²
          </button>
        ))}
      </div>
    </div>
  );
}
