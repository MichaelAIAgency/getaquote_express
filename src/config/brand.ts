/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  WHITE-LABEL CONFIG
 *  Edit this file to fully rebrand the estimator for any painting company.
 *  All colors, copy, contact details, pricing rates, and UI text live here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  // ── Company Identity ───────────────────────────────────────────────────────
  name: 'Instant Get A Quote Prototype',
  tagline: 'Professional Painting Services',
  phone: '+353 1 234 5678',
  email: 'hello@propaint.ie',
  website: 'https://propaint.ie',

  // Set to a URL string to show a logo image instead of the icon+text wordmark.
  // e.g. logoUrl: 'https://example.com/logo.png'
  logoUrl: null as string | null,

  // ── Localisation ───────────────────────────────────────────────────────────
  locale: 'en-IE',    // BCP 47 locale used for number/currency formatting
  currency: 'EUR',    // ISO 4217 currency code

  // ── Social Proof Stats (shown on hero landing page) ────────────────────────
  stats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '24h', label: 'Quote Turnaround' },
  ],

  // ── All UI Copy ────────────────────────────────────────────────────────────
  copy: {
    heroTitle: 'How much will your painting project cost?',
    heroSubtitle:
      'Answer 5 quick questions and get an instant price estimate — no sign-up required.',
    heroBadge: 'Free Instant Estimate',
    heroCtaButton: 'Get My Free Estimate',
    heroCtaSubtext: 'Takes less than 2 minutes. No obligation.',
    resultCta: 'Get Exact Quote in 24 Hours',
    privacyNote: 'No obligation. We respect your privacy.',
    thankYouTitle: 'Request Submitted!',
    thankYouSubtitle:
      'Thank you! A specialist will review your details and contact you within 24 hours.',
    responseTime: '24 hours',
    responseTimeNote:
      'Our team will reach out via email or phone to confirm your quote.',
    phoneCta: 'Need help sooner?',
  },

  // ── Pricing Rates (per m²) ─────────────────────────────────────────────────
  pricing: {
    interiorRatePerSqm: 8,
    exteriorRatePerSqm: 12,
  },

  // ── Brand Colors ───────────────────────────────────────────────────────────
  // These are injected as CSS variables so every UI element updates automatically.
  // primary        → main buttons, selected states, progress bar
  // primaryHover   → button hover state
  // primaryLight   → tinted backgrounds on selected options
  // primaryText    → text on primaryLight backgrounds
  // primaryRing    → focus rings / active step glow
  // gradientFrom / gradientTo → result card gradient
  colors: {
    primary: '#F59E0B',
    primaryHover: '#D97706',
    primaryLight: '#FFFBEB',
    primaryText: '#92400E',
    primaryRing: '#FDE68A',
    gradientFrom: '#F59E0B',
    gradientTo: '#EA580C',
  },
};
