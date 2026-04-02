import { Home, Building2, Building, Store } from 'lucide-react';
import type { PropertyType } from '../../types/estimator';

interface Props {
  value: PropertyType | null;
  onChange: (value: PropertyType) => void;
}

const options: { value: PropertyType; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: 'single_family', label: 'Single Family Home', desc: 'Standalone house or bungalow', Icon: Home },
  { value: 'condo', label: 'Condo / Apartment', desc: 'Unit inside a larger building', Icon: Building2 },
  { value: 'townhouse', label: 'Townhouse', desc: 'Multi-floor attached home', Icon: Building },
  { value: 'commercial', label: 'Commercial Property', desc: 'Office, retail, or warehouse', Icon: Store },
];

export function StepPropertyType({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What type of property are we painting?</h2>
      <p className="text-white/50 text-sm mb-6">Select the type of property for this project.</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map(({ value: v, label, desc, Icon }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 text-center cursor-pointer group hover:scale-[1.02]"
            style={
              value === v
                ? {
                    background: 'rgba(204, 0, 0, 0.16)',
                    border: '1.5px solid rgba(204, 0, 0, 0.55)',
                    boxShadow: '0 0 24px rgba(204, 0, 0, 0.15)',
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.10)',
                  }
            }
          >
            {value === v && (
              <span
                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--brand-primary)' }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', boxShadow: '0 4px 16px rgba(204,0,0,0.35)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              <Icon className={`w-6 h-6 ${value === v ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight" style={{ color: value === v ? '#FF8888' : 'rgba(255,255,255,0.80)' }}>
                {label}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
