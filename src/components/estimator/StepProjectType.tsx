import { Home, Building2, ArrowLeftRight, Fence, UtensilsCrossed, DoorOpen } from 'lucide-react';
import type { ProjectType } from '../../types/estimator';

interface Props {
  value: ProjectType | null;
  onChange: (value: ProjectType) => void;
}

const options: { value: ProjectType; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: 'interior', label: 'Interior Only', desc: 'Rooms, walls, ceilings inside', Icon: Home },
  { value: 'exterior', label: 'Exterior Only', desc: 'Siding, trim, and outdoor surfaces', Icon: Building2 },
  { value: 'both', label: 'Both Interior & Exterior', desc: 'Full home painting project', Icon: ArrowLeftRight },
  { value: 'deck_fence', label: 'Deck & Fence Staining', desc: 'Wood staining and sealing', Icon: Fence },
  { value: 'cabinets', label: 'Kitchen Cabinets', desc: 'Cabinet refinishing or repainting', Icon: UtensilsCrossed },
  { value: 'stained_doors', label: 'Stained Doors', desc: 'Door staining and finishing', Icon: DoorOpen },
];

export function StepProjectType({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What areas need painting?</h2>
      <p className="text-white/50 text-sm mb-6">Select the primary type of painting work needed.</p>
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
