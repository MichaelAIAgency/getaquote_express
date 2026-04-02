import { Ruler } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

const presets: { label: string; value: string }[] = [
  { label: 'Under 500 sq ft', value: '400' },
  { label: '500–1,000 sq ft', value: '750' },
  { label: '1,000–2,000 sq ft', value: '1500' },
  { label: '2,000–3,500 sq ft', value: '2750' },
  { label: '3,500+ sq ft', value: '4000' },
];

export function StepAreaSize({ value, onChange, error }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What's the approximate size of the area?</h2>
      <p className="text-white/50 text-sm mb-6">Select the range that best matches your project size.</p>

      <div className="flex flex-col gap-3 mb-5">
        {presets.map(({ label, value: v }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left hover:scale-[1.01]"
            style={
              value === v
                ? {
                    background: 'rgba(204, 0, 0, 0.15)',
                    border: '1.5px solid rgba(204, 0, 0, 0.50)',
                    boxShadow: '0 0 20px rgba(204, 0, 0, 0.12)',
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.09)',
                  }
            }
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', boxShadow: '0 4px 12px rgba(204,0,0,0.30)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              <Ruler className={`w-4 h-4 ${value === v ? 'text-white' : 'text-white/50'}`} />
            </div>
            <p className="font-semibold" style={{ color: value === v ? '#FF8888' : 'rgba(255,255,255,0.80)' }}>
              {label}
            </p>
            {value === v && (
              <span className="ml-auto flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: 'var(--brand-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
          <Ruler className="w-4 h-4" />
        </div>
        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter exact sq ft"
          className={`w-full pl-11 pr-20 py-3 text-base rounded-2xl glass-input ${error ? 'glass-input-error' : ''}`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-medium text-xs">sq ft</span>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
