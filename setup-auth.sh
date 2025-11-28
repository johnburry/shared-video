#!/bin/bash

# Setup script for Convex Auth
echo "🔧 Setting up Convex Auth..."
echo ""

# Set the Password provider ID
echo "Setting AUTH_PASSWORD_ID..."
npx convex env set AUTH_PASSWORD_ID password

echo ""
echo "Setting AUTH_PASSWORD_ISSUER..."
npx convex env set AUTH_PASSWORD_ISSUER password

echo ""
echo "✅ Password provider environment variables are set!"
echo ""
echo "⚠️  Next steps:"
echo "1. Generate an auth private key with: npx @convex-dev/auth"
echo "2. Copy the generated key"
echo "3. Run: npx convex env set CONVEX_AUTH_PRIVATE_KEY \"your-key-here\""
echo ""
echo "After that, you can run: npm run dev"
