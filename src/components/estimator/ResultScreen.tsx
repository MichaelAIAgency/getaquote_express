import { TrendingUp, Info, Phone, CheckCircle2, User, FileText } from 'lucide-react';
import type { PriceEstimate, FormData } from '../../types/estimator';
import { formatCurrency } from '../../utils/pricing';
import { brand } from '../../config/brand';

interface Props {
  estimate: PriceEstimate;
  formData: FormData;
  conditionReport: string | null;
}

const formatString = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const conditionLabel: Record<string, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
};

const projectLabel: Record<string, string> = {
  interior: 'Interior Only',
  exterior: 'Exterior Only',
  both: 'Interior & Exterior',
  deck_fence: 'Deck & Fence',
  cabinets: 'Kitchen Cabinets',
  stained_doors: 'Stained Doors',
};

export function ResultScreen({ estimate, formData, conditionReport }: Props) {
  const items = [
    { label: 'Property type', value: formData.propertyType ? formatString(formData.propertyType) : '' },
    { label: 'Project type', value: formData.projectType ? (projectLabel[formData.projectType] ?? formatString(formData.projectType)) : '' },
    { label: 'Area size', value: `${formData.areaSize} sq ft` },
    { label: 'Surface cond.', value: conditionLabel[formData.surfaceCondition ?? ''] ?? '' },
    { label: 'Paint quality', value: formData.paintQuality ? formatString(formData.paintQuality) : '' },
    { label: 'Timeline', value: formData.urgency ? formatString(formData.urgency) : '' },
    { label: 'Coats', value: `${formData.numCoats} coat${formData.numCoats !== 1 ? 's' : ''}` },
  ];

  const extras = [
    formData.extras.primer && 'Primer',
    formData.extras.repairs && 'Drywall Repairs',
    formData.extras.ceiling && 'Ceiling',
    formData.extras.trim && 'Trim/Baseboards',
    formData.extras.doors && 'Doors',
    formData.extras.pressure_washing && 'Pressure Washing',
    formData.extras.color_consultation && 'Color Consult',
  ].filter(Boolean) as string[];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: 'rgba(204, 0, 0, 0.15)',
            border: '1px solid rgba(204, 0, 0, 0.30)',
            boxShadow: '0 0 24px rgba(204,0,0,0.15)',
          }}
        >
          <TrendingUp className="w-8 h-8" style={{ color: '#CC0000' }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{brand.copy.resultTitle}</h2>
        <p className="text-white/45 text-sm">{brand.copy.resultSubtext}</p>
      </div>

      <div
        className="relative rounded-2xl p-6 text-white text-center mb-5 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))',
          boxShadow: '0 12px 40px rgba(204, 0, 0, 0.35)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="relative">
          <p className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wide">Estimated Investment</p>
          <p className="text-4xl font-bold mb-1">
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </p>
          <p className="text-xs opacity-70 mt-2 flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5" />
            {brand.copy.resultDisclaimer}
          </p>
        </div>
      </div>

      <div
        className="rounded-2xl p-4 mb-5 space-y-2.5"
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

      <div
        className="rounded-2xl p-5 mb-5"
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(16, 185, 129, 0.15)' }}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-1">{brand.copy.rickConfirmTitle}</p>
            <p className="text-white/55 text-xs leading-relaxed">{brand.copy.rickConfirmSubtext}</p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 mt-4 pt-4"
          style={{ borderTop: '1px solid rgba(16, 185, 129, 0.15)' }}
        >
          <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-medium text-white/70">Rick Smith — Nashville House Painters</span>
        </div>
      </div>

      {conditionReport && (
        <div
          className="rounded-2xl p-4 mb-5"
          style={{
            background: 'rgba(204, 0, 0, 0.10)',
            border: '1px solid rgba(204, 0, 0, 0.28)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 flex-shrink-0" style={{ color: '#CC0000' }} />
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#FF8888' }}>AI Condition Report</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{conditionReport}</p>
        </div>
      )}

      <a
        href={`tel:${brand.phone}`}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
        style={{
          background: 'rgba(204, 0, 0, 0.12)',
          border: '1px solid rgba(204, 0, 0, 0.30)',
          color: '#FF8888',
        }}
      >
        <Phone className="w-4 h-4" />
        {brand.copy.rickConfirmCta}
      </a>

      <p className="text-xs text-center text-white/25 mt-4">
        {brand.copy.privacyNote}
      </p>
    </div>
  );
}
