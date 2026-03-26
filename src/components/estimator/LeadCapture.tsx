import { useState } from 'react';
import { User, Mail, Phone, Shield, Loader2 } from 'lucide-react';
import type { LeadData, PriceEstimate, FormData } from '../../types/estimator';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../utils/pricing';
import { brand } from '../../config/brand';

interface Props {
  estimate: PriceEstimate;
  formData: FormData;
  photoUrl: string | null;
  conditionReport: string | null;
  onSuccess: () => void;
}

interface FieldError {
  name?: string;
  email?: string;
  phone?: string;
}

function validate(data: LeadData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  return errors;
}

export function LeadCapture({ estimate, formData, photoUrl, conditionReport, onSuccess }: Props) {
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLead((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(lead);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setSubmitError('');

    const { error } = await supabase.from('painting_leads').insert({
      name: lead.name.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
      project_type: formData.projectType,
      area_size: parseFloat(formData.areaSize),
      surface_condition: formData.surfaceCondition,
      num_coats: formData.numCoats,
      extras_primer: formData.extras.primer,
      extras_repairs: formData.extras.repairs,
      extras_ceiling: formData.extras.ceiling,
      estimate_low: estimate.low,
      estimate_high: estimate.high,
      photo_url: photoUrl,
      ai_condition_report: conditionReport,
    });

    setLoading(false);

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
      return;
    }

    onSuccess();
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Get Your Exact Quote</h2>
        <p className="text-white/50 text-sm">
          Your estimate:{' '}
          <span className="font-semibold text-amber-300">
            {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {[
          { field: 'name' as const, label: 'Full Name', type: 'text', placeholder: 'John Smith', Icon: User },
          { field: 'email' as const, label: 'Email Address', type: 'email', placeholder: 'john@example.com', Icon: Mail },
          { field: 'phone' as const, label: 'Phone Number', type: 'tel', placeholder: brand.phone, Icon: Phone },
        ].map(({ field, label, type, placeholder, Icon }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-white/65 mb-1.5">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-[18px] h-[18px]" />
              <input
                type={type}
                value={lead[field]}
                onChange={handleChange(field)}
                placeholder={placeholder}
                className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input ${errors[field] ? 'glass-input-error' : ''}`}
              />
            </div>
            {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field]}</p>}
          </div>
        ))}

        {submitError && (
          <p
            className="text-sm text-red-300 text-center p-3 rounded-xl"
            style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.30)' }}
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="relative w-full py-4 disabled:opacity-50 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] text-lg flex items-center justify-center gap-2 overflow-hidden"
          style={{
            background: 'var(--brand-primary)',
            boxShadow: '0 4px 24px rgba(245, 158, 11, 0.35)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            brand.copy.resultCta
          )}
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/30">
        <Shield className="w-3.5 h-3.5" />
        <span>{brand.copy.privacyNote}</span>
      </div>
    </div>
  );
}
