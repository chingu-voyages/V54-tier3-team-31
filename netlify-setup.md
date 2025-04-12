# Netlify Deployment Setup Guide

## Required Environment Variables

Set the following environment variables in your Netlify site settings (`Site settings` > `Build & deploy` > `Environment` > `Environment variables`):

1. `DATABASE_URL` - Your Neon database connection URL
   - Make sure the database is accessible from Netlify's servers (allow all IPs or whitelist Netlify's IPs)
   - Example format: `postgres://user:password@dbhost:port/database`

2. `NEXTAUTH_URL` - Set to your Netlify URL, without trailing slash
   - Example: `https://goalflow-habits.netlify.app`

3. `AUTH_SECRET` - A secure random string for authentication encryption
   - Generate with `openssl rand -base64 32` or similar

4. `AUTH_GOOGLE_ID` - Your Google OAuth client ID

5. `AUTH_GOOGLE_SECRET` - Your Google OAuth client secret

6. `AUTH_TRUST_HOST` - Set to `true`

## Troubleshooting

If you encounter issues after setting these variables:

1. Verify database connectivity by attempting a direct connection from your local machine
2. Check that your Google OAuth credentials have the correct redirect URI: `https://goalflow-habits.netlify.app/api/auth/callback/google`
3. Try rebuilding and redeploying after setting all environment variables
4. Check Netlify function logs for more specific error details 