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
    resultTitle: "Here's Your Estimate",
    resultSubtext: "Based on your answers, here's what your Nashville painting project could cost:",
    resultDisclaimer:
      'Ballpark estimate — Rick will confirm your exact price after a quick walkthrough.',
    rickConfirmTitle: 'Rick Smith will be in touch!',
    rickConfirmSubtext:
      "We've received your request. Rick will personally review your project details and reach out shortly to confirm your exact price and schedule a free on-site walkthrough.",
    rickConfirmCta: 'Call Rick directly: (615) 420-2585',
    leadTitle: "You're One Step Away",
    leadSubtext: "Enter your contact details below and we'll reveal your personalized painting estimate instantly.",
    leadSubmitButton: 'Reveal My Estimate',
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
