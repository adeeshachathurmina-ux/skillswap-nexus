'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  MessageSquare,
  BarChart3,
  Zap,
  MapPin,
  Star,
  Users,
  ArrowUpRight,
  Menu,
  X,
  Clock,
  Shield,
  Trophy,
  Sparkles,
  CheckCircle2,
  Heart,
  TrendingUp,
} from 'lucide-react';

import type { Person, Challenge, Conversation, QuickHelpRequest } from '@/lib/data';
import {
  people,
  challenges,
  conversations,
  quickHelpRequests,
  testimonials,
} from '@/lib/data';
import { Header } from '@/components/ui/header';
import { SkillCard } from '@/components/ui/skill-card';
import { Modal } from '@/components/ui/modal';
import { Button, Badge, Input } from '@/components/ui/index';
import { Footer } from '@/components/ui/footer';
import { ToastContainer } from '@/components/ui/toast';
import { QuickHelpPage } from '@/components/pages/quick-help';
import { AdminPage } from '@/components/pages/admin';
import { SwapRequestModal } from '@/components/ui/swap-request-modal';
import { AuthNavigation } from '@/components/ui/auth-navigation';

type Page = 'home' | 'explore' | 'profile' | 'dashboard' | 'messages' | 'challenges' | 'admin' | 'help';

