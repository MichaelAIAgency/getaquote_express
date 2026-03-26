import { useState } from 'react';
import { PaintBucket, ChevronLeft, Sparkles } from 'lucide-react';
import { ProgressBar } from './components/ui/ProgressBar';
import { StepPhotoUpload } from './components/estimator/StepPhotoUpload';
import { StepProjectType } from './components/estimator/StepProjectType';
import { StepAreaSize } from './components/estimator/StepAreaSize';
import { StepSurfaceCondition } from './components/estimator/StepSurfaceCondition';
import { StepCoats } from './components/estimator/StepCoats';
import { StepExtras } from './components/estimator/StepExtras';
import { ResultScreen } from './components/estimator/ResultScreen';
import { LeadCapture } from './components/estimator/LeadCapture';
import { ThankYou } from './components/estimator/ThankYou';
import { brand } from './config/brand';
import { calculateEstimate } from './utils/pricing';
import type { FormData, PriceEstimate, AiAnalysis } from './types/estimator';

type AppView = 'landing' | 'photo' | 'form' | 'result' | 'lead' | 'thanks';

const TOTAL_STEPS = 5;

const initialFormData: FormData = {
  projectType: null,
  areaSize: '',
  surfaceCondition: null,
  numCoats: null,
  extras: { primer: false, repairs: false, ceiling: false },
};

function AmbientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="orb-1 absolute -top-56 -left-56 w-[750px] h-[750px] rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(245,158,11,0.28) 0%, transparent 65%)' }}
      />
      <div
        className="orb-2 absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full"
        style={{ background: 'radial-gradient(circle at center, rgba(234,88,12,0.22) 0%, transparent 65%)' }}
      />
      <div
        className="orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.07) 0%, transparent 60%)' }}
      />
    </div>
  );
}

function BrandLogo() {
  if (brand.logoUrl) {
    return <img src={brand.logoUrl} alt={brand.name} className="h-8 w-auto" />;
  }
  return (
    <>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        <PaintBucket className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-lg text-white">{brand.name}</span>
    </>
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
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              borderColor: 'rgba(245, 158, 11, 0.35)',
              color: 'var(--brand-primary)',
            }}
          >
            <Sparkles className="w-3 h-3" />
            {brand.copy.heroBadge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            {brand.copy.heroTitle.split('painting project').length > 1 ? (
              <>
                {brand.copy.heroTitle.split('painting project')[0]}
                <span style={{ color: 'var(--brand-primary)' }}>painting project</span>
                {brand.copy.heroTitle.split('painting project')[1]}
              </>
            ) : (
              brand.copy.heroTitle
            )}
          </h1>

          <p className="text-white/55 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            {brand.copy.heroSubtitle}
          </p>

          <button
            onClick={onStart}
            className="relative inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold rounded-2xl text-lg transition-all duration-200 active:scale-[0.97] hover:scale-[1.02] overflow-hidden"
            style={{
              backgroundColor: 'var(--brand-primary)',
              boxShadow: '0 8px 32px rgba(245, 158, 11, 0.40)',
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
      areaSize: analysis.estimatedAreaM2 ? String(analysis.estimatedAreaM2) : f.areaSize,
      extras: {
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
    if (step === 1) return formData.projectType !== null;
    if (step === 2) {
      const n = parseFloat(formData.areaSize);
      return !isNaN(n) && n > 0;
    }
    if (step === 3) return formData.surfaceCondition !== null;
    if (step === 4) return formData.numCoats !== null;
    return true;
  };

  const handleNext = () => {
    if (step === 2) {
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
      setView('result');
    }
  };

  const handleBack = () => {
    if (view === 'result')             { setView('form');    advance(); setStep(TOTAL_STEPS); return; }
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
        {(view === 'photo' || view === 'form' || view === 'result' || view === 'lead') && (
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
                  background: 'rgba(245, 158, 11, 0.14)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#FCD34D',
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
                <StepProjectType
                  value={formData.projectType}
                  onChange={(v) => setFormData((f) => ({ ...f, projectType: v }))}
                />
              )}
              {view === 'form' && step === 2 && (
                <StepAreaSize
                  value={formData.areaSize}
                  onChange={(v) => {
                    setFormData((f) => ({ ...f, areaSize: v }));
                    if (areaError) setAreaError('');
                  }}
                  error={areaError}
                />
              )}
              {view === 'form' && step === 3 && (
                <StepSurfaceCondition
                  value={formData.surfaceCondition}
                  onChange={(v) => setFormData((f) => ({ ...f, surfaceCondition: v }))}
                />
              )}
              {view === 'form' && step === 4 && (
                <StepCoats
                  value={formData.numCoats}
                  onChange={(v) => setFormData((f) => ({ ...f, numCoats: v }))}
                />
              )}
              {view === 'form' && step === 5 && (
                <StepExtras
                  value={formData.extras}
                  onChange={(v) => setFormData((f) => ({ ...f, extras: v }))}
                />
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
                    boxShadow: canAdvance() ? '0 4px 20px rgba(245,158,11,0.35)' : 'none',
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
    </div>
  );
}
