export const brand = {
  name: 'Nashville House Painters',
  tagline: "We Paint Your Home Like It's Our Own.",
  phone: '(615) 420-2585',
  email: 'info@ipaintnashville.com',
  website: 'https://ipaintnashville.com',
  location: 'Nashville, TN',

  logoUrl: '/logo.webp' as string | null,

  locale: 'en-US',
  currency: 'USD',

  stats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '20 Years', label: 'Serving Nashville' },
  ],

  copy: {
    heroTitle: 'How much will your Nashville painting project cost?',
    heroSubtitle:
      'Answer 8 quick questions and get an instant price estimate — no sign-up required.',
    heroBadge: 'FREE INSTANT ESTIMATE',
    heroCtaButton: 'Get My Free Estimate',
    heroCtaSubtext: 'Takes less than 2 minutes. No obligation.',
    resultTitle: 'Your Nashville House Painters Estimate',
    resultSubtext: "Based on your project details, here's your estimated investment:",
    resultDisclaimer:
      'This is a preliminary estimate. Contact us for a detailed, no-obligation quote.',
    resultCta: 'Get My Exact Quote',
    resultPhoneCta: 'Call us now: (615) 420-2585',
    leadTitle: "Almost there! Let's send you your personalized quote.",
    leadSubtext: "Enter your details below and we'll follow up with a detailed breakdown.",
    leadSubmitButton: 'Send My Quote Request',
    leadPhoneHours: 'Prefer to call? (615) 420-2585 | Mon–Fri 7:30 AM – 5:30 PM',
    privacyNote: 'Your info is safe with us. No spam, ever.',
    thankYouTitle: 'Request Submitted!',
    thankYouSubtitle:
      'Thank you! A Nashville House Painters specialist will review your details and reach out shortly.',
    responseTime: '24 hours',
    responseTimeNote:
      'Our team will reach out via email or phone to confirm your quote.',
    phoneCta: 'Need help sooner?',
    loadingTitle: 'Calculating your Nashville estimate...',
    loadingSubtext: 'Crunching local pricing data for Middle Tennessee...',
    photoUploadTitle: 'Analyze your space',
    photoUploadSubtext: 'Upload a photo of your space for AI-powered analysis.',
    footerTagline:
      'Serving Nashville, Brentwood, Franklin, Mt. Juliet & Middle Tennessee',
    footerCopyright: '© 2026 Nashville House Painters. All Rights Reserved.',
  },

  pricing: {
    interiorBaseRatePerSqft: 2.0,
    exteriorMultiplier: 1.2,
    deckFenceRatePerSqft: 1.5,
    bothMultiplier: 1.1,
  },

  colors: {
    primary: '#CC0000',
    primaryHover: '#AA0000',
    primaryLight: '#FFF0F0',
    primaryText: '#7A0000',
    primaryRing: '#FF9999',
    gradientFrom: '#CC0000',
    gradientTo: '#990000',
  },
};
