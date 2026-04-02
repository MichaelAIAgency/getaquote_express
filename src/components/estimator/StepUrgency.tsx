import { Calendar, CalendarClock, Clock, Zap } from 'lucide-react';
import type { Urgency } from '../../types/estimator';

interface Props {
  value: Urgency | null;
  onChange: (value: Urgency) => void;
}

export function StepUrgency({ value, onChange }: Props) {
  const options: { value: Urgency; label: string; desc: string; Icon: React.ElementType; color: string }[] = [
    { value: 'flexible', label: 'Flexible', desc: 'Best pricing — anytime in the next few months', Icon: Calendar, color: 'text-blue-400' },
    { value: 'one_month', label: 'Within 1 Month', desc: 'Starting to plan in the near future', Icon: Clock, color: 'text-green-400' },
    { value: 'two_weeks', label: 'Within 2 Weeks', desc: 'Looking to start fairly soon', Icon: CalendarClock, color: 'text-yellow-400' },
    { value: 'asap', label: 'ASAP (Rush)', desc: 'Need this done immediately', Icon: Zap, color: 'text-red-400' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-1">When do you need this project completed?</h2>
      <p className="text-white/50 text-sm mb-6">Your timeline affects scheduling and pricing.</p>
      <div className="grid grid-cols-1 gap-3">
        {options.map(({ value: v, label, desc, Icon, color }) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left cursor-pointer group hover:scale-[1.01]"
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
                className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--brand-primary)' }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0"
              style={
                value === v
                  ? { background: 'var(--brand-primary)', boxShadow: '0 4px 16px rgba(204,0,0,0.35)' }
                  : { background: 'rgba(255,255,255,0.08)' }
              }
            >
              <Icon className={`w-5 h-5 ${value === v ? 'text-white' : `${color} group-hover:text-white/80`}`} />
            </div>
            <div className="pr-8">
              <p className="font-semibold text-sm" style={{ color: value === v ? '#FF8888' : 'rgba(255,255,255,0.80)' }}>
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
