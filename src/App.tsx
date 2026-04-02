import { useState } from 'react';
import { PaintBucket, ChevronLeft, Sparkles, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { ProgressBar } from './components/ui/ProgressBar';
import { StepPhotoUpload } from './components/estimator/StepPhotoUpload';
import { StepPropertyType } from './components/estimator/StepPropertyType';
import { StepProjectType } from './components/estimator/StepProjectType';
import { StepAreaSize } from './components/estimator/StepAreaSize';
import { StepSurfaceCondition } from './components/estimator/StepSurfaceCondition';
import { StepPaintQuality } from './components/estimator/StepPaintQuality';
import { StepUrgency } from './components/estimator/StepUrgency';
import { StepCoats } from './components/estimator/StepCoats';
import { StepExtras } from './components/estimator/StepExtras';
import { LoadingScreen } from './components/estimator/LoadingScreen';
import { ResultScreen } from './components/estimator/ResultScreen';
import { LeadCapture } from './components/estimator/LeadCapture';
import { ThankYou } from './components/estimator/ThankYou';
import { brand } from './config/brand';
import { calculateEstimate } from './utils/pricing';
import type { FormData, PriceEstimate, AiAnalysis } from './types/estimator';

type AppView = 'landing' | 'photo' | 'form' | 'loading' | 'result' | 'lead' | 'thanks';

const TOTAL_STEPS = 8;

const initialFormData: FormData = {
  propertyType: null,
  projectType: null,
  areaSize: '',
  surfaceCondition: null,
  paintQuality: null,
  urgency: null,
  numCoats: null,
  extras: { primer: false, repairs: false, ceiling: false, trim: false, doors: false, pressure_washing: false, color_consultation: false },
};

function AmbientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="orb-1 absolute -top-56 -left-56 w-[750px] h-[750px] rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(204,0,0,0.20) 0%, transparent 65%)' }}
      />
      <div
        className="orb-2 absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(153,0,0,0.16) 0%, transparent 65%)' }}
      />
      <div
        className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(204,0,0,0.06) 0%, transparent 60%)' }}
      />
    </div>
  );
}

