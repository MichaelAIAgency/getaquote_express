import { Loader2, Calculator, Search, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: Props) {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: 'Analyzing property details...', Icon: Search },
    { text: 'Calculating area and material costs...', Icon: Calculator },
    { text: 'Applying quality and urgency configurations...', Icon: ShieldCheck },
    { text: 'Generating final estimate...', Icon: Loader2 },
  ];

  useEffect(() => {
    // 10 seconds total: 4 stages roughly 2.5s each
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
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1.5px solid rgba(245, 158, 11, 0.35)'
        }}
      >
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-amber-400 border-l-amber-400 animate-spin opacity-50" />
        <CurrentIcon className={`w-10 h-10 text-amber-500 ${stage === 3 ? 'animate-spin' : 'animate-pulse'}`} />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-3">Calculating Estimate</h2>
      <p className="text-amber-400/90 text-sm mb-8 h-5 font-medium flex items-center gap-2 justify-center">
        {stages[stage]?.text}
      </p>

      <div className="w-full max-w-xs bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-full bg-amber-500 transition-all duration-[2500ms] ease-linear"
          style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
