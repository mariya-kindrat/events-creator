# AWS Amplify Deployment Guide

## Current Issue Resolution

The deployment is failing because:

1. Using `buildspec.yml` (CodeBuild) instead of `amplify.yml` (Amplify)
2. Environment variables not properly configured in Amplify Console
3. SSM Parameter Store setup issues

## Steps to Fix

### 1. Environment Variables Setup

Go to AWS Amplify Console → Your App → App Settings → Environment Variables

Add these environment variables exactly as shown:

```
NODE_ENV=production
DATABASE_URL=postgresql://neondb_owner:npg_JGD6lOUwupQ7@ep-bitter-mode-ad0d7wx5-pooler.c-2.us-east-1.aws.neon.tech/event_db?sslmode=require&channel_binding=require
NEXTAUTH_URL=https://master.d16jh2qsui6dp9.amplifyapp.com/
NEXTAUTH_SECRET=5112537ca6966f1a63260d61b25732582dc8824766500cdd13bf938b5b691ab2
GOOGLE_ID=103651864623-ma6tnpp0ubl3mn3b3i1s05vr5b9uqk6q.apps.googleusercontent.com
GOOGLE_SECRET=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
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51PphsnP0tBNZLlr5p5ZC7OLLqX84Z5FtrsgqhSyv5HEkucxUyqxVT0saMPR5nIScaDo7axSzzPqRYXxccew7MOlq00mfndWS8P
STRIPE_SECRET_KEY=sk_test_51PphsnP0tBNZLlr5uC9s9Mz1paDRKxMEnEvRN931SuQ1SeGJ0CTm52exZ3nYeJv8OktlbO7XExTTeVrqLDcyhIUF005e33uAan
```

### 2. Build Configuration

The new `amplify.yml` file has been created with proper configuration:

-   Uses `npm ci` for faster, reliable installs
-   Validates environment variables before build
-   Generates Prisma client
-   Builds Next.js application

### 3. Files Modified/Created

1. **Created**: `amplify.yml` - Proper Amplify build configuration
2. **Created**: `scripts/validate-env.js` - Environment validation script
3. **Updated**: `package.json` - Added validation script and build commands
4. **Updated**: `next.config.ts` - Added environment variable configuration
5. **Created**: `AMPLIFY_DEPLOYMENT_GUIDE.md` - This guide

### 4. Deployment Steps

1. **Set Environment Variables** in Amplify Console (see step 1)
2. **Commit and Push** the new files to your repository
3. **Trigger a new build** in Amplify Console
4. **Monitor the build logs** for the environment validation output

### 5. Troubleshooting

If the build still fails:

1. **Check Environment Variables**: Ensure all variables are set in Amplify Console
2. **Check Build Logs**: Look for the environment validation output
3. **Test Database Connection**: The `/api/test-db` endpoint will help debug database issues
4. **Check Prisma Generation**: Ensure Prisma client generates successfully

### 6. Build Process Flow

```
Pre-Build:
├── Install dependencies (npm ci)
├── Validate environment variables
└── Generate Prisma client

Build:
├── Build Next.js application
└── Generate static files

Post-Build:
├── List build output
└── Verify artifacts
```

### 7. Expected Build Output

After successful deployment, you should see:

-   Environment validation passing ✅
-   Prisma client generation ✅
-   Next.js build completion ✅
-   Proper artifact generation ✅

### 8. Testing After Deployment

Visit these endpoints to verify:

-   `https://your-app.amplifyapp.com/` - Main application
-   `https://your-app.amplifyapp.com/api/test-db` - Database connection test

## Notes

-   The `buildspec.yml` file is now obsolete for Amplify deployment
-   All environment variables must be set in Amplify Console, not in code
-   The validation script will help identify missing environment variables early
-   Prisma client generation is crucial for database operations
