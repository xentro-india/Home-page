export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqList: FAQItem[] = [
  {
    id: 'what-is-xentro',
    question: 'What exactly is Xentro?',
    answer:
      'Xentro is a startup ecosystem platform that brings founders, mentors, investors, institutions, opportunities, and resources into a more connected environment so users can discover what is relevant to them more easily.',
  },
  {
    id: 'who-is-xentro-built-for',
    question: 'Who is Xentro built for?',
    answer:
      'Xentro is built for startups and founders first, while also supporting mentors, investors, institutions, incubators, accelerators, and other ecosystem participants.',
  },
  {
    id: 'guarantee-success',
    question: 'Does Xentro guarantee startup success?',
    answer:
      'No. Xentro does not make decisions for founders or guarantee outcomes. It is designed to provide clearer context, relevant ecosystem access, and better visibility into potential next steps.',
  },
  {
    id: 'relevance-decision',
    question: 'How does Xentro decide what is relevant to me?',
    answer:
      'Xentro uses information from your profile, stage, goals, needs, sector, location, and journey to help surface opportunities and ecosystem connections that are more relevant to your current situation.',
  },
  {
    id: 'first-time-founders',
    question: 'Is Xentro only for first-time founders?',
    answer:
      'No. First-time and early-stage founders are a major focus because they often face the most navigation friction, but Xentro is intended to support a broader range of startup ecosystem participants.',
  },
  {
    id: 'free-access',
    question: 'Can mentors and investors join for free?',
    answer:
      'Mentor Standard access is free. Investor Standard single-user accounts are also free, with Investor Pro plans starting from ₹5,500.',
  },
  {
    id: 'institutions-partnership',
    question: 'How do institutions work with Xentro?',
    answer:
      'Institutional requirements can vary, so Xentro offers custom institutional plans. Institutions can contact the Xentro team to discuss the appropriate setup for their ecosystem needs.',
  },
];
