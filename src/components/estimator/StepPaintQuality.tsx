import { ShieldCheck, Star, Sparkles } from 'lucide-react';
import type { PaintQuality } from '../../types/estimator';

interface Props {
  value: PaintQuality | null;
  onChange: (value: PaintQuality) => void;
}

export function StepPaintQuality({ value, onChange }: Props) {
  const options: { value: PaintQuality; label: string; desc: string; Icon: React.ElementType; color: string }[] = [
    { value: 'standard', label: 'Standard', desc: 'Durable, quality finish for everyday wear', Icon: ShieldCheck, color: 'text-blue-400' },
    { value: 'premium', label: 'Premium', desc: 'Enhanced washability and great coverage', Icon: Star, color: 'text-yellow-400' },
    { value: 'ultra_premium', label: 'Ultra Premium', desc: 'The finest finish, rich color, best longevity', Icon: Sparkles, color: 'text-rose-400' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What paint quality level do you prefer?</h2>
      <p className="text-white/50 text-sm mb-6">Which grade of paint should we use for this project?</p>
      <div className="grid grid-cols-1 gap-4">
        {options.map(({ value: v, label, desc, Icon, color }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01]"
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
                className="absolute top-1/2 right-5 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--brand-primary)' }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', boxShadow: '0 4px 16px rgba(204,0,0,0.35)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              <Icon className={`w-6 h-6 ${value === v ? 'text-white' : `${color} group-hover:text-white/80`}`} />
            </div>
            <div className="pr-8">
              <p className="font-semibold text-base" style={{ color: value === v ? '#FF8888' : 'rgba(255,255,255,0.80)' }}>
                {label}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/35 mt-4 text-center">
        We use top brands including Sherwin-Williams and Benjamin Moore
      </p>
    </div>
  );
}
