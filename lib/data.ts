export type Person = {
  id: number;
  name: string;
  initials: string;
  city: string;
  teach: string;
  learn: string;
  category: string;
  match: number;
  colour: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  rating?: number;
  reviews?: number;
  completedSwaps?: number;
  availability?: string;
  languages?: string[];
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  sessionType?: 'Online' | 'In-person' | 'Hybrid';
  communityPoints?: number;
  badges?: string[];
};

export const people: Person[] = [
  {
    id: 1,
    name: 'Nethmi Perera',
    initials: 'NP',
    city: 'Kandy · Online',
    teach: 'Figma systems',
    learn: 'React',
    category: 'Creative',
    match: 97,
    colour: 'from-fuchsia-500 to-orange-400',
    bio: 'UX Designer passionate about design systems and accessibility. Love mentoring aspiring designers.',
    verified: true,
    rating: 4.9,
    reviews: 12,
    completedSwaps: 8,
    availability: 'Weekdays 6-9 PM',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Advanced',
    sessionType: 'Online',
    communityPoints: 450,
    badges: ['First Swap', 'Skill Mentor', 'Community Hero'],
  },
  {
    id: 2,
    name: 'Dilan Madushanka',
    initials: 'DM',
    city: 'Galle · Hybrid',
    teach: 'Python & data',
    learn: 'English',
    category: 'Technology',
    match: 94,
    colour: 'from-blue-500 to-violet-500',
    bio: 'Data scientist with 5 years experience. Building ML models is my passion. Learning English for international opportunities.',
    verified: true,
    rating: 4.8,
    reviews: 9,
    completedSwaps: 6,
    availability: 'Weekends anytime',
    languages: ['English', 'Sinhala', 'Tamil'],
    skillLevel: 'Advanced',
    sessionType: 'Hybrid',
    communityPoints: 380,
    badges: ['First Swap', 'Fast Responder'],
  },
  {
    id: 3,
    name: 'Ayesha Khan',
    initials: 'AK',
    city: 'Colombo · Online',
    teach: 'Communication skills',
    learn: 'Photography',
    category: 'Languages',
    match: 91,
    colour: 'from-emerald-400 to-cyan-500',
    bio: 'Speech trainer and communication coach. Help professionals improve presentation and public speaking skills.',
    verified: true,
    rating: 4.9,
    reviews: 15,
    completedSwaps: 11,
    availability: 'Mon-Fri 5-8 PM, Sat anytime',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Advanced',
    sessionType: 'Online',
    communityPoints: 520,
    badges: ['First Swap', 'Skill Mentor', 'Community Hero', 'Seven-Day Streak'],
  },
  {
    id: 4,
    name: 'Ravin Vithana',
    initials: 'RV',
    city: 'Kurunegala · Online',
    teach: 'Next.js & React',
    learn: 'Product design',
    category: 'Technology',
    match: 89,
    colour: 'from-violet-500 to-indigo-500',
    bio: 'Full-stack developer specializing in Next.js. 3 years in web development. Excited to learn product thinking.',
    verified: true,
    rating: 4.7,
    reviews: 8,
    completedSwaps: 5,
    availability: 'Weekday evenings, Saturday mornings',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Advanced',
    sessionType: 'Online',
    communityPoints: 300,
    badges: ['First Swap', 'Fast Responder'],
  },
  {
    id: 5,
    name: 'Shenali Iresha',
    initials: 'SI',
    city: 'Matara · In person',
    teach: 'Photography & editing',
    learn: 'Motion design',
    category: 'Creative',
    match: 86,
    colour: 'from-amber-400 to-rose-500',
    bio: 'Wildlife and portrait photographer. Offer in-person sessions in Matara. Want to explore animation and motion.',
    verified: false,
    rating: 4.6,
    reviews: 6,
    completedSwaps: 4,
    availability: 'Weekends, flexible timing',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Intermediate',
    sessionType: 'In-person',
    communityPoints: 250,
    badges: ['First Swap'],
  },
  {
    id: 6,
    name: 'Kasun Mendis',
    initials: 'KM',
    city: 'Colombo · Hybrid',
    teach: 'Business finance',
    learn: 'Public speaking',
    category: 'Business',
    match: 84,
    colour: 'from-slate-600 to-blue-500',
    bio: 'Founder and financial consultant. Help startups with financial planning. Looking to improve pitch skills.',
    verified: true,
    rating: 4.8,
    reviews: 10,
    completedSwaps: 7,
    availability: 'Mon, Wed, Fri evenings',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Advanced',
    sessionType: 'Hybrid',
    communityPoints: 420,
    badges: ['First Swap', 'Skill Mentor'],
  },
  {
    id: 7,
    name: 'Thilina Jayasuriya',
    initials: 'TJ',
    city: 'Negombo · Online',
    teach: 'Video editing',
    learn: 'JavaScript',
    category: 'Creative',
    match: 82,
    colour: 'from-red-500 to-pink-500',
    bio: 'Content creator and video editor. Produce videos for social media and brands. Learning web development.',
    verified: true,
    rating: 4.5,
    reviews: 7,
    completedSwaps: 3,
    availability: 'Weekday evenings, Sunday anytime',
    languages: ['English', 'Sinhala'],
    skillLevel: 'Intermediate',
    sessionType: 'Online',
    communityPoints: 200,
    badges: ['First Swap'],
  },
  {
    id: 8,
    name: 'Priya Shankar',
    initials: 'PS',
    city: 'Jaffna · Online',
    teach: 'Tamil language',
    learn: 'Digital marketing',
    category: 'Languages',
    match: 80,
    colour: 'from-green-500 to-teal-500',
    bio: 'Tamil language instructor with passion for cultural exchange. Native speaker, patient teacher.',
    verified: true,
    rating: 4.9,
    reviews: 18,
    completedSwaps: 12,
    availability: 'Daily 4-7 PM',
    languages: ['English', 'Sinhala', 'Tamil'],
    skillLevel: 'Advanced',
    sessionType: 'Online',
    communityPoints: 580,
    badges: ['First Swap', 'Skill Mentor', 'Community Hero', 'Seven-Day Streak', 'Learning Champion'],
  },
];

