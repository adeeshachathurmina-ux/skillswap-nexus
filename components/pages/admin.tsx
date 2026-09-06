'use client';

import { motion } from 'framer-motion';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Ban,
  Settings,
  BarChart3,
  Zap,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui/index';

export function AdminPage() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '5,234' },
    { icon: CheckCircle2, label: 'Verified', value: '4,891' },
    { icon: AlertTriangle, label: 'Reports', value: '12' },
    { icon: TrendingUp, label: 'This Month Swaps', value: '1,247' },
  ];

  const recentReports = [
    {
      id: 1,
      reporter: 'Anon User',
      reported: 'Kasun Mendis',
      reason: 'Inappropriate language',
      status: 'Pending',
    },
    {
      id: 2,
      reporter: 'User #1234',
      reported: 'Unknown User',
      reason: 'Harassment',
      status: 'Under Review',
    },
    {
      id: 3,
      reporter: 'Community Team',
      reported: 'Banned Account',
      reason: 'Policy Violation',
      status: 'Resolved',
    },
  ];

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
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Manage users, reports, and platform content</p>
          </div>
          <Button variant="primary" onClick={() => window.location.assign('/admin')}>
            <Settings className="mr-2 inline" size={20} />
            Settings
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
            >
              <stat.icon className="mb-4 text-mint" size={28} />
              <p className="text-white/60 text-sm mb-1">{stat.label}</p>
              <p className="font-display text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reports Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-yellow-400" size={24} />
              Recent Reports
            </h2>
            <div className="space-y-4">
              {recentReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-white">{report.reported}</p>
                      <p className="text-xs text-white/50">
                        Reported by {report.reporter}
                      </p>
                    </div>
                    <Badge
                      variant={
                        report.status === 'Resolved'
                          ? 'success'
                          : report.status === 'Under Review'
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{report.reason}</p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => window.location.assign('/admin')}>
                      Review
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => window.location.assign('/admin')}>
                      <Ban size={16} className="mr-1 inline" />
                      Ban User
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm"
          >
            <h2 className="font-display text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { icon: Users, label: 'Manage Users', action: 'users' },
                { icon: Zap, label: 'Review Challenges', action: 'challenges' },
                { icon: MessageSquare, label: 'Moderate Content', action: 'content' },
                { icon: BarChart3, label: 'View Analytics', action: 'analytics' },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-mint/40 hover:bg-mint/5 transition-all text-left"
                >
                  <action.icon className="text-mint flex-shrink-0" size={20} />
                  <span className="font-semibold text-white">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
