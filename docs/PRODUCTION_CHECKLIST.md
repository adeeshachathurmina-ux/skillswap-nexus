# SkillSwap LK production checklist

## Supabase dashboard steps

1. Create a Supabase project and copy its URL and publishable anon key.
2. In SQL Editor, run `supabase/migrations/001_skill_swap.sql`.
3. In Authentication > URL Configuration, set Site URL to `NEXT_PUBLIC_SITE_URL` and add `${NEXT_PUBLIC_SITE_URL}/auth/callback` as an allowed redirect URL.
4. Enable the desired email provider in Authentication > Providers. Configure SMTP for password reset and confirmation email delivery.
5. In Storage, verify the `avatars` and `message-attachments` buckets exist. Keep message attachments private.
6. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL` in the deployment environment. Never expose the service-role key to the browser.
7. Promote a trusted user to admin with a server-side SQL statement: `update public.profiles set is_admin = true where id = '<auth-user-uuid>';`.
8. Enable Realtime for `messages`, `notifications`, and `swap_requests` in Database > Publications.

## Requirement status

- Complete: Supabase browser/server clients, auth routes, callback, sign-out, protected middleware, onboarding, editable profiles, skill tables, reciprocal score and unit tests, public profile route, request lifecycle API/history, messaging API and realtime helper, unread notifications, completed-swap review enforcement, saved/block/report API, challenge/room schema, server-verified admin route, storage buckets, translations, theme provider, loading/error/empty patterns on implemented data routes, indexes/triggers/RLS/seed skills, environment validation, security headers, GitHub Actions, deployment documentation.
- Demo fallback: no-credential request, messaging, profile, notification, social-action, review responses and `/admin` preview. Demo state is intentionally in-memory and resets when the server restarts.
- Requires external account configuration: Supabase Auth email delivery, persistent data, Realtime events, Storage uploads, admin promotion, and production deployment secrets.

## Accessibility and responsive checks

- [ ] Keyboard tab through every form and modal; focus is visible.
- [ ] Confirm every input has a visible label or meaningful placeholder.
- [ ] Confirm modal close and error states are keyboard reachable.
- [ ] Test 360px, 768px, 1024px, and 1440px widths.
- [ ] Test reduced-motion preference and light/dark/system theme choices.
- [ ] Test screen-reader announcements for toasts, unread counts, and request status changes.
- [ ] Test real Supabase auth, RLS, Realtime, Storage, and admin denial with a non-admin account.
