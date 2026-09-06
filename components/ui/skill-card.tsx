'use client';

import { motion } from 'framer-motion';
import type { Person } from '@/lib/data';
import { Star, MapPin, Zap, User } from 'lucide-react';

interface SkillCardProps {
  person: Person;
  onConnect?: (person: Person) => void;
  onViewProfile?: (person: Person) => void;
}

export function SkillCard({
  person,
  onConnect,
  onViewProfile,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-sm transition-all hover:border-mint/40"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-12 rounded-full bg-gradient-to-br ${person.colour} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
          >
            {person.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white">{person.name}</h3>
              {person.verified && (
                <span className="h-4 w-4 rounded-full bg-mint" title="Verified"></span>
              )}
            </div>
            <p className="text-xs text-white/50 flex items-center gap-1">
              <MapPin size={12} /> {person.city}
            </p>
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right">
          <div className="text-2xl font-bold text-mint">{person.match}%</div>
          <p className="text-xs text-white/50">Match</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4 space-y-2">
        <div className="rounded-xl bg-violet/20 p-2 px-3">
          <p className="text-xs text-white/60">Teaching</p>
          <p className="font-semibold text-white">{person.teach}</p>
        </div>
        <div className="rounded-xl bg-mint/20 p-2 px-3">
          <p className="text-xs text-white/60">Learning</p>
          <p className="font-semibold text-white">{person.learn}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-4 flex items-center gap-4 border-t border-white/10 pt-3 text-sm">
        {person.rating && (
          <div className="flex items-center gap-1">
            <Star size={14} className="text-mint" fill="currentColor" />
            <span className="text-white">{person.rating}</span>
            <span className="text-white/40">({person.reviews})</span>
          </div>
        )}
        {person.completedSwaps && (
          <div className="flex items-center gap-1">
            <Zap size={14} className="text-yellow-400" />
            <span className="text-white">{person.completedSwaps} swaps</span>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewProfile?.(person)}
          className="flex-1 rounded-full border border-mint/40 py-2 text-sm font-semibold text-mint transition-all hover:bg-mint/10"
        >
          Profile
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onConnect?.(person)}
          className="flex-1 rounded-full bg-gradient-to-r from-violet to-purple-600 py-2 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition-all hover:shadow-xl hover:shadow-violet/40"
        >
          Request
        </motion.button>
      </div>
    </motion.div>
  );
}
