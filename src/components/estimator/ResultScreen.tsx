import { TrendingUp, Info } from 'lucide-react';
import type { PriceEstimate, FormData } from '../../types/estimator';
import { formatCurrency } from '../../utils/pricing';
import { brand } from '../../config/brand';

interface Props {
  estimate: PriceEstimate;
  formData: FormData;
  onContinue: () => void;
}

const conditionLabel: Record<string, string> = {
  good: 'Good condition',
  medium: 'Average condition',
  bad: 'Poor condition',
};

export function ResultScreen({ estimate, formData, onContinue }: Props) {
  const items = [
    { label: 'Project type', value: formData.projectType === 'interior' ? 'Interior' : 'Exterior' },
    { label: 'Area size', value: `${formData.areaSize} m²` },
    { label: 'Surface condition', value: conditionLabel[formData.surfaceCondition ?? ''] ?? '' },
    { label: 'Number of coats', value: `${formData.numCoats} coat${formData.numCoats !== 1 ? 's' : ''}` },
  ];

  const extras = [
    formData.extras.primer && 'Primer',
    formData.extras.repairs && 'Wall repairs',
    formData.extras.ceiling && 'Ceiling',
  ].filter(Boolean) as string[];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.30)',
            boxShadow: '0 0 24px rgba(245,158,11,0.15)',
          }}
        >
          <TrendingUp className="w-8 h-8 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Your Estimate is Ready</h2>
        <p className="text-white/45 text-sm">Based on the details you provided</p>
      </div>

      <div
        className="relative rounded-2xl p-6 text-white text-center mb-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))`,
          boxShadow: `0 12px 40px rgba(245, 158, 11, 0.35)`,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="relative">
          <p className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wide">Estimated Cost</p>
          <p className="text-4xl font-bold mb-1">
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </p>
          <p className="text-xs opacity-70 mt-2 flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Final price may vary after inspection
          </p>
        </div>
      </div>

      <div
        className="rounded-2xl p-4 mb-6 space-y-2.5"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
        }}
      >
        {items.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-white/45">{label}</span>
            <span className="font-medium text-white/85">{value}</span>
          </div>
        ))}
        {extras.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-white/45">Extras</span>
            <span className="font-medium text-white/85">{extras.join(', ')}</span>
          </div>
        )}
      </div>

      <button
        onClick={onContinue}
        className="relative w-full py-4 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] text-lg overflow-hidden"
        style={{
          background: 'var(--brand-primary)',
          boxShadow: '0 4px 24px rgba(245, 158, 11, 0.35)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        {brand.copy.resultCta}
      </button>
      <p className="text-xs text-center text-white/30 mt-3">
        {brand.copy.privacyNote}
      </p>
    </div>
  );
}
