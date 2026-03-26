import type { NumCoats } from '../../types/estimator';

interface Props {
  value: NumCoats | null;
  onChange: (value: NumCoats) => void;
}

const options: { value: NumCoats; label: string; desc: string; surcharge: string; badge?: string }[] = [
  { value: 1, label: '1 Coat', desc: 'Light coverage, touch-up jobs.', surcharge: 'Base price' },
  {
    value: 2,
    label: '2 Coats',
    desc: 'Full, even coverage. Standard for most projects.',
    surcharge: '+40%',
    badge: 'Recommended',
  },
  { value: 3, label: '3 Coats', desc: 'Maximum durability and richness of color.', surcharge: '+70%' },
];

export function StepCoats({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">How many coats?</h2>
      <p className="text-white/50 text-sm mb-6">More coats means better coverage and longer-lasting results.</p>
      <div className="flex flex-col gap-3">
        {options.map(({ value: v, label, desc, surcharge, badge }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left hover:scale-[1.01]"
            style={
              value === v
                ? {
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1.5px solid rgba(245, 158, 11, 0.50)',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.12)',
                  }
                : {
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.09)',
                  }
            }
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 transition-all duration-200"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', color: 'white', boxShadow: '0 4px 12px rgba(245,158,11,0.30)' }
                  : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.50)' }
              }
            >
              {v}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-semibold ${value === v ? 'text-white' : 'text-white/80'}`}>{label}</p>
                {badge && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(245, 158, 11, 0.18)',
                      color: '#FCD34D',
                      border: '1px solid rgba(245, 158, 11, 0.35)',
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <p className={`text-sm mt-0.5 ${value === v ? 'text-white/60' : 'text-white/40'}`}>{desc}</p>
            </div>
            <span className={`text-sm font-semibold flex-shrink-0 ${value === v ? 'text-amber-300' : 'text-white/30'}`}>
              {surcharge}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
