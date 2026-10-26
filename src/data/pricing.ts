export interface PricingPlan {
  role: string;
  tier: string;
  price: string;
  oldPrice?: string;
  isContactPrice?: boolean;
  note: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const standardPlans: PricingPlan[] = [
  {
    role: 'Startup',
    tier: 'Standard',
    price: 'Free',
    note: 'standard access',
    features: [
      'Create your startup profile',
      'Access the ecosystem',
      'Explore relevant resources',
    ],
    ctaText: 'Join Free',
    ctaHref: '/join',
  },
  {
    role: 'Mentor',
    tier: 'Standard',
    price: 'Free',
    note: 'standard mentor access',
    features: [
      'Create a mentor profile',
      'Discover relevant founders',
      'Participate in the ecosystem',
    ],
    ctaText: 'Join as Mentor',
    ctaHref: '/join',
  },
  {
    role: 'Investor',
    tier: 'Standard',
    price: 'Free',
    note: 'single-user account',
    features: [
      'Create an investor profile',
      'Discover startups',
      'Explore ecosystem participation',
    ],
    ctaText: 'Join as Investor',
    ctaHref: '/join',
  },
];

export const proPlans: PricingPlan[] = [
  {
    role: 'Startup',
    tier: 'Pro',
    price: '₹499',
    oldPrice: '₹699',
    note: 'per month',
    features: [
      'Expanded startup ecosystem access',
      'Relevant discovery and recommendations',
      'Advanced startup journey support',
    ],
    ctaText: 'Choose Startup Pro',
    ctaHref: '/join',
  },
  {
    role: 'Investor',
    tier: 'Pro',
    price: '₹5,500+',
    note: 'starting price',
    features: [
      'Startup discovery and evaluation',
      'Expanded investor workflows',
      'Advanced ecosystem access',
    ],
    ctaText: 'Explore Investor Pro',
    ctaHref: '/join',
  },
  {
    role: 'Institutions',
    tier: 'Institutional Access',
    price: 'Contact us',
    isContactPrice: true,
    note: 'custom institutional plans',
    features: [
      'Custom ecosystem requirements',
      'Institution-specific onboarding',
    ],
    ctaText: 'Talk to Xentro',
    ctaHref: '/join',
  },
];
