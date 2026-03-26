import { useState, useRef, useCallback } from 'react';
import {
  Camera, Loader2, CheckCircle2, AlertCircle,
  Sparkles, ArrowRight, X, Home, Building2,
  Wrench, Droplets, LayoutTemplate, ImagePlus,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { AiAnalysis } from '../../types/estimator';

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
      a.surfaceCondition === 'good'
        ? 'Good — minimal prep'
        : a.surfaceCondition === 'medium'
        ? 'Average — minor repairs'
        : 'Poor — major prep needed',
  },
  ...(a.needsRepairs ? [{ Icon: Wrench, label: 'Wall repairs', value: 'Repairs likely needed' }] : []),
  ...(a.needsPrimer ? [{ Icon: Droplets, label: 'Primer', value: 'Primer recommended' }] : []),
  ...(a.hasCeiling ? [{ Icon: LayoutTemplate, label: 'Ceiling', value: 'Ceiling in scope' }] : []),
  ...(a.estimatedAreaM2
    ? [{ Icon: ImagePlus, label: 'Estimated area', value: `~${a.estimatedAreaM2} m²` }]
    : []),
];

const CONFIDENCE_STYLES: Record<AiAnalysis['confidence'], React.CSSProperties> = {
  high: { background: 'rgba(16,185,129,0.18)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.40)' },
  medium: { background: 'rgba(245,158,11,0.18)', color: '#FCD34D', border: '1px solid rgba(245,158,11,0.40)' },
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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (JPG, PNG, etc.)');
      setState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File too large. Please upload an image under 10 MB.');
      setState('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setState('uploading');
    setErrorMsg('');

    try {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lead-photos')
        .upload(fileName, file, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('lead-photos')
        .getPublicUrl(uploadData.path);

      const url = urlData.publicUrl;
      setPhotoUrl(url);

      setState('analyzing');

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-photo`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          Apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error ?? `HTTP ${res.status}`);
      }

      const result = (await res.json()) as AiAnalysis;
      setAnalysis(result);
      setState('done');
    } catch (err) {
      console.error(err);
      setErrorMsg(
        String(err).includes('OPENAI_API_KEY')
          ? 'OpenAI API key not configured yet. You can still fill the form manually.'
          : 'Analysis failed. You can still fill the form manually.'
      );
      setState('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const reset = () => {
    setState('idle');
    setPreview(null);
    setAnalysis(null);
    setPhotoUrl(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
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
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#FCD34D',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Analyze your space</h2>
        <p className="text-white/50 text-sm">Upload a photo and AI will pre-fill the form for you.</p>
      </div>

      {state === 'idle' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
          style={
            isDragging
              ? {
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '2px dashed rgba(245, 158, 11, 0.60)',
                }
              : {
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '2px dashed rgba(255, 255, 255, 0.15)',
                }
          }
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(245, 158, 11, 0.15)' }}
            >
              <Camera className="w-7 h-7 text-amber-400" />
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
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
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
              style={{ background: 'rgba(245, 158, 11, 0.20)', border: '1px solid rgba(245, 158, 11, 0.40)' }}
            >
              <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
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
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35)',
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
          className="w-full py-2.5 text-white/40 hover:text-white/70 text-sm font-medium transition-colors"
        >
          {state === 'done' ? 'Ignore and fill manually' : 'Skip, fill in manually'}
        </button>
      </div>
    </div>
  );
}
