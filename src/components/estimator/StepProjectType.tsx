import { Home, Building2 } from 'lucide-react';
import type { ProjectType } from '../../types/estimator';

interface Props {
  value: ProjectType | null;
  onChange: (value: ProjectType) => void;
}

export function StepProjectType({ value, onChange }: Props) {
  const options: { value: ProjectType; label: string; desc: string; Icon: React.ElementType }[] = [
    { value: 'interior', label: 'Interior', desc: 'Rooms, walls, ceilings inside', Icon: Home },
    { value: 'exterior', label: 'Exterior', desc: 'Facades, fences, outdoor surfaces', Icon: Building2 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What type of project?</h2>
      <p className="text-white/50 text-sm mb-6">Select the primary type of painting work needed.</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map(({ value: v, label, desc, Icon }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-200 text-left cursor-pointer group hover:scale-[1.02]"
            style={
              value === v
                ? {
                    background: 'rgba(245, 158, 11, 0.18)',
                    border: '1.5px solid rgba(245, 158, 11, 0.55)',
                    boxShadow: '0 0 24px rgba(245, 158, 11, 0.15)',
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
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', boxShadow: '0 4px 16px rgba(245,158,11,0.35)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              <Icon className={`w-7 h-7 ${value === v ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
            </div>
            <div>
              <p className={`font-semibold text-base ${value === v ? 'text-amber-300' : 'text-white/80'}`}>{label}</p>
              <p className="text-xs text-white/40 mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