interface AppState {
  currentPage: Page;
  selectedPerson: Person | null;
  showProfileModal: boolean;
  showSwapModal: boolean;
  authMode: 'signin' | 'signup' | 'reset' | null;
  userProfile: any;
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  mobileMenuOpen: boolean;
  selectedCategory: string;
  searchQuery: string;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'home',
    selectedPerson: null,
    showProfileModal: false,
    showSwapModal: false,
    authMode: null,
    userProfile: null,
    toasts: [],
    mobileMenuOpen: false,
    selectedCategory: 'All',
    searchQuery: '',
  });

  // Load user profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('skillswap-profile');
    if (saved) {
      setState((s) => ({ ...s, userProfile: JSON.parse(saved) }));
    }
  }, []);

  const filteredPeople = useMemo(() => {
    return people.filter(
      (p) =>
        (state.selectedCategory === 'All' || p.category === state.selectedCategory) &&
        `${p.name} ${p.teach} ${p.learn}`
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
    );
  }, [state.selectedCategory, state.searchQuery]);

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Date.now().toString();
      setState((s) => ({
        ...s,
        toasts: [...s.toasts, { id, message, type }],
      }));
      setTimeout(() => {
        setState((s) => ({
          ...s,
          toasts: s.toasts.filter((t) => t.id !== id),
        }));
      }, 3000);
    },
    []
  );

  const handleConnect = useCallback(
    (person: Person) => {
      setState((s) => ({ ...s, selectedPerson: person, showSwapModal: true }));
    },
    [addToast]
  );

  const handleProfileSave = (formData: any) => {
    setState((s) => ({
      ...s,
      userProfile: formData,
      showProfileModal: false,
    }));
    addToast('Profile saved successfully!', 'success');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Quick Help', href: '/help' },
    { label: 'Challenges', href: '/challenges' },
    { label: 'Messages', href: '/messages' },
    { label: 'Requests', href: '/requests' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white selection:bg-mint selection:text-ink">
      <ToastContainer
        toasts={state.toasts}
        onClose={(id) =>
          setState((s) => ({
            ...s,
            toasts: s.toasts.filter((t) => t.id !== id),
          }))
        }
      />

      {/* Navigation */}
      {state.currentPage !== 'home' && (
        <>
          <Header
            logoText="SkillSwap"
            links={navLinks}
            dark={true}
          />
          <div className="h-20" />
        </>
      )}

      {/* Pages */}
      <AnimatePresence mode="wait">
        {state.currentPage === 'home' && (
          <HomePage
            key="home"
            onExplore={() => setState((s) => ({ ...s, currentPage: 'explore' }))}
            onGetStarted={() => window.location.assign('/auth/sign-up')}
            onSignIn={() => window.location.assign('/auth/sign-in')}
          />
        )}

        {state.currentPage === 'explore' && (
          <ExplorePage
            key="explore"
            people={filteredPeople}
            selectedCategory={state.selectedCategory}
            searchQuery={state.searchQuery}
            onCategoryChange={(cat) =>
              setState((s) => ({ ...s, selectedCategory: cat }))
            }
            onSearchChange={(q) => setState((s) => ({ ...s, searchQuery: q }))}
            onConnect={handleConnect}
            onViewProfile={(person) =>
              setState((s) => ({
                ...s,
                selectedPerson: person,
                currentPage: 'profile',
              }))
            }
          />
        )}

        {state.currentPage === 'profile' && state.selectedPerson && (
          <ProfilePage
            key="profile"
            person={state.selectedPerson}
            onBack={() => setState((s) => ({ ...s, currentPage: 'explore' }))}
            onConnect={() => setState((s) => ({ ...s, showSwapModal: true }))}
            onMessage={() => window.location.assign('/messages')}
          />
        )}

        {state.currentPage === 'dashboard' && (
          <DashboardPage
            key="dashboard"
            userProfile={state.userProfile}
            onEditProfile={() => setState((s) => ({ ...s, showProfileModal: true }))}
          />
        )}

        {state.currentPage === 'messages' && (
          <MessagesPage key="messages" />
        )}

        {state.currentPage === 'challenges' && (
          <ChallengesPage key="challenges" />
        )}

        {state.currentPage === 'help' && (
          <QuickHelpPage key="help" />
        )}

        {state.currentPage === 'admin' && (
          <AdminPage key="admin" />
        )}
      </AnimatePresence>

      {/* Modals */}
      <Modal
        isOpen={state.showProfileModal}
        onClose={() => setState((s) => ({ ...s, showProfileModal: false }))}
        title="Create Your Profile"
        description="Make your value instantly clear"
        size="lg"
      >
        <ProfileForm
          onSubmit={handleProfileSave}
          onCancel={() => setState((s) => ({ ...s, showProfileModal: false }))}
        />
      </Modal>

      {state.authMode && (
        <AuthModal
          mode={state.authMode}
          onClose={() => setState((s) => ({ ...s, authMode: null }))}
          onSubmit={(payload) => {
            setState((s) => ({ ...s, authMode: null, userProfile: payload, currentPage: 'explore' }));
            addToast('Welcome to SkillSwap LK!', 'success');
          }}
        />
      )}

      {state.selectedPerson && (
        <SwapRequestModal
          person={state.selectedPerson}
          isOpen={state.showSwapModal}
          onClose={() => setState((s) => ({ ...s, showSwapModal: false }))}
          onSubmit={async (request) => {
            const response = await fetch('/api/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ personId: state.selectedPerson?.id, receiverId: (state.selectedPerson as any)?.uuid, goal: request.message, message: request.message, sessionType: request.sessionType }) });
            if (response.ok) addToast(`Request sent to ${state.selectedPerson?.name}!`, 'success');
            else addToast('Your request could not be sent. Sign in or try again.', 'error');
            setState((s) => ({ ...s, showSwapModal: false }));
          }}
        />
      )}

      {/* Footer - only on home page */}
      {state.currentPage === 'home' && <Footer />}
    </main>
  );
}

// ============= HOME PAGE =============
function HomePage({
  onExplore,
  onGetStarted,
  onSignIn,
}: {
  onExplore: () => void;
  onGetStarted: () => void;
  onSignIn: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/20"
    >
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/65 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-xl font-bold text-white"
          >
            <span className="mr-3 inline-grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet to-purple-500 shadow-lg shadow-violet/40 text-white font-bold">
              S
            </span>
            SkillSwap <span className="text-mint">LK</span>
          </motion.div>

          <nav className="hidden gap-8 text-sm text-white/60 md:flex">
            <a href="#features" className="hover:text-mint transition-colors">
              How it works
            </a>
            <a href="#challenges" className="hover:text-mint transition-colors">
              Challenges
            </a>
            <a href="#community" className="hover:text-mint transition-colors">
              Community
            </a>
            <a href="#testimonials" className="hover:text-mint transition-colors">
              Testimonials
            </a>
          </nav>

          <AuthNavigation compact />
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-5">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="font-display text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-mint to-violet bg-clip-text text-transparent">
              Share what you know. Learn what you need.
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Your next skill is already in someone else's hands. Connect with learners and teachers in Sri Lanka's best skill-exchange community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={onExplore} variant="primary" size="lg">
                <Search className="mr-2 inline" size={20} />
                Find a Skill
              </Button>
              <Button onClick={onGetStarted} variant="secondary" size="lg">
                <Heart className="mr-2 inline" size={20} />
                Offer a Skill
              </Button>
            </div>

            {/* Match Preview Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 rounded-3xl border border-mint/30 bg-gradient-to-br from-mint/10 to-violet/10 p-8 backdrop-blur-xl max-w-2xl mx-auto"
            >
              <p className="text-sm font-bold text-mint mb-6 uppercase tracking-wider">
                ✨ How It Works
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  {
                    icon: User,
                    title: 'Create Profile',
                    desc: 'Tell us what you teach & want to learn',
                  },
                  {
                    icon: Sparkles,
                    title: 'Get Matched',
                    desc: 'We find your perfect skill partner',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Learn & Teach',
                    desc: 'Start your free skill exchange today',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <step.icon className="mx-auto mb-2 text-mint" size={28} />
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-white/50 mt-1">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="features" className="py-24 px-5 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl font-bold mb-4">Popular Skills</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Explore thousands of skills being taught and learned in Sri Lanka
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              '🚀 Technology',
              '🎨 Creative',
              '🗣️ Languages',
              '💼 Business',
              '📸 Photography',
              '🎯 Personal',
            ].map((cat, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-mint/40 hover:bg-mint/5 transition-all text-sm font-semibold text-white"
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl font-bold mb-4">
              Featured Skill Partners
            </h2>
            <p className="text-white/60">
              Meet some of our top-rated community members · Demo data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {people.slice(0, 3).map((person) => (
              <SkillCard
                key={person.id}
                person={person}
                onConnect={() => onExplore()}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Preview */}
      <section id="challenges" className="py-24 px-5 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl font-bold mb-4">
              Weekly Challenges
            </h2>
            <p className="text-white/60">
              Build habits, earn badges, connect with learners · Demo data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
              >
                <div className="text-5xl mb-4">{challenge.coverIcon}</div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm text-white/60 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{challenge.participants} participants</span>
                  <Badge variant="success">{challenge.difficulty}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-6">
            {[
                { icon: Users, value: '5,234', label: 'Active Learners · Demo data' },
                { icon: CheckCircle2, value: '2,456', label: 'Completed Swaps · Demo data' },
                { icon: Trophy, value: '98%', label: 'Success Rate · Demo data' },
                { icon: TrendingUp, value: 'Free', label: 'Forever · Product promise' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
              >
                <stat.icon className="mx-auto mb-4 text-mint" size={32} />
                <div className="font-display text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-5 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-white/60">
              Community stories · Demo data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-mint text-mint"
                      />
                    ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-xs text-white/50">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-mint/30 bg-gradient-to-r from-mint/10 to-violet/10 p-12 backdrop-blur-xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Shield className="mb-4 text-mint" size={40} />
                <h3 className="font-display text-3xl font-bold mb-4">
                  Your Safety Matters
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 text-mint flex-shrink-0" size={20} />
                    <span>Verified community members only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 text-mint flex-shrink-0" size={20} />
                    <span>In-person meeting guidelines</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 text-mint flex-shrink-0" size={20} />
                    <span>Report inappropriate behaviour</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 text-mint flex-shrink-0" size={20} />
                    <span>Secure messaging & data protection</span>
                  </li>
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-mint mb-4">98%</div>
                <p className="text-white/60">Safety sentiment · Demo data</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl font-bold mb-6">
              Ready to start learning?
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Join thousands of Sri Lankans sharing skills without paying money.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={onGetStarted} variant="primary" size="lg">
                Create Account
              </Button>
              <Button onClick={onSignIn} variant="outline" size="lg">
                Sign In
              </Button>
              <Button onClick={onExplore} variant="outline" size="lg">
                Browse Skills
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}

// ============= EXPLORE PAGE =============
interface ExplorePageProps {
  people: Person[];
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onConnect: (person: Person) => void;
  onViewProfile: (person: Person) => void;
}

function ExplorePage({
  people,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onConnect,
  onViewProfile,
}: ExplorePageProps) {
  const categories = [
    'All',
    'Technology',
    'Creative',
    'Languages',
    'Business',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      {/* Filters Section */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8">
          <Input
            icon={<Search size={20} />}
            placeholder="Search skills, names..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-violet to-purple-600 text-white shadow-lg shadow-violet/30'
                  : 'border border-white/20 text-white/60 hover:border-mint hover:text-mint'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="text-sm text-white/50 mt-4">
          Found {people.length} skill partner{people.length !== 1 ? 's' : ''}
        </div>
      </section>

      {/* Results Grid */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        {people.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <SkillCard
                key={person.id}
                person={person}
                onConnect={() => onConnect(person)}
                onViewProfile={() => onViewProfile(person)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Search size={48} className="mx-auto mb-4 text-white/30" />
            <h3 className="font-display text-2xl font-bold mb-2">
              No matches found
            </h3>
            <p className="text-white/60">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}

// ============= PROFILE PAGE =============
interface ProfilePageProps {
  person: Person;
  onBack: () => void;
  onConnect: (person: Person) => void;
  onMessage: () => void;
}

function ProfilePage({ person, onBack, onConnect, onMessage }: ProfilePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      <div className="mx-auto max-w-3xl px-5 py-8">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="mb-8 flex items-center gap-2 text-mint hover:text-mint/80 transition-colors"
        >
          <ArrowUpRight size={20} className="rotate-180" />
          Back to explore
        </motion.button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 mb-8 backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div
              className={`h-32 w-32 rounded-2xl bg-gradient-to-br ${person.colour} flex items-center justify-center text-5xl font-bold text-white shadow-2xl flex-shrink-0`}
            >
              {person.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-4xl font-bold">{person.name}</h1>
                {person.verified && (
                  <Badge variant="success">Verified</Badge>
                )}
              </div>
              <p className="text-white/60 mb-4">@{person.name.toLowerCase().replace(/\s+/g, '')}</p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-sm text-white/60">Location</p>
                  <p className="font-semibold text-white flex items-center gap-1">
                    <MapPin size={16} className="text-mint" />
                    {person.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Rating</p>
                  <p className="font-semibold text-white">
                    {person.rating} ⭐ ({person.reviews} reviews)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Completed Swaps</p>
                  <p className="font-semibold text-white">{person.completedSwaps} swaps</p>
                </div>
              </div>

              <p className="text-white/80 mb-6">{person.bio}</p>

              {/* Skills */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-violet/20 p-4">
                  <p className="text-xs text-white/60 mb-1">Teaching</p>
                  <p className="font-semibold text-white text-lg">{person.teach}</p>
                  <Badge variant="default" className="mt-2">
                    {person.skillLevel}
                  </Badge>
                </div>
                <div className="rounded-xl bg-mint/20 p-4">
                  <p className="text-xs text-white/60 mb-1">Learning</p>
                  <p className="font-semibold text-white text-lg">{person.learn}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-white/60 mb-1">Languages</p>
                  <p className="text-white">
                    {person.languages?.join(', ') || 'English, Sinhala'}
                  </p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Session Type</p>
                  <p className="text-white">{person.sessionType || 'Online'}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Availability</p>
                  <p className="text-white">{person.availability}</p>
                </div>
                <div>
                  <p className="text-white/60 mb-1">Badges</p>
                  <div className="flex gap-2 flex-wrap">
                    {person.badges?.map((badge, i) => (
                      <Badge key={i} variant="success">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button onClick={() => onConnect(person)} variant="primary">
                  <Heart className="mr-2 inline" size={20} />
                  Send Request
                </Button>
                <Button variant="outline" onClick={onMessage}>
                  <MessageSquare className="mr-2 inline" size={20} />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============= DASHBOARD PAGE =============
interface DashboardPageProps {
  userProfile: any;
  onEditProfile: () => void;
}

function DashboardPage({ userProfile, onEditProfile }: DashboardPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl font-bold mb-2">
            Welcome back, {userProfile?.name || 'learner'}!
          </h1>
          <p className="text-white/60">
            Here's your learning dashboard. Keep building your skills!
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Clock,
              title: 'Upcoming session',
              value: 'Figma fundamentals',
              desc: 'Saturday 2 PM',
            },
            {
              icon: MessageSquare,
              title: 'Unread messages',
              value: '2',
              desc: 'From skill partners',
            },
            {
              icon: Trophy,
              title: 'Trust score',
              value: 'Complete first swap',
              desc: 'to earn badges',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
            >
              <card.icon className="mb-4 text-mint" size={28} />
              <h3 className="font-bold text-white mb-1">{card.title}</h3>
              <p className="text-2xl font-display font-bold mb-2">{card.value}</p>
              <p className="text-sm text-white/50">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommended Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl font-bold mb-6">
            Recommended Matches
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.slice(0, 3).map((person) => (
              <SkillCard key={person.id} person={person} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============= MESSAGES PAGE =============
function MessagesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-8">
        <h1 className="font-display text-4xl font-bold mb-8">Messages</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversation List */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <Input
                  icon={<Search size={20} />}
                  placeholder="Search conversations..."
                />
              </div>
              <div className="divide-y divide-white/10 max-h-96 overflow-y-auto">
                {conversations.map((conv, i) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full text-left p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-white">{conv.participantName}</p>
                      {conv.unread && (
                        <span className="h-2 w-2 rounded-full bg-mint"></span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 truncate">
                      {conv.lastMessage}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{conv.lastMessageTime}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-white/10 bg-white/5 h-full flex flex-col min-h-96"
            >
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <MessageSquare className="mx-auto mb-4 text-white/20" size={48} />
                  <p className="text-white/60">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============= CHALLENGES PAGE =============
function ChallengesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Weekly Challenges</h1>
          <p className="text-white/60">
            Build habits, earn badges, and connect with the community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-mint/40 transition-all cursor-pointer group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {challenge.coverIcon}
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-white/60 mb-4">{challenge.description}</p>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Duration</span>
                  <span className="text-white">
                    {challenge.startDate} - {challenge.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Difficulty</span>
                  <Badge variant="success">{challenge.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Participants</span>
                  <span className="text-white">{challenge.participants}</span>
                </div>
              </div>

              <Button variant="primary" className="w-full" onClick={() => window.location.assign('/challenges')}>
                Join Challenge
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============= AUTH MODAL =============
interface AuthModalProps {
  mode: 'signin' | 'signup' | 'reset';
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function AuthModal({ mode, onClose, onSubmit }: AuthModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isSignUp = mode === 'signup';
  const isReset = mode === 'reset';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: isReset ? 'SkillSwap Member' : formData.name || 'SkillSwap Member',
      email: formData.email,
      password: formData.password,
      mode,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={isReset ? 'Reset password' : isSignUp ? 'Create your account' : 'Welcome back'}
      description={
        isReset
          ? 'We will send a secure reset link to your email.'
          : isSignUp
            ? 'Join the Sri Lankan skill-exchange community.'
            : 'Log in to continue swapping skills.'
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <Input
            label="Full name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        {!isReset && (
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        )}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/60">
          {isReset
            ? 'Password reset links are demo-only and will not send externally in this preview.'
            : 'By continuing, you agree to keep your learning sessions respectful and community-first.'}
        </div>

        <Button type="submit" variant="primary" className="w-full">
          {isReset ? 'Send reset link' : isSignUp ? 'Create account' : 'Sign in'}
        </Button>

        {!isReset && (
          <button
            type="button"
            onClick={() => onSubmit({ name: formData.name || 'SkillSwap Member', email: formData.email, password: formData.password, mode: 'reset' })}
            className="w-full text-center text-sm text-mint hover:text-mint/80 transition-colors"
          >
            Forgot password?
          </button>
        )}
      </form>
    </Modal>
  );
}

// ============= PROFILE FORM =============
interface ProfileFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    teach: '',
    learn: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('skillswap-profile', JSON.stringify(formData));
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full name"
        placeholder="Your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        label="City or online"
        placeholder="Where are you based?"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        required
      />
      <Input
        label="I can teach"
        placeholder="What skill can you teach?"
        value={formData.teach}
        onChange={(e) => setFormData({ ...formData, teach: e.target.value })}
        required
      />
      <Input
        label="I want to learn"
        placeholder="What skill do you want to learn?"
        value={formData.learn}
        onChange={(e) => setFormData({ ...formData, learn: e.target.value })}
        required
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          Save Profile
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

// Re-export for use icon
const User = Users;