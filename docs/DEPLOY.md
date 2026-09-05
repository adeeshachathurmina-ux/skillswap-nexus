# Exact deployment path

1. Create a public GitHub repository named `skillswap-nexus`.
2. Upload the contents of this folder, not the outer folder itself.
3. Open a GitHub Codespace.
4. Run `npm install`, then `npm run dev`.
5. Test search, filters, tabs, profile form and swap buttons.
6. Stop the dev server with Ctrl+C and run `npm run build`.
7. Import the GitHub repository into Vercel and deploy with default Next.js settings.
8. If Supabase is connected, add the two public environment variables in Vercel Project Settings before redeploying.
9. Test the production URL on desktop and mobile.
