import { useState } from 'react';
import {
  Camera, Loader2, CheckCircle2, AlertCircle,
  Sparkles, ArrowRight, X, Home, Building2,
  Wrench, Droplets, LayoutTemplate, ImagePlus,
} from 'lucide-react';

import type { AiAnalysis } from '../../types/estimator';
import { brand } from '../../config/brand';

interface Props {
  onAnalysisComplete: (photoUrl: string, analysis: AiAnalysis) => void;
  onSkip: () => void;
}

type UploadState = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';

const DETECTED_ITEMS = (a: AiAnalysis) => [
  {
    Icon: a.projectType === 'interior' ? Home : Building2,
    label: 'Project type',
    value: a.projectType === 'interior' ? 'Interior' : 'Exterior',
  },
  {
    Icon: AlertCircle,
    label: 'Surface condition',
    value:
      a.surfaceCondition === 'excellent'
        ? 'Excellent — minimal prep'
        : a.surfaceCondition === 'good'
        ? 'Good — standard prep'
        : a.surfaceCondition === 'fair'
        ? 'Fair — some repairs needed'
        : 'Poor — major prep needed',
  },
  ...(a.needsRepairs ? [{ Icon: Wrench, label: 'Wall repairs', value: 'Repairs likely needed' }] : []),
  ...(a.needsPrimer ? [{ Icon: Droplets, label: 'Primer', value: 'Primer recommended' }] : []),
  ...(a.hasCeiling ? [{ Icon: LayoutTemplate, label: 'Ceiling', value: 'Ceiling in scope' }] : []),
  ...(a.estimatedAreaSqft
    ? [{ Icon: ImagePlus, label: 'Estimated area', value: `~${a.estimatedAreaSqft} sq ft` }]
    : []),
];

const CONFIDENCE_STYLES: Record<AiAnalysis['confidence'], React.CSSProperties> = {
  high: { background: 'rgba(16,185,129,0.18)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.40)' },
  medium: { background: 'rgba(204,0,0,0.18)', color: '#FF8888', border: '1px solid rgba(204,0,0,0.40)' },
  low: { background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.60)', border: '1px solid rgba(255,255,255,0.18)' },
};

const CONFIDENCE_LABELS: Record<AiAnalysis['confidence'], string> = {
  high: '✓ High confidence',
  medium: '~ Medium confidence',
  low: '! Low confidence',
};

export function StepPhotoUpload({ onAnalysisComplete, onSkip }: Props) {
  const [state, setState] = useState<UploadState>('idle');
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const reset = () => {
    setState('idle');
    setPreview(null);
    setAnalysis(null);
    setPhotoUrl(null);
    setErrorMsg('');
  };

  const handleApply = () => {
    if (analysis && photoUrl) onAnalysisComplete(photoUrl, analysis);
  };

  return (
    <div>
      <div className="text-center mb-5">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3"
          style={{
            background: 'rgba(204, 0, 0, 0.15)',
            border: '1px solid rgba(204, 0, 0, 0.35)',
            color: '#FF8888',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{brand.copy.photoUploadTitle}</h2>
        <p className="text-white/50 text-sm">{brand.copy.photoUploadSubtext}</p>
      </div>

      {state === 'idle' && (
        <div className="relative">
          <div
            className="relative rounded-2xl p-8 text-center transition-all duration-200 opacity-40 grayscale"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '2px dashed rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(204, 0, 0, 0.15)' }}
              >
                <Camera className="w-7 h-7" style={{ color: '#CC0000' }} />
              </div>
              <div>
                <p className="font-semibold text-white/85">Drop a photo here</p>
                <p className="text-sm text-white/40 mt-0.5">or tap to browse · JPG, PNG up to 10 MB</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                {['Project type', 'Surface condition', 'Repair needs', 'Primer needs'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="px-4 py-2 rounded-xl backdrop-blur-md font-bold text-sm tracking-wide shadow-2xl flex items-center gap-2"
              style={{
                background: 'rgba(204, 0, 0, 0.90)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                transform: 'rotate(-2deg)',
              }}
            >
              <Wrench className="w-4 h-4" />
              UNDER CONSTRUCTION
            </div>
          </div>
        </div>
      )}

      {(state === 'uploading' || state === 'analyzing') && preview && (
        <div className="rounded-2xl overflow-hidden relative">
          <img src={preview} alt="Preview" className="w-full h-52 object-cover" />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white backdrop-blur-sm"
            style={{ background: 'rgba(8, 11, 18, 0.65)' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(204, 0, 0, 0.20)', border: '1px solid rgba(204, 0, 0, 0.40)' }}
            >
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#CC0000' }} />
            </div>
            <p className="font-semibold text-sm text-white">
              {state === 'uploading' ? 'Uploading photo…' : 'AI is analysing your space…'}
            </p>
            {state === 'analyzing' && (
              <p className="text-xs text-white/50">This takes about 5–10 seconds</p>
            )}
          </div>
        </div>
      )}

      {state === 'done' && analysis && preview && (
        <div className="space-y-3">
          <div className="rounded-2xl overflow-hidden relative">
            <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
            <div className="absolute top-2 right-2">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
                style={CONFIDENCE_STYLES[analysis.confidence]}
              >
                {CONFIDENCE_LABELS[analysis.confidence]}
              </span>
            </div>
            <button
              onClick={reset}
              className="absolute top-2 left-2 w-7 h-7 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.50)' }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className="rounded-2xl p-4 space-y-2.5"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
            }}
          >
            <p className="text-xs font-semibold text-white/35 uppercase tracking-wide">AI Detected</p>
            {DETECTED_ITEMS(analysis).map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-white/45 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </span>
                <span className="font-medium text-white/85 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {state === 'error' && (
        <div
          className="rounded-2xl p-5 text-center"
          style={{
            background: 'rgba(239, 68, 68, 0.09)',
            border: '1.5px solid rgba(239, 68, 68, 0.35)',
          }}
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-sm text-red-300 font-medium">{errorMsg || 'Analysis failed'}</p>
          <button onClick={reset} className="mt-3 text-sm text-red-400/80 underline hover:text-red-300 transition-colors">
            Try again
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2.5">
        {state === 'done' && analysis && (
          <button
            onClick={handleApply}
            className="relative w-full py-3.5 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden"
            style={{
              background: 'var(--brand-primary)',
              boxShadow: '0 4px 20px rgba(204, 0, 0, 0.35)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Sparkles className="w-4 h-4" />
            Apply AI Suggestions
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onSkip}
          className="relative w-full py-3.5 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden mt-2"
          style={{
            background: 'var(--brand-primary)',
            boxShadow: '0 4px 20px rgba(204, 0, 0, 0.35)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          Fill form manually
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
