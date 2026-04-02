import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Loader2 } from 'lucide-react';
import type { LeadData, PriceEstimate, FormData } from '../../types/estimator';
import { supabase } from '../../lib/supabase';
import { brand } from '../../config/brand';

const WEBHOOK_URL = 'https://hook.eu1.make.com/0vbr6a1ohlpyept4pdfkyvnx52j89lxu';

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
  address?: string;
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
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<FieldError>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLead((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FieldError]) setErrors((prev) => ({ ...prev, [field]: undefined }));
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
      address: lead.address.trim() || null,
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

    if (error) {
      setLoading(false);
      setSubmitError('Something went wrong. Please try again.');
      return;
    }

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lead.name.trim(),
        email: lead.email.trim(),
        phone: lead.phone.trim(),
        address: lead.address.trim() || null,
        property_type: formData.propertyType,
        project_type: formData.projectType,
        area_size: formData.areaSize,
        surface_condition: formData.surfaceCondition,
        paint_quality: formData.paintQuality,
        urgency: formData.urgency,
        num_coats: formData.numCoats,
        extras: formData.extras,
        estimate_low: estimate.low,
        estimate_high: estimate.high,
        photo_url: photoUrl,
        ai_condition_report: conditionReport,
      }),
    }).catch(() => {});

    setLoading(false);
    onSuccess();
  };

  const fields: { field: keyof LeadData; label: string; type: string; placeholder: string; Icon: React.ElementType; required: boolean }[] = [
    { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith', Icon: User, required: true },
    { field: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', Icon: Mail, required: true },
    { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: brand.phone, Icon: Phone, required: true },
    { field: 'address', label: 'Address / City', type: 'text', placeholder: 'Nashville, TN or full address', Icon: MapPin, required: false },
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">{brand.copy.leadTitle}</h2>
        <p className="text-white/50 text-sm">{brand.copy.leadSubtext}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {fields.map(({ field, label, type, placeholder, Icon, required }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-white/65 mb-1.5">
              {label}
              {!required && <span className="text-white/30 ml-1">(optional)</span>}
            </label>
            <div className="relative">
              <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-[18px] h-[18px]" />
              <input
                type={type}
                value={lead[field]}
                onChange={handleChange(field)}
                placeholder={placeholder}
                className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input ${errors[field as keyof FieldError] ? 'glass-input-error' : ''}`}
              />
            </div>
            {errors[field as keyof FieldError] && (
              <p className="text-xs text-red-400 mt-1">{errors[field as keyof FieldError]}</p>
            )}
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
            boxShadow: '0 4px 24px rgba(204, 0, 0, 0.35)',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            brand.copy.leadSubmitButton
          )}
        </button>
      </form>

      <p className="text-xs text-center text-white/40 mt-4">{brand.copy.leadPhoneHours}</p>

      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-white/25">
        <Shield className="w-3.5 h-3.5" />
        <span>{brand.copy.privacyNote}</span>
      </div>
    </div>
  );
}
