import { CheckCircle2, Clock, Phone, FileText } from 'lucide-react';
import { brand } from '../../config/brand';

interface Props {
  conditionReport: string | null;
}

export function ThankYou({ conditionReport }: Props) {
  return (
    <div className="animate-fade-in text-center py-6">
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
        style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 0 32px rgba(16, 185, 129, 0.20)',
        }}
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{brand.copy.thankYouTitle}</h2>
      <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
        {brand.copy.thankYouSubtitle}
      </p>

      {conditionReport && (
        <div
          className="rounded-2xl p-4 text-left mb-5"
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
          <p className="text-xs text-white/30 mt-2">Sent to the contractor with your lead details.</p>
        </div>
      )}

      <div
        className="rounded-2xl p-5 text-left space-y-4 mb-6"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(204, 0, 0, 0.15)' }}
          >
            <Clock className="w-4 h-4" style={{ color: '#CC0000' }} />
          </div>
          <div>
            <p className="font-semibold text-white/85 text-sm">
              Response within {brand.copy.responseTime}
            </p>
            <p className="text-xs text-white/40 mt-0.5">{brand.copy.responseTimeNote}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(204, 0, 0, 0.15)' }}
          >
            <Phone className="w-4 h-4" style={{ color: '#CC0000' }} />
          </div>
          <div>
            <p className="font-semibold text-white/85 text-sm">{brand.copy.phoneCta}</p>
            <p className="text-xs text-white/40 mt-0.5">
              Call us directly at{' '}
              <a
                href={`tel:${brand.phone}`}
                className="font-medium transition-colors"
                style={{ color: '#CC0000' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#AA0000')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#CC0000')}
              >
                {brand.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-white/25">{brand.copy.privacyNote}</p>
    </div>
  );
}
