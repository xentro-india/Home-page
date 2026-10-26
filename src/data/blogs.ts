export interface BlogPost {
  id: string;
  slug: string;
  category: 'build' | 'navigate' | 'discover' | 'rethink' | 'stories' | 'learn';
  categoryLabel: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
}

export const blogCategories = [
  { id: 'all', label: 'All' },
  { id: 'build', label: 'Build' },
  { id: 'navigate', label: 'Navigate' },
  { id: 'learn', label: 'Learn' },
  { id: 'discover', label: 'Discover' },
  { id: 'stories', label: 'Stories' },
  { id: 'rethink', label: 'Rethink' },
] as const;

export const featuredArticle: BlogPost = {
  id: 'featured-navigate',
  slug: 'what-support-does-your-startup-need',
  category: 'navigate',
  categoryLabel: 'Navigate',
  tag: 'Founder Guide',
  title: 'What support does your startup actually need at its current stage?',
  excerpt:
    'Mentor, incubator, accelerator, investor, grant, or peer network? The answer depends less on what exists and more on where your startup is today.',
  image:
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=90',
};

export const latestArticles: BlogPost[] = [
  {
    id: 'mvp-stage',
    slug: 'mvp-not-supposed-to-prove-everything',
    category: 'build',
    categoryLabel: 'Build',
    tag: 'Founders',
    title: 'Your MVP is not supposed to prove everything.',
    excerpt:
      'Use the MVP stage to learn what customers actually respond to before adding complexity.',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'incubator-vs-accelerator',
    slug: 'incubator-or-accelerator',
    category: 'navigate',
    categoryLabel: 'Navigate',
    tag: 'Ecosystem',
    title: 'Incubator or accelerator: which one is relevant to you?',
    excerpt:
      'Understand the difference before applying simply because a program is available.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'stop-applying-grants',
    slug: 'stop-applying-to-every-grant',
    category: 'discover',
    categoryLabel: 'Discover',
    tag: 'Opportunities',
    title: 'Stop applying to every startup grant you find.',
    excerpt:
      'Eligibility, stage, geography, and timing matter more than the number of opportunities you discover.',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'hard-not-valuable',
    slug: 'hard-not-automatically-valuable',
    category: 'rethink',
    categoryLabel: 'Rethink',
    tag: 'Perspective',
    title: 'Hard does not automatically mean valuable.',
    excerpt:
      'Building a company will always be difficult. Unnecessary ecosystem friction does not need to be part of the process.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'isolation-lessons',
    slug: 'stop-building-in-isolation',
    category: 'stories',
    categoryLabel: 'Stories',
    tag: 'Founder Journey',
    title: 'What founders learn when they stop building in isolation.',
    excerpt:
      'Real entrepreneurial journeys can show what changes when the right support enters at the right time.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'first-time-founders-investors',
    slug: 'first-time-founders-approaching-investors',
    category: 'learn',
    categoryLabel: 'Learn',
    tag: 'Fundamentals',
    title: 'What first-time founders should understand before approaching investors.',
    excerpt:
      'Fundraising works better when founders first understand readiness, traction, and investor fit.',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85',
  },
];

export const editorialPillars = [
  {
    num: '01',
    name: 'Build',
    desc: 'Validation, product, customers, business models, sales, teams, and execution.',
  },
  {
    num: '02',
    name: 'Navigate',
    desc: 'Incubators, accelerators, investors, mentors, institutions, and startup stages.',
  },
  {
    num: '03',
    name: 'Learn',
    desc: 'Finance, marketing, legal, leadership, technology, communication, and founder fundamentals.',
  },
  {
    num: '04',
    name: 'Discover',
    desc: 'Grants, programs, startup credits, competitions, fellowships, and relevant opportunities.',
  },
  {
    num: '05',
    name: 'Stories',
    desc: 'Founder journeys, ecosystem participants, mistakes, progress, and lessons from the field.',
  },
  {
    num: '06',
    name: 'Rethink',
    desc: 'Ideas that challenge unnecessary friction, exclusivity, isolation, and outdated startup assumptions.',
  },
];