function BrandLogo() {
  if (brand.logoUrl) {
    return (
      <div className="flex items-center gap-3 select-none">
        <img src={brand.logoUrl} alt={brand.name} className="h-10 w-auto flex-shrink-0" />
        <div className="flex flex-col justify-center">
          <span className="font-extrabold text-lg tracking-tight text-white leading-tight">
            Nashville House Painters
          </span>
          <span className="text-[10px] font-medium tracking-wide text-white/40 leading-none">
            ipaintnashville.com
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className="relative w-10 h-10 rounded-[14px] flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, var(--brand-primary), #990000)',
          boxShadow: '0 8px 24px rgba(204, 0, 0, 0.4)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/30 to-transparent" />
        <PaintBucket className="w-5 h-5 text-white drop-shadow-md relative z-10" />
      </div>
      <span className="font-extrabold text-xl tracking-tight text-white">
        {brand.name}
      </span>
    </div>
  );
}

function LandingHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: '#080b12' }}>
      <AmbientOrbs />

      <header className="relative z-10 px-6 py-5 flex items-center gap-2">
        <BrandLogo />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full text-center">
          <div
            className="inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(204, 0, 0, 0.12)',
              borderColor: 'rgba(204, 0, 0, 0.40)',
              color: 'var(--brand-primary)',
            }}
          >
            <Sparkles className="w-3 h-3" />
            {brand.copy.heroBadge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            How much will your{' '}
            <span style={{ color: 'var(--brand-primary)' }}>Nashville painting</span>
            {' '}project cost?
          </h1>

          <p className="text-white/55 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            {brand.copy.heroSubtitle}
          </p>

          <button
            onClick={onStart}
            className="relative inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold rounded-2xl text-lg transition-all duration-200 active:scale-[0.97] hover:scale-[1.02] overflow-hidden"
            style={{
              backgroundColor: 'var(--brand-primary)',
              boxShadow: '0 8px 32px rgba(204, 0, 0, 0.40)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <PaintBucket className="w-5 h-5" />
            {brand.copy.heroCtaButton}
          </button>

          <p className="text-white/35 text-sm mt-4">{brand.copy.heroCtaSubtext}</p>

          <div className="mt-14 grid grid-cols-3 gap-4 pt-10 border-t border-white/[0.08]">
            {brand.stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl px-4 py-5 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.07]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/45 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full pb-8 mt-auto">
        <div className="max-w-xl mx-auto px-6">
          <div
            className="rounded-2xl px-6 py-5 text-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs text-white/25 mb-1">{brand.copy.footerCopyright}</p>
            <p className="text-xs text-white/35 mb-3">{brand.copy.footerTagline}</p>
            <div className="flex items-center justify-center flex-wrap gap-3 text-xs text-white/35">
              <a href={`tel:${brand.phone}`} className="flex items-center gap-1 hover:text-white/60 transition-colors">
                <Phone className="w-3 h-3" />
                {brand.phone}
              </a>
              <span className="text-white/15">·</span>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-1 hover:text-white/60 transition-colors">
                <Mail className="w-3 h-3" />
                {brand.email}
              </a>
              <span className="text-white/15">·</span>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com/ipaintnashville" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com/ipaintnashville" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [areaError, setAreaError] = useState('');
  const [estimate, setEstimate] = useState<PriceEstimate>({ low: 0, high: 0, base: 0 });
  const [animKey, setAnimKey] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);

  const advance = () => setAnimKey((k) => k + 1);

  const handlePhotoAnalysis = (url: string, analysis: AiAnalysis) => {
    setPhotoUrl(url);
    setAiAnalysis(analysis);
    setFormData((f) => ({
      ...f,
      projectType: analysis.projectType,
      surfaceCondition: analysis.surfaceCondition,
      areaSize: analysis.estimatedAreaSqft ? String(analysis.estimatedAreaSqft) : f.areaSize,
      extras: {
        ...f.extras,
        primer: analysis.needsPrimer,
        repairs: analysis.needsRepairs,
        ceiling: analysis.hasCeiling,
      },
    }));
    advance();
    setView('form');
    setStep(1);
  };

  const handlePhotoSkip = () => { advance(); setView('form'); setStep(1); };

  const canAdvance = (): boolean => {
    if (step === 1) return formData.propertyType !== null;
    if (step === 2) return formData.projectType !== null;
    if (step === 3) {
      const n = parseFloat(formData.areaSize);
      return !isNaN(n) && n > 0;
    }
    if (step === 4) return formData.surfaceCondition !== null;
    if (step === 5) return formData.paintQuality !== null;
    if (step === 6) return formData.urgency !== null;
    if (step === 7) return formData.numCoats !== null;
    return true;
  };

  const handleNext = () => {
    if (step === 3) {
      const n = parseFloat(formData.areaSize);
      if (isNaN(n) || n <= 0) {
        setAreaError('Please enter a valid area greater than 0');
        return;
      }
      setAreaError('');
    }

    if (!canAdvance()) return;

    if (step < TOTAL_STEPS) {
      advance();
      setStep((s) => s + 1);
    } else {
      const est = calculateEstimate(formData);
      setEstimate(est);
      advance();
      setView('loading');
    }
  };

  const handleBack = () => {
    if (view === 'result')             { setView('form');    advance(); setStep(TOTAL_STEPS); return; }
    if (view === 'loading')            { setView('form');    advance(); setStep(TOTAL_STEPS); return; }
    if (view === 'lead')               { setView('result');  advance(); return; }
    if (view === 'form' && step > 1)   { advance(); setStep((s) => s - 1); return; }
    if (view === 'form' && step === 1) { setView('photo');   advance(); return; }
    if (view === 'photo')              { setView('landing'); return; }
  };

  if (view === 'landing') {
    return <LandingHero onStart={() => { advance(); setView('photo'); }} />;
  }

  return (
    <div className="min-h-screen relative flex flex-col" style={{ background: '#080b12' }}>
      <AmbientOrbs />

      <header
        className="relative z-20 px-6 py-4 flex items-center justify-between sticky top-0 backdrop-blur-xl"
        style={{
          background: 'rgba(8, 11, 18, 0.72)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2">
          <BrandLogo />
        </div>
        {(view === 'photo' || view === 'form' || view === 'result' || view === 'loading' || view === 'lead') && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-sm text-white/50 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        )}
      </header>

      <main className="relative z-10 flex-1 flex items-start justify-center p-4 pt-8 pb-12">
        <div className="w-full max-w-md">
          {view === 'form' && (
            <div className="mb-6">
              <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>
          )}

          <div
            className="rounded-3xl p-6 sm:p-8 backdrop-blur-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.055)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {view === 'form' && aiAnalysis && (
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-5 text-xs font-medium"
                style={{
                  background: 'rgba(204, 0, 0, 0.12)',
                  border: '1px solid rgba(204, 0, 0, 0.35)',
                  color: '#FF8888',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                Form pre-filled from your photo. Review and adjust each step as needed.
              </div>
            )}

            <div key={animKey} className="animate-slide-up">
              {view === 'photo' && (
                <StepPhotoUpload
                  onAnalysisComplete={handlePhotoAnalysis}
                  onSkip={handlePhotoSkip}
                />
              )}
              {view === 'form' && step === 1 && (
                <StepPropertyType
                  value={formData.propertyType}
                  onChange={(v) => setFormData((f) => ({ ...f, propertyType: v }))}
                />
              )}
              {view === 'form' && step === 2 && (
                <StepProjectType
                  value={formData.projectType}
                  onChange={(v) => setFormData((f) => ({ ...f, projectType: v }))}
                />
              )}
              {view === 'form' && step === 3 && (
                <StepAreaSize
                  value={formData.areaSize}
                  onChange={(v) => {
                    setFormData((f) => ({ ...f, areaSize: v }));
                    if (areaError) setAreaError('');
                  }}
                  error={areaError}
                />
              )}
              {view === 'form' && step === 4 && (
                <StepSurfaceCondition
                  value={formData.surfaceCondition}
                  onChange={(v) => setFormData((f) => ({ ...f, surfaceCondition: v }))}
                />
              )}
              {view === 'form' && step === 5 && (
                <StepPaintQuality
                  value={formData.paintQuality}
                  onChange={(v) => setFormData((f) => ({ ...f, paintQuality: v }))}
                />
              )}
              {view === 'form' && step === 6 && (
                <StepUrgency
                  value={formData.urgency}
                  onChange={(v) => setFormData((f) => ({ ...f, urgency: v }))}
                />
              )}
              {view === 'form' && step === 7 && (
                <StepCoats
                  value={formData.numCoats}
                  onChange={(v) => setFormData((f) => ({ ...f, numCoats: v }))}
                />
              )}
              {view === 'form' && step === 8 && (
                <StepExtras
                  value={formData.extras}
                  onChange={(v) => setFormData((f) => ({ ...f, extras: v }))}
                />
              )}
              {view === 'loading' && (
                <LoadingScreen onComplete={() => { advance(); setView('result'); }} />
              )}
              {view === 'result' && (
                <ResultScreen
                  estimate={estimate}
                  formData={formData}
                  onContinue={() => { advance(); setView('lead'); }}
                />
              )}
              {view === 'lead' && (
                <LeadCapture
                  estimate={estimate}
                  formData={formData}
                  photoUrl={photoUrl}
                  conditionReport={aiAnalysis?.conditionReport ?? null}
                  onSuccess={() => { advance(); setView('thanks'); }}
                />
              )}
              {view === 'thanks' && (
                <ThankYou conditionReport={aiAnalysis?.conditionReport ?? null} />
              )}
            </div>

            {view === 'form' && (
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  disabled={!canAdvance()}
                  className="relative w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] overflow-hidden"
                  style={{
                    background: canAdvance() ? 'var(--brand-primary)' : 'rgba(255,255,255,0.10)',
                    boxShadow: canAdvance() ? '0 4px 20px rgba(204,0,0,0.35)' : 'none',
                  }}
                >
                  {canAdvance() && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  )}
                  {step === TOTAL_STEPS ? 'See My Estimate' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full pb-6 mt-auto">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-white/20 space-y-1">
          <p>{brand.copy.footerCopyright}</p>
          <p>{brand.copy.footerTagline}</p>
        </div>
      </footer>
    </div>
  );
}
