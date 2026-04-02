import { CheckCircle2, AlertCircle, ShieldAlert, XCircle } from 'lucide-react';
import type { SurfaceCondition } from '../../types/estimator';

interface Props {
  value: SurfaceCondition | null;
  onChange: (value: SurfaceCondition) => void;
}

const options: {
  value: SurfaceCondition;
  label: string;
  desc: string;
  surcharge: string;
  Icon: React.ElementType;
  iconColor: string;
  activeStyle: React.CSSProperties;
  activeSurchargeColor: string;
}[] = [
  {
    value: 'excellent',
    label: 'Excellent',
    desc: 'Like-new surfaces, minor touch-ups only.',
    surcharge: 'Base price',
    Icon: CheckCircle2,
    iconColor: 'text-emerald-400',
    activeStyle: {
      background: 'rgba(16, 185, 129, 0.14)',
      border: '1.5px solid rgba(16, 185, 129, 0.50)',
      boxShadow: '0 0 20px rgba(16, 185, 129, 0.12)',
    },
    activeSurchargeColor: 'text-emerald-400',
  },
  {
    value: 'good',
    label: 'Good',
    desc: 'Clean surfaces, standard prep needed.',
    surcharge: '+10%',
    Icon: AlertCircle,
    iconColor: 'text-blue-400',
    activeStyle: {
      background: 'rgba(59, 130, 246, 0.14)',
      border: '1.5px solid rgba(59, 130, 246, 0.50)',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.12)',
    },
    activeSurchargeColor: 'text-blue-400',
  },
  {
    value: 'fair',
    label: 'Fair',
    desc: 'Some cracks or imperfections, repairs needed.',
    surcharge: '+20%',
    Icon: ShieldAlert,
    iconColor: 'text-yellow-400',
    activeStyle: {
      background: 'rgba(234, 179, 8, 0.14)',
      border: '1.5px solid rgba(234, 179, 8, 0.50)',
      boxShadow: '0 0 20px rgba(234, 179, 8, 0.12)',
    },
    activeSurchargeColor: 'text-yellow-400',
  },
  {
    value: 'poor',
    label: 'Poor',
    desc: 'Significant damage, major prep/repairs required.',
    surcharge: '+35%',
    Icon: XCircle,
    iconColor: 'text-red-400',
    activeStyle: {
      background: 'rgba(239, 68, 68, 0.14)',
      border: '1.5px solid rgba(239, 68, 68, 0.50)',
      boxShadow: '0 0 20px rgba(239, 68, 68, 0.12)',
    },
    activeSurchargeColor: 'text-red-400',
  },
];

export function StepSurfaceCondition({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">What's the current condition of the surfaces?</h2>
      <p className="text-white/50 text-sm mb-6">This helps us account for any prep work required.</p>
      <div className="flex flex-col gap-3">
        {options.map(({ value: v, label, desc, surcharge, Icon, iconColor, activeStyle, activeSurchargeColor }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left hover:scale-[1.01]"
            style={
              value === v
                ? activeStyle
                : { background: 'rgba(255, 255, 255, 0.05)', border: '1.5px solid rgba(255, 255, 255, 0.09)' }
            }
          >
            <Icon className={`w-7 h-7 flex-shrink-0 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${value === v ? 'text-white' : 'text-white/80'}`}>{label}</p>
              <p className={`text-sm mt-0.5 ${value === v ? 'text-white/60' : 'text-white/40'}`}>{desc}</p>
            </div>
            <span className={`text-sm font-semibold flex-shrink-0 ${value === v ? activeSurchargeColor : 'text-white/30'}`}>
              {surcharge}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
