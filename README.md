# SkillSwap LK

A premium skill-exchange community platform for Sri Lanka, built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

**Tagline:** Share what you know. Learn what you need.  
**Supporting message:** Your next skill is already in someone else's hands.

## ✨ Features

### Landing Page
- Premium sticky navigation
- Hero section with animated gradient text
- Call-to-action buttons (Find a Skill / Offer a Skill)
- How it works section with 3-step process
- Popular skill categories showcase
- Featured skill partners gallery
- Weekly challenges preview
- Platform statistics (5,234 learners, 2,456 completed swaps, 98% success rate)
- Trust & safety information
- Success stories & testimonials
- Final call-to-action section
- Professional footer

### Authentication & Onboarding
- Multi-step profile creation (5 steps)
- Name, location, skills (teaching & learning), bio, and availability
- Skill categories: Technology, Design, Languages, Business, Photography, Music, Writing, Academic, Sports, Cooking
- District selection for location-based matching
- Skill level selection (Beginner, Intermediate, Advanced)
- Session type preference (Online, In-person, Hybrid)

### Explore / Discover Skills
- Search functionality with real-time filtering
- Category-based filtering
- Responsive skill cards with:
  - User avatar and verification status
  - Match percentage
  - Skills offered and wanted
  - Ratings and review count
  - Completed swap count
  - Quick action buttons (View Profile, Send Request)
- Grid and list view options
- Empty states with helpful messaging

### User Profiles
- Detailed profile view with:
  - Large avatar with gradient colors
  - User name and verification badge
  - Location with icon
  - Detailed rating and review information
  - Completed swaps count
  - Personal bio
  - Teaching and learning skills
  - Languages spoken
  - Session type preference
  - Availability information
  - Earned badges
  - Send Request button
  - Message button

### Swap Request Flow
- 3-step modal workflow:
  1. Write a message explaining interest
  2. Propose date, time, and session type
  3. Review and confirm request
- Progress indicator
- Back/Continue navigation
- Form validation

### Dashboard
- Welcome message with user's name
- Upcoming session card
- Unread messages indicator
- Trust score progress
- Recommended matches section
- Recent activity preview

### Messaging
- Conversation list with search
- User avatars and last message preview
- Unread indicators
- Timestamps
- Empty state when no conversation selected

### Weekly Challenges
- Challenge cards with:
  - Cover emoji icon
  - Title and description
  - Difficulty level badge
  - Duration information
  - Participant count
  - Join button
- Multiple active challenges
- Categories and progress tracking

### Quick Help
- Fast help requests for small problems
- Categories: Technology, UI/UX Design, Career Development, Languages, Photography
- Help request cards showing:
  - Title and description
  - Urgency level
  - Estimated time
  - Points offered
  - Status (Open, Helper Found, Solved)
  - Number of responses
- Post help request button
- Request status tracking

### Admin Dashboard
- User management
- Report management
- Platform statistics
- Quick actions
- Report moderation interface
- Ban user functionality

## 🎨 Design System

### Color Palette
- **Primary Purple/Violet:** #8064FF
- **Mint Green:** #79F7D4
- **Dark Background (ink):** #08070D
- **Coral Accent:** #FF7468
- **Off-white/Light:** #F9F8F6

### Typography
- **Display Font:** Space Grotesk (headings)
- **Body Font:** Inter (body text)

### Components
- Animated buttons with hover states
- Rounded cards with subtle glass morphism
- Toast notifications (success, error, info)
- Modal dialogs with backdrop blur
- Input fields with icons
- Badges for status indicators
- Progress indicators
- Animated transitions with Framer Motion

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Import repository in Vercel dashboard
3. Deploy (no environment variables needed for demo mode)

### Custom Server

```bash
npm run build
npm run start
# Server runs on port 3000
```

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

- **8 User Profiles** with realistic Sri Lankan names, districts, skills, and ratings
- **3 Weekly Challenges** with categories and difficulty levels
- **3 Conversations** with last messages and timestamps
- **3 Quick Help Requests** with various statuses
- **3 Testimonials** with ratings and real feedback

All mock data is clearly labeled and stored in `/lib/data.ts`.

## 🔐 Supabase Integration Ready

The project is fully configured for Supabase integration:

### To connect Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_skill_swap.sql` in your SQL Editor:
   ```sql
   -- Includes: profiles, swap_requests, messages, reviews, notifications
   -- With RLS policies for security
   ```
3. Create `.env.local` from `.env.example`
4. Add the variables from `.env.example`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
5. Follow the manual dashboard steps and requirement checklist in `docs/PRODUCTION_CHECKLIST.md`.

**Important:** Never commit `.env.local`, database credentials, or service-role keys. Without Supabase variables, the app runs in clearly labeled Demo Mode with in-memory data.

## 📱 Responsive Design

- **Mobile:** Optimized touch targets, collapsed navigation
- **Tablet:** Adjusted grid layouts (2-3 columns)
- **Desktop:** Full multi-column layouts with sidebars

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for form inputs
- Keyboard navigation support
- High contrast text
- Visible focus states
- Alt text for meaningful images

## 🛠 Technology Stack

- **Framework:** Next.js 15.5.25 with App Router
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.17
- **Animation:** Framer Motion 12.23.22
- **Icons:** Lucide React 0.544.0
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (ready to integrate)

## 📦 Project Structure

```
skillswap-nexus/
├── app/
│   ├── api/              # API routes (matches, requests)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── app.tsx           # Main app component with all pages
│   ├── ui/               # Reusable UI components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── skill-card.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   ├── index.tsx     # Button, Badge, Input
│   │   └── ...
│   └── pages/            # Page components
│       ├── quick-help.tsx
│       ├── admin.tsx
│       └── onboarding.tsx
├── lib/
│   └── data.ts           # Mock data and types
├── public/               # Static assets
├── supabase/
│   └── schema.sql        # Database schema
└── tailwind.config.ts    # Tailwind configuration
```

## 🎯 Key User Journeys

### Browse & Connect
1. Visit landing page → Explore skills → Browse profiles → View details → Send request → Accept/decline → Message → Schedule session

### Get Help
1. View Quick Help → Browse requests → Respond to request → Provide help → Accept points

### Challenge Participation
1. View challenges → Join challenge → Complete tasks → Earn badge

### Admin Moderation
1. Dashboard → View reports → Review content → Take action → Update status

## 🔄 API Endpoints

- **GET /api/matches** - Get skill profiles for discovery (supports demo and cloud modes)
- **POST /api/requests** - Create a swap request
- **GET /api/requests** - Get user's swap requests

## 🎓 Learning & Teaching Levels

- **Beginner** - Just starting out
- **Intermediate** - Some experience
- **Advanced** - Expert level

## 📈 Future Enhancements

- [ ] Real-time messaging with notifications
- [ ] Video calling integration
- [ ] Payment processing for premium features
- [ ] Mobile app (React Native)
- [ ] Internationalization (Sinhala, Tamil)
- [ ] Advanced matching algorithm
- [ ] Skill progress tracking
- [ ] Certificate generation
- [ ] Ratings & reviews moderation
- [ ] Community guidelines enforcement

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

Community contributions welcome! Please follow existing code style and create feature branches.

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the team.

---

**Made with ❤️ for Sri Lanka's learning community**

The included people, percentages and activity are demonstration data. Until Supabase authentication and cloud writes are connected and tested, describe this as a full-stack interactive prototype or launch foundation.
