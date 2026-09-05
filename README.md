# SkillSwap Nexus

A cinematic reciprocal skill-exchange application built with Next.js, React, TypeScript, Tailwind CSS and Framer Motion.

## Run in GitHub Codespaces

```bash
npm install
npm run dev
```

Open forwarded port 3000.

## Production check

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Upload the project contents to a new GitHub repository.
2. Import the repository in Vercel.
3. Keep the detected Next.js defaults.
4. Deploy. Demo Mode requires no environment variables.

## Connect Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in SQL Editor.
3. Create `.env.local` from `.env.example`.
4. Insert the Project URL and public anon/publishable key.
5. Implement cloud queries where the current demo API routes are used.

Never commit `.env.local`, database passwords or service-role keys.

## Included experience

- Cinematic hero and premium responsive UI
- Framer Motion entry and filtering animations
- Search and category discovery
- Next.js GET and POST API routes
- Demo profile persistence
- Dashboard, challenges and messages previews
- Supabase-ready schema and RLS starter policies
- Vercel-ready project structure

## Portfolio honesty

The included people, percentages and activity are demonstration data. Until Supabase authentication and cloud writes are connected and tested, describe this as a full-stack interactive prototype or launch foundation.
