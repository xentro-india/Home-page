export const departments = {
  'Development': ['Frontend Development','Backend Development','Full-Stack Development','Database Management','AI Integration & Optimization','AI-Assisted / Vibe Coding','UI/UX Development','API Development & Integration','Cloud Infrastructure & DevOps','Software Testing & QA','Mobile Application Development','Cybersecurity'],
  'Media & Design': ['Graphic Design','Brand Identity Design','UI/UX Design','Motion Graphics & Animation','Video Editing','Videography & Photography','Content Production','Social Media Design','Presentation & Pitch Deck Design','3D Design & Visualization'],
  'Marketing & Growth': ['Content Creator','Digital Marketing','Social Media Marketing','Content Marketing & Copywriting','SEO & Website Growth','Performance Marketing','Growth Strategy','Community Management','Market Research','Public Relations & Communications','Event Marketing','Campus Ambassador Programs','User Acquisition & Retention'],
  'Operations & Partnerships': ['Event Management','Business Operations','Startup Ecosystem Partnerships','Institutional Partnerships','Incubator & Accelerator Relations','Investor Relations','Mentor Relations','Business Development','Program & Event Operations','Community Operations','Human Resources & Talent Acquisition','Customer Success & Support','Strategic Partnerships']
} as const;
export type Department = keyof typeof departments;
export const departmentNames = Object.keys(departments) as Department[];
