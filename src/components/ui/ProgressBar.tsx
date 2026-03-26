interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isDone = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isDone
                    ? 'text-white'
                    : isActive
                    ? 'text-white'
                    : 'text-white/30'
                }`}
                style={
                  isDone
                    ? { background: 'var(--brand-primary)', boxShadow: '0 0 12px rgba(245,158,11,0.40)' }
                    : isActive
                    ? {
                        background: 'var(--brand-primary)',
                        boxShadow: '0 0 0 4px rgba(245,158,11,0.20), 0 0 16px rgba(245,158,11,0.35)',
                      }
                    : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }
                }
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.10)' }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, var(--brand-gradient-from), var(--brand-gradient-to))',
            boxShadow: '0 0 8px rgba(245,158,11,0.50)',
          }}
        />
      </div>

      <p className="text-xs text-white/35 mt-2 text-right">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