// Quick Help Requests
export type QuickHelpRequest = {
  id: number;
  title: string;
  description: string;
  category: string;
  urgency: 'Low' | 'Medium' | 'High';
  estimatedTime: string;
  pointsOffered: number;
  status: 'Open' | 'Helper Found' | 'Solved';
  author: string;
  responses?: number;
  createdAt?: string;
};

export const quickHelpRequests: QuickHelpRequest[] = [
  {
    id: 1,
    title: 'Help me fix a React error',
    description: 'Getting a "Cannot read property of undefined" error in my React component. Need help debugging.',
    category: 'Technology',
    urgency: 'High',
    estimatedTime: '30 mins',
    pointsOffered: 50,
    status: 'Helper Found',
    author: 'Akash',
    responses: 2,
    createdAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'Review my CV',
    description: 'Looking for feedback on my resume. Want to apply for tech roles.',
    category: 'Career Development',
    urgency: 'Medium',
    estimatedTime: '45 mins',
    pointsOffered: 40,
    status: 'Open',
    author: 'Samantha',
    responses: 0,
    createdAt: '4 hours ago',
  },
  {
    id: 3,
    title: 'Figma design feedback',
    description: 'Need critique on my mobile app UI design. Any design feedback welcome.',
    category: 'UI/UX Design',
    urgency: 'Low',
    estimatedTime: '1 hour',
    pointsOffered: 35,
    status: 'Open',
    author: 'Naveen',
    responses: 1,
    createdAt: '6 hours ago',
  },
];

// Weekly Challenges
export type Challenge = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  startDate: string;
  endDate: string;
  participants: number;
  badge: string;
  coverIcon: string;
};

export const challenges: Challenge[] = [
  {
    id: 1,
    title: '7-Day UI Sprint',
    description: 'Design one mobile screen every day for seven days. Build your portfolio and design thinking.',
    category: 'UI/UX Design',
    difficulty: 'Intermediate',
    startDate: 'Sep 8',
    endDate: 'Sep 14',
    participants: 124,
    badge: 'UI Sprinter',
    coverIcon: '🎨',
  },
  {
    id: 2,
    title: 'English Circle',
    description: 'Join daily voice practice sessions. Improve your English speaking in a friendly group.',
    category: 'Languages',
    difficulty: 'Beginner',
    startDate: 'Sep 5',
    endDate: 'Sep 11',
    participants: 89,
    badge: 'English Speaker',
    coverIcon: '🗣️',
  },
  {
    id: 3,
    title: 'Python Starter Week',
    description: 'Complete five beginner Python exercises. Master fundamentals with mentor support.',
    category: 'Technology',
    difficulty: 'Beginner',
    startDate: 'Sep 9',
    endDate: 'Sep 15',
    participants: 156,
    badge: 'Python Explorer',
    coverIcon: '🐍',
  },
];

// Messaging
export type Conversation = {
  id: number;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  skill?: string;
};

export const conversations: Conversation[] = [
  {
    id: 1,
    participantName: 'Nethmi Perera',
    lastMessage: 'Let us define the learning goal.',
    lastMessageTime: '2 hours ago',
    unread: true,
    skill: 'Figma systems',
  },
  {
    id: 2,
    participantName: 'Dilan Madushanka',
    lastMessage: 'Saturday evening works for me.',
    lastMessageTime: '5 hours ago',
    unread: false,
    skill: 'Python & data',
  },
  {
    id: 3,
    participantName: 'Community support',
    lastMessage: 'Welcome to SkillSwap Nexus.',
    lastMessageTime: '1 day ago',
    unread: false,
    skill: 'General help',
  },
];

// Testimonials
export type Testimonial = {
  id: number;
  author: string;
  role: string;
  content: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Dilini Senanayake',
    role: 'UI Designer',
    content:
      'SkillSwap LK connected me with an amazing Python developer. We both learned so much and now we mentor others on the platform!',
    rating: 5,
  },
  {
    id: 2,
    author: 'Roshan Kumar',
    role: 'Full-stack Developer',
    content:
      'Best platform in Sri Lanka for learning new skills without payment. The community is genuine and helpful.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Anushka Perera',
    role: 'Product Manager',
    content:
      "I've learned video editing and taught product thinking. SkillSwap's matching algorithm is seriously impressive.",
    rating: 5,
  },
];
