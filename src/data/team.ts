export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  bio: string;
  image: string;
  aspectRatio: '4/5' | '3/5';
}

export const teamMembers: TeamMember[] = [
  {
    id: 'karunya-kranthi',
    name: 'Yala Karunya Kranthi Kumar',
    role: 'Founder & CEO',
    badge: 'CEO',
    bio: 'Founder of Xentro and the driving force behind its vision of building connected entrepreneurial infrastructure for founders and ecosystem participants.',
    image: '/assets/krnt.png',
    aspectRatio: '3/5',
  },
  {
    id: 'swaroop-mahadev',
    name: 'Pappu Swaroop Mahadev',
    role: 'Chief Operating Officer',
    badge: 'COO',
    bio: 'Leads operational execution and internal coordination across Xentro’s evolving ecosystem, ensuring strategy translates into structured action.',
    image: '/assets/swrp.PNG',
    aspectRatio: '3/5',
  },
  {
    id: 'vamsy-vivek',
    name: 'Ch. Vamsy Vivek',
    role: 'Chief Financial Officer',
    badge: 'CFO',
    bio: 'Oversees financial planning and financial discipline as Xentro develops its product, ecosystem partnerships, and long-term growth model.',
    image: '/assets/vinay.png',
    aspectRatio: '3/5',
  },
];
