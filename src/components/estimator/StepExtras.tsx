import { Droplets, Wrench, LayoutTemplate, DoorClosed, PenTool, Waves, Palette } from 'lucide-react';
import type { FormData } from '../../types/estimator';

type Extras = FormData['extras'];

interface Props {
  value: Extras;
  onChange: (value: Extras) => void;
}

const options: { key: keyof Extras; label: string; desc: string; surcharge: string; Icon: React.ElementType }[] = [
  { key: 'primer', label: 'Primer Coat', desc: 'Improves adhesion and color accuracy.', surcharge: '+10%', Icon: Droplets },
  { key: 'repairs', label: 'Drywall Repairs', desc: 'Filling cracks, holes, and surface defects.', surcharge: '+20%', Icon: Wrench },
  { key: 'ceiling', label: 'Ceiling Painting', desc: 'Include ceiling surface in the quote.', surcharge: '+15%', Icon: LayoutTemplate },
  { key: 'trim', label: 'Trim & Baseboards', desc: 'Detailed painting around edges and floors.', surcharge: '+10%', Icon: PenTool },
  { key: 'doors', label: 'Door Painting', desc: 'Painting frames and individual doors.', surcharge: '+15%', Icon: DoorClosed },
  { key: 'pressure_washing', label: 'Pressure Washing', desc: 'Exterior surface cleaning before painting.', surcharge: '+12%', Icon: Waves },
  { key: 'color_consultation', label: 'Color Consultation', desc: 'Expert color selection guidance.', surcharge: '+5%', Icon: Palette },
];

export function StepExtras({ value, onChange }: Props) {
  const toggle = (key: keyof Extras) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">Any additional services needed?</h2>
      <p className="text-white/50 text-sm mb-6">Select any extras you require. You can skip this step.</p>
      <div className="flex flex-col gap-3">
        {options.map(({ key, label, desc, surcharge, Icon }) => {
          const checked = value[key];
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left hover:scale-[1.01]"
              style={
                checked
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
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={
                  checked
                    ? { background: 'var(--brand-primary)', boxShadow: '0 4px 12px rgba(204,0,0,0.30)' }
                    : { background: 'rgba(255,255,255,0.08)' }
                }
              >
                <Icon className={`w-5 h-5 ${checked ? 'text-white' : 'text-white/50'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold ${checked ? 'text-white' : 'text-white/80'}`}>{label}</p>
                <p className={`text-sm mt-0.5 ${checked ? 'text-white/60' : 'text-white/40'}`}>{desc}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm font-semibold" style={{ color: checked ? '#FF8888' : 'rgba(255,255,255,0.30)' }}>
                  {surcharge}
                </span>
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200"
                  style={
                    checked
                      ? { background: 'var(--brand-primary)', border: '2px solid var(--brand-primary)' }
                      : { border: '2px solid rgba(255,255,255,0.20)' }
                  }
                >
                  {checked && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
