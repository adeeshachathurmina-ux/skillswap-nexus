'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  MessageCircle,
  Clock,
  AlertCircle,
  CheckCircle2,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import type { QuickHelpRequest } from '@/lib/data';
import { quickHelpRequests } from '@/lib/data';
import { Button, Badge, Input } from '@/components/ui/index';

interface QuickHelpPageProps {
  onViewRequest?: (request: QuickHelpRequest) => void;
}

export function QuickHelpPage({ onViewRequest }: QuickHelpPageProps) {
  const categoriesCount = {
    Technology: 45,
    'UI/UX Design': 28,
    'Career Development': 15,
    Languages: 92,
    Photography: 12,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-ink via-ink to-violet/10"
    >
      <div className="mx-auto max-w-7xl px-5 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl font-bold mb-2">Quick Help</h1>
          <p className="text-white/60">
            Get fast answers to small questions without committing to full learning sessions
          </p>
        </motion.div>

        {/* Post Help Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Button variant="primary" size="lg" className="w-full md:w-auto">
            <Zap className="mr-2 inline" size={20} />
            Post a Help Request (Demo Mode)
          </Button>
        </motion.div>

        {/* Active Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold mb-6">Recent Requests</h2>
          <div className="space-y-4">
            {quickHelpRequests.map((request, i) => (
              <motion.button
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onViewRequest?.(request)}
                className="w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm hover:border-mint/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-bold">{request.title}</h3>
                  <Badge
                    variant={
                      request.status === 'Solved'
                        ? 'success'
                        : request.status === 'Helper Found'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>

                <p className="text-white/60 mb-4">{request.description}</p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm text-white/50">
                    <AlertCircle size={16} className="text-yellow-400" />
                    {request.urgency}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/50">
                    <Clock size={16} className="text-mint" />
                    {request.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/50">
                    <Zap size={16} className="text-orange-400" />
                    {request.pointsOffered} points
                  </div>
                  {request.responses && (
                    <div className="flex items-center gap-1 text-sm text-white/50">
                      <MessageCircle size={16} className="text-violet" />
                      {request.responses} responses
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/40">
                    by {request.author} • {request.createdAt}
                  </p>
                  <ArrowUpRight size={18} className="text-mint" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold mb-6">Help by Category</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(categoriesCount).map(([category, count], i) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center hover:border-mint/40 transition-all"
              >
                <p className="font-display text-3xl font-bold text-mint mb-2">
                  {count}
                </p>
                <p className="font-semibold text-white text-sm">{category}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
