'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  BookOpen,
  Award,
  Clock,
  Users,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui/index';

const skillCategories = [
  '🚀 Technology',
  '🎨 Design',
  '🗣️ Languages',
  '💼 Business',
  '📸 Photography',
  '🎵 Music',
  '📝 Writing',
  '🎓 Academic',
  '⚽ Sports',
  '🍳 Cooking',
];

const districts = [
  'Colombo',
  'Galle',
  'Kandy',
  'Kurunegala',
  'Matara',
  'Jaffna',
  'Online',
];

interface OnboardingProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    teach: [] as string[],
    learn: [] as string[],
    bio: '',
    skillLevel: 'Beginner',
    sessionType: 'Online',
    availability: '',
  });

  const handleAddSkill = (skill: string, type: 'teach' | 'learn') => {
    setFormData((prev) => {
      const skills = prev[type];
      if (skills.includes(skill)) {
        return { ...prev, [type]: skills.filter((s) => s !== skill) };
      } else if (skills.length < 3) {
        return { ...prev, [type]: [...skills, skill] };
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.district !== '';
      case 3:
        return formData.teach.length > 0 && formData.learn.length > 0;
      case 4:
        return formData.bio.trim() !== '';
      case 5:
        return formData.availability.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-mint' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-white/60">
            Step {step} of 5
          </p>
        </div>

        {/* Steps */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          {step === 1 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">
                Welcome to SkillSwap LK
              </h2>
              <p className="text-white/60 mb-6">
                Let's set up your profile. First, what's your full name?
              </p>
              <Input
                label="Full name"
                placeholder="e.g. Nethmi Perera"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">
                Where are you based?
              </h2>
              <p className="text-white/60 mb-6">
                This helps us find nearby skill partners
              </p>
              <div className="space-y-2">
                {districts.map((district) => (
                  <motion.button
                    key={district}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() =>
                      setFormData({ ...formData, district })
                    }
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      formData.district === district
                        ? 'bg-mint text-ink'
                        : 'border border-white/10 bg-white/5 text-white hover:border-mint/40'
                    }`}
                  >
                    <MapPin size={18} />
                    {district}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">
                Your skills
              </h2>

              <div>
                <p className="text-sm font-semibold text-white mb-3">
                  I can teach (select up to 3)
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {skillCategories.map((skill) => (
                    <motion.button
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => handleAddSkill(skill, 'teach')}
                      className={`text-sm py-2 px-3 rounded-lg font-semibold transition-all ${
                        formData.teach.includes(skill)
                          ? 'bg-violet text-white'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-violet/40'
                      }`}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-3">
                  I want to learn (select up to 3)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {skillCategories.map((skill) => (
                    <motion.button
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => handleAddSkill(skill, 'learn')}
                      className={`text-sm py-2 px-3 rounded-lg font-semibold transition-all ${
                        formData.learn.includes(skill)
                          ? 'bg-mint text-ink'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-mint/40'
                      }`}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">
                Tell us about yourself
              </h2>
              <p className="text-white/60 mb-6">
                A short bio helps skill partners get to know you
              </p>
              <Input
                label="Bio"
                placeholder="e.g. Full-stack developer passionate about mentoring"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                autoFocus
              />

              <div className="mt-6">
                <label className="block text-sm font-semibold text-white mb-3">
                  Skill level
                </label>
                <div className="space-y-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(
                    (level) => (
                      <motion.button
                        key={level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() =>
                          setFormData({ ...formData, skillLevel: level })
                        }
                        className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                          formData.skillLevel === level
                            ? 'bg-mint text-ink'
                            : 'border border-white/10 bg-white/5 text-white hover:border-mint/40'
                        }`}
                      >
                        {level}
                      </motion.button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">
                When are you available?
              </h2>
              <p className="text-white/60 mb-6">
                Tell us your preferred times and session type
              </p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-3">
                  Session type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Online', 'In-person', 'Hybrid'] as const).map((type) => (
                    <motion.button
                      key={type}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() =>
                        setFormData({ ...formData, sessionType: type })
                      }
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                        formData.sessionType === type
                          ? 'bg-mint text-ink'
                          : 'border border-white/10 bg-white/5 text-white hover:border-mint/40'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              <Input
                label="Availability"
                placeholder="e.g. Weekdays 6-9 PM, Weekends anytime"
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
                icon={<Clock size={20} />}
              />

              <div className="mt-6 rounded-2xl border border-mint/30 bg-mint/10 p-4">
                <p className="text-sm text-mint flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 flex-shrink-0" size={18} />
                  Your profile is almost ready! Complete it to start finding skill partners.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="ghost" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isStepComplete()}
            className={`flex-1 ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {step === 5 ? 'Create Profile' : 'Continue'}
            <ChevronRight size={18} className="ml-2 inline" />
          </Button>
        </div>

        <button
          onClick={onSkip}
          className="w-full mt-4 text-white/60 hover:text-white transition-colors text-sm font-semibold"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}
