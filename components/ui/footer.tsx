'use client';

import { Heart, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 font-display text-2xl font-bold">
              SkillSwap <span className="text-mint">LK</span>
            </div>
            <p className="text-sm text-white/60">
              Share what you know. Learn what you need.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Explore skills
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Challenges
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Safety tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-mint transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-full border border-white/20 p-2 hover:border-mint hover:text-mint transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/20 p-2 hover:border-mint hover:text-mint transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/20 p-2 hover:border-mint hover:text-mint transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
          <p>© {currentYear} SkillSwap LK. Made with <Heart size={14} className="inline text-coral" /> in Sri Lanka.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="#" className="hover:text-mint transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-mint transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-mint transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
