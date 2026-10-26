export interface Capability {
  num: string;
  title: string;
  desc: string;
}

export interface ExploreTabItem {
  id: 'startups' | 'mentors' | 'investors' | 'institutions';
  label: string;
  sectionNumber: string;
  eyebrow: string;
  heading: string;
  lead: string;
  before: string;
  withXentro: string;
  imageLabel: string;
  imageClass: string;
  isDark?: boolean;
  problem: {
    eyebrow: string;
    title: string;
    text: string;
  };
  capabilities: Capability[];
  pricing: {
    eyebrow: string;
    primaryText: string;
    subText?: string;
    oldPrice?: string;
    note?: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const exploreTabs: ExploreTabItem[] = [
  {
    id: 'startups',
    label: 'Startups',
    sectionNumber: '01 / 04',
    eyebrow: 'For Startups',
    heading: 'Know where you are.\nKnow what comes next.',
    lead: 'Xentro is built around the founder journey—helping early-stage and first-time founders navigate the ecosystem with greater clarity instead of figuring everything out alone.',
    before: 'Scattered, uncertain, searching.',
    withXentro: 'Connected, contextual, moving forward.',
    imageLabel: 'Founder-first ecosystem navigation',
    imageClass: 'startup-image',
    problem: {
      eyebrow: 'The problem',
      title: 'Too many resources. Not enough relevance.',
      text: 'Founders can spend hours searching across grants, programs, communities, mentors, investors, and institutions without knowing which option actually applies to their stage, sector, geography, or current need.',
    },
    capabilities: [
      {
        num: '01',
        title: 'Startup Profile',
        desc: 'Showcase your startup, stage, sector, progress, team, and what you are currently looking for.',
      },
      {
        num: '02',
        title: 'Relevant Opportunities',
        desc: 'Discover grants, programs, competitions, credits, and opportunities that better match your profile and stage.',
      },
      {
        num: '03',
        title: 'Mentor Discovery',
        desc: 'Find mentors whose experience is relevant to the problems you are trying to solve now.',
      },
      {
        num: '04',
        title: 'Investor Discovery',
        desc: 'Explore investors and investment profiles when your startup reaches the right stage for capital conversations.',
      },
      {
        num: '05',
        title: 'Learning & Guidance',
        desc: 'Close knowledge gaps with founder-focused learning that supports the decisions you need to make next.',
      },
      {
        num: '06',
        title: 'Progress Orientation',
        desc: 'Keep your journey visible and use Xentro as a clearer reference point for what to focus on next.',
      },
    ],
    pricing: {
      eyebrow: 'Startup Plans',
      primaryText: 'Standard — Free',
      subText: 'Pro — ₹499 / month',
      oldPrice: '₹699',
      ctaText: 'Create Startup Profile',
      ctaHref: '/join',
    },
  },
  {
    id: 'mentors',
    label: 'Mentors',
    sectionNumber: '02 / 04',
    eyebrow: 'For Mentors',
    heading: 'Help the founders who need what you know.',
    lead: 'Mentorship becomes more valuable when expertise is matched to the right founder at the right stage—not lost across disconnected networks and manual coordination.',
    before: 'Unstructured discovery and scattered engagement.',
    withXentro: 'Relevant founders, focused mentorship, visible impact.',
    imageLabel: 'Expertise where it creates the most impact',
    imageClass: 'mentor-image',
    problem: {
      eyebrow: 'The problem',
      title: 'Expertise exists. Matching it to the right founder is the hard part.',
      text: 'Mentors often spend time discovering founders manually, coordinating through multiple channels, and engaging without enough context about the startup’s stage or current needs.',
    },
    capabilities: [
      {
        num: '01',
        title: 'Professional Mentor Profile',
        desc: 'Present your background, domain expertise, mentorship experience, startup experience, and availability.',
      },
      {
        num: '02',
        title: 'Founder Discovery',
        desc: 'Discover startups and founders where your expertise can be most relevant.',
      },
      {
        num: '03',
        title: 'Structured Engagement',
        desc: 'Make mentorship easier to manage through clearer profiles, session context, and startup information.',
      },
      {
        num: '04',
        title: 'Availability & Meeting Slots',
        desc: 'Make it easier for founders to understand when and how they can engage with you.',
      },
      {
        num: '05',
        title: 'Reputation & Testimonials',
        desc: 'Build a credible public profile around your contribution, experience, and founder feedback.',
      },
      {
        num: '06',
        title: 'Meaningful Impact',
        desc: 'Spend more time solving founder problems and less time finding and coordinating the right engagements.',
      },
    ],
    pricing: {
      eyebrow: 'Mentor Plan',
      primaryText: 'Standard — Free',
      ctaText: 'Become a Mentor',
      ctaHref: '/join',
    },
  },
  {
    id: 'investors',
    label: 'Investors',
    isDark: true,
    sectionNumber: '03 / 04',
    eyebrow: 'For Investors',
    heading: 'Discover promising startups earlier.',
    lead: 'Xentro gives investors a structured way to discover early-stage startups, understand founder context, and explore opportunities beyond traditional referral and deal-flow networks.',
    before: 'Fragmented discovery, high noise, manual evaluation.',
    withXentro: 'Structured discovery, clearer signal, earlier visibility.',
    imageLabel: 'Structured discovery. Better signal.',
    imageClass: 'investor-image',
    problem: {
      eyebrow: 'The problem',
      title: 'Good founders do not always appear in the usual deal-flow channels.',
      text: 'Early-stage startup discovery is often relationship-driven and fragmented. Investors need better ways to filter, understand, and evaluate ventures before deciding where to spend attention.',
    },
    capabilities: [
      {
        num: '01',
        title: 'Investment Profile',
        desc: 'Define your thesis, sectors, stages, ticket sizes, criteria, process, and value beyond capital.',
      },
      {
        num: '02',
        title: 'Startup Discovery',
        desc: 'Explore startups across sectors, stages, and geographies through a more structured ecosystem layer.',
      },
      {
        num: '03',
        title: 'Structured Startup Information',
        desc: 'Review startup profiles, team context, progress, and supporting information before deeper engagement.',
      },
      {
        num: '04',
        title: 'Document Locker Access',
        desc: 'During due diligence, startups can grant controlled access to relevant private documentation.',
      },
      {
        num: '05',
        title: 'Portfolio & Progress Workflows',
        desc: 'Support post-investment visibility through structured startup progress and financial tracking workflows.',
      },
      {
        num: '06',
        title: 'Earlier Ecosystem Signal',
        desc: 'Discover ventures before they become widely visible through traditional networks.',
      },
    ],
    pricing: {
      eyebrow: 'Investor Plans',
      primaryText: 'Standard — Free',
      note: 'Single-user account',
      subText: 'Pro — Starting ₹5,500',
      ctaText: 'Explore as Investor',
      ctaHref: '/join',
    },
  },
  {
    id: 'institutions',
    label: 'Institutions',
    sectionNumber: '04 / 04',
    eyebrow: 'For Institutions',
    heading: 'Build a stronger entrepreneurial ecosystem around your people.',
    lead: 'Xentro helps institutions move beyond isolated events and programs by creating a connected environment for discovering, engaging, supporting, and measuring entrepreneurial activity.',
    before: 'Programs, founders, mentors, and outcomes stay disconnected.',
    withXentro: 'A more connected ecosystem with clearer participation and outcomes.',
    imageLabel: 'Infrastructure for entrepreneurial outcomes',
    imageClass: 'institution-image',
    problem: {
      eyebrow: 'The problem',
      title: 'Entrepreneurship programs often end where the event ends.',
      text: 'Institutions can create strong programs, but founders, mentors, opportunities, and ecosystem relationships often remain spread across different tools, spreadsheets, teams, and networks.',
    },
    capabilities: [
      {
        num: '01',
        title: 'Entrepreneurial Talent Discovery',
        desc: 'Identify founders, student entrepreneurs, and ventures emerging from within the institution.',
      },
      {
        num: '02',
        title: 'Founder Engagement',
        desc: 'Keep entrepreneurial participants connected beyond individual workshops, events, and programs.',
      },
      {
        num: '03',
        title: 'Mentor & Ecosystem Connectivity',
        desc: 'Expand access to mentors, investors, incubators, accelerators, and other ecosystem participants.',
      },
      {
        num: '04',
        title: 'Opportunity Distribution',
        desc: 'Help students and founders discover relevant programs, competitions, grants, and ecosystem opportunities.',
      },
      {
        num: '05',
        title: 'Progress & Reporting',
        desc: 'Create greater visibility into entrepreneurial participation, startup activity, and ecosystem outcomes.',
      },
      {
        num: '06',
        title: 'Connected Ecosystem Infrastructure',
        desc: 'Move from isolated entrepreneurship initiatives toward a continuous support environment.',
      },
    ],
    pricing: {
      eyebrow: 'Institutional Plans',
      primaryText: 'Custom pricing — Contact us',
      ctaText: 'Partner with Xentro',
      ctaHref: '/join',
    },
  },
];
