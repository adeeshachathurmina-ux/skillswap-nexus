'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MessageCircle, Heart } from 'lucide-react';
import type { Person } from '@/lib/data';
import { Button, Input, Badge } from '@/components/ui/index';

interface SwapRequestModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: any) => void;
}

export function SwapRequestModal({
  person,
  isOpen,
  onClose,
  onSubmit,
}: SwapRequestModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    message: '',
    proposedDate: '',
    proposedTime: '',
    sessionType: person.sessionType || 'Online',
  });

  const handleSubmit = () => {
    if (step === 3) {
      onSubmit(formData);
      setStep(1);
      setFormData({
        message: '',
        proposedDate: '',
        proposedTime: '',
        sessionType: person.sessionType || 'Online',
      });
      onClose();
    } else {
      setStep(step + 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl"
      >
        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-mint' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="font-display text-2xl font-bold mb-2">Send a request</h2>
            <p className="text-white/60 mb-6">
              Tell {person.name} why you'd like to learn {person.teach}
            </p>

            <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
              <div
                className={`h-12 w-12 rounded-full bg-gradient-to-br ${person.colour} flex items-center justify-center text-white font-bold flex-shrink-0`}
              >
                {person.initials}
              </div>
              <div>
                <p className="font-semibold text-white">{person.name}</p>
                <p className="text-sm text-white/60">
                  Teaches {person.teach} · Wants to learn {person.learn}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Your message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Hi! I'd love to learn Figma from you. I can teach you React in return..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition-all focus:border-mint focus:bg-white/10 placeholder-white/40 resize-none"
                  rows={4}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="font-display text-2xl font-bold mb-2">Suggest a time</h2>
            <p className="text-white/60 mb-6">
              Propose when you're available for your first session
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Proposed date
                </label>
                <input
                  type="date"
                  value={formData.proposedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, proposedDate: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition-all focus:border-mint focus:bg-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Proposed time
                </label>
                <input
                  type="time"
                  value={formData.proposedTime}
                  onChange={(e) =>
                    setFormData({ ...formData, proposedTime: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition-all focus:border-mint focus:bg-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Session type
                </label>
                <div className="space-y-2">
                  {(['Online', 'In-person', 'Hybrid'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, sessionType: type })}
                      className={`w-full rounded-xl p-3 text-left font-semibold transition-all ${
                        formData.sessionType === type
                          ? 'border-mint bg-mint/20 text-mint'
                          : 'border border-white/10 bg-white/5 text-white hover:border-mint/40'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/60 mb-2">
                  <strong className="text-white">💡 Tip:</strong> Be flexible! The more
                  available times you suggest, the higher your chance of matching.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Review your request</h2>

            <div className="space-y-4 mb-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60 mb-1">Message</p>
                <p className="text-white">{formData.message || 'No message added'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/60 mb-1 flex items-center gap-1">
                    <Calendar size={14} /> Date
                  </p>
                  <p className="text-white font-semibold">
                    {formData.proposedDate || 'Not specified'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/60 mb-1 flex items-center gap-1">
                    <Clock size={14} /> Time
                  </p>
                  <p className="text-white font-semibold">
                    {formData.proposedTime || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60 mb-2">Session type</p>
                <Badge variant="success">{formData.sessionType}</Badge>
              </div>

              <div className="rounded-2xl border border-mint/30 bg-mint/10 p-4">
                <p className="text-sm text-mint">
                  ✓ {person.name} will receive your request and can accept or decline within
                  24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button variant="primary" className="flex-1" onClick={handleSubmit}>
            {step === 3 ? 'Send Request' : 'Continue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
