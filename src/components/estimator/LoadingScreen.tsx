import { Loader2, Calculator, Search, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { brand } from '../../config/brand';

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: 'Analyzing property details...', Icon: Search },
    { text: 'Calculating area and material costs...', Icon: Calculator },
    { text: 'Checking Middle Tennessee pricing data...', Icon: MapPin },
    { text: 'Generating your Nashville estimate...', Icon: Loader2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => {
        if (s < stages.length - 1) return s + 1;
        return s;
      });
    }, 2500);

    const timeout = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete, stages.length]);

  const CurrentIcon = stages[stage]?.Icon || Loader2;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
        style={{
          background: 'rgba(204, 0, 0, 0.15)',
          border: '1.5px solid rgba(204, 0, 0, 0.35)',
        }}
      >
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent animate-spin opacity-50"
          style={{ borderTopColor: '#CC0000', borderLeftColor: '#CC0000' }}
        />
        <CurrentIcon
          className={`w-10 h-10 ${stage === 3 ? 'animate-spin' : 'animate-pulse'}`}
          style={{ color: '#CC0000' }}
        />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">{brand.copy.loadingTitle}</h2>
      <p className="text-sm mb-2 h-5 font-medium flex items-center gap-2 justify-center" style={{ color: 'rgba(204,0,0,0.90)' }}>
        {stages[stage]?.text}
      </p>
      <p className="text-xs text-white/35 mb-8">{brand.copy.loadingSubtext}</p>

      <div className="w-full max-w-xs bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full transition-all duration-[2500ms] ease-linear rounded-full"
          style={{
            width: `${((stage + 1) / stages.length) * 100}%`,
            background: 'var(--brand-primary)',
            boxShadow: '0 0 8px rgba(204,0,0,0.50)',
          }}
        />
      </div>
    </div>
  );
}
