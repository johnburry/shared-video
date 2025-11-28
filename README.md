# Real Estate Video Aggregation Platform

A Next.js application that aggregates video content from YouTube, Instagram, and TikTok for real estate agents, with email notifications for subscribers.

## Features

- **Video Showcase Pages**: Beautiful, modern landing pages for each realtor displaying their latest videos from multiple platforms
- **Email Subscriptions**: Visitors can subscribe to get notified of new video posts
- **Admin Dashboard**: Manage realtors, videos, and admin users
- **Authentication**: Secure admin access with Convex Auth
- **Email Notifications**: Automated email notifications via Mailgun showcasing new videos

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Convex (database, auth, serverless functions)
- **Email**: Mailgun
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Convex account ([convex.dev](https://convex.dev))
- A Mailgun account ([mailgun.com](https://mailgun.com))

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Set up Convex**

```bash
npx convex dev
```

This will:
- Create a new Convex project (or link to an existing one)
- Generate the necessary files
- Start the Convex development server

Follow the prompts to set up your Convex project.

3. **Configure Convex Auth (IMPORTANT)**

Set the required authentication environment variables:

```bash
npx convex env set AUTH_PASSWORD_ID password
npx convex env set AUTH_PASSWORD_ISSUER password
```

Generate and set the auth private key:

```bash
npx @convex-dev/auth
```

Copy the generated key and set it:

```bash
npx convex env set CONVEX_AUTH_PRIVATE_KEY "your-generated-key-here"
```

Or use the helper script:

```bash
./setup-auth.sh
```

4. **Configure local environment variables**

Create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

Fill in the values:

```env
# Convex (automatically filled by `npx convex dev`)
CONVEX_DEPLOYMENT=your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url

# Mailgun
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
MAILGUN_FROM_EMAIL=noreply@yourdomain.com
```

Note: The auth private key is set in Convex (step 3), not in `.env.local`.

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Setting Up Your First Admin User

You'll need to create your first admin user. After running `npx convex dev`, you can use Convex's built-in auth to sign up:

1. Go to `/admin`
2. The sign-in form supports both sign-in and sign-up flows
3. Create your first admin account

## Project Structure

```
├── app/
│   ├── r/[slug]/          # Realtor showcase pages
│   ├── admin/             # Admin dashboard
│   ├── ConvexClientProvider.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/             # Admin-specific components
│   ├── RealtorHero.tsx    # Realtor profile header
│   ├── VideoGrid.tsx      # Video display grid
│   └── SubscribeForm.tsx  # Email subscription form
├── convex/
│   ├── schema.ts          # Database schema
│   ├── auth.config.ts     # Authentication configuration
│   ├── realtors.ts        # Realtor queries/mutations
│   ├── videos.ts          # Video queries/mutations
│   ├── subscribers.ts     # Subscriber queries/mutations
│   ├── emails.ts          # Email notification actions
│   └── http.ts            # HTTP routes for auth
└── lib/
    ├── mailgun.ts         # Mailgun email utilities
    └── utils.ts           # Utility functions
```

## Usage

### Admin Dashboard

Access the admin dashboard at `/admin`. You'll need to sign in with your admin credentials.

#### Managing Realtors

1. Click the "Realtors" tab
2. Click "Add Realtor" to create a new realtor
3. Fill in the details (name, slug, email, phone, bio, photo URL)

#### Managing Videos

1. Click the "Videos" tab
2. Select a realtor from the dropdown
3. Click "Add Video" to add a new video
4. Fill in the video details (platform, title, URL, thumbnail, etc.)

### Realtor Pages

Each realtor has a public page at `/r/[slug]` that displays:
- Profile information and contact details
- Email subscription form
- Latest videos from each platform (YouTube, Instagram, TikTok)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy!

### Deploy Convex

```bash
npx convex deploy
```

## License

MIT
