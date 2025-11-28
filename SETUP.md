# Setup Instructions

## Setting up Convex Auth

The `AUTH_PASSWORD_ID` and `AUTH_PASSWORD_ISSUER` errors occur because Convex Auth needs to be configured in your Convex deployment.

### Solution

You need to set the environment variables in your Convex deployment using the Convex CLI:

```bash
npx convex env set AUTH_PASSWORD_ID password
npx convex env set AUTH_PASSWORD_ISSUER password
```

These tell Convex Auth to use "password" as the ID and issuer for the Password authentication provider.

### Complete Setup Steps

1. **Initialize Convex**
   ```bash
   npx convex dev
   ```

2. **Set the Auth Password environment variables**
   ```bash
   npx convex env set AUTH_PASSWORD_ID password
   npx convex env set AUTH_PASSWORD_ISSUER password
   ```

   Or use the helper script:
   ```bash
   ./setup-auth.sh
   ```

3. **Generate and set the Auth Private Key**
   ```bash
   npx @convex-dev/auth
   ```

   This will generate a private key. Copy it and set it:
   ```bash
   npx convex env set CONVEX_AUTH_PRIVATE_KEY "your-generated-key"
   ```

4. **Create your `.env.local` file**
   ```bash
   cp .env.local.example .env.local
   ```

   The Convex variables will be automatically filled in. You only need to add:
   ```env
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=your-mailgun-domain
   MAILGUN_FROM_EMAIL=noreply@yourdomain.com
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the app**
   - Home: http://localhost:3000
   - Admin: http://localhost:3000/admin

## For Production Deployment

When deploying to production (Vercel), you'll need to:

1. **Deploy Convex to production**
   ```bash
   npx convex deploy
   ```

2. **Set production environment variables in Convex**
   ```bash
   npx convex env set AUTH_PASSWORD_ID password --prod
   npx convex env set AUTH_PASSWORD_ISSUER password --prod
   npx convex env set CONVEX_AUTH_PRIVATE_KEY "your-key" --prod
   ```

3. **Set environment variables in Vercel**
   - `NEXT_PUBLIC_CONVEX_URL` (from Convex dashboard)
   - `CONVEX_DEPLOYMENT` (from Convex dashboard)
   - `MAILGUN_API_KEY`
   - `MAILGUN_DOMAIN`
   - `MAILGUN_FROM_EMAIL`

## Troubleshooting

If you still see the `AUTH_PASSWORD_ID` or `AUTH_PASSWORD_ISSUER` errors:

1. Make sure you ran both commands:
   - `npx convex env set AUTH_PASSWORD_ID password`
   - `npx convex env set AUTH_PASSWORD_ISSUER password`
2. Restart your Convex dev server
3. Check that the environment variables are set with: `npx convex env ls`
