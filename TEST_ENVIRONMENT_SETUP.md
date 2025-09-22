# Test Environment Setup Guide

This guide will help you set up a separate test environment for your Events API application with a dedicated test database.

## Overview

The test environment allows you to:

-   Test changes safely before deploying to production
-   Use a separate database to avoid affecting production data
-   Validate deployments in a production-like environment
-   Test database migrations and schema changes

## Prerequisites

1. AWS Amplify account with your main application already deployed
2. Neon database account
3. Access to your application's repository

## Step 1: Create Test Database in Neon

1. **Log into Neon Console**: https://console.neon.tech/
2. **Create a new database**:
    - Click "Create Database" or "New Database"
    - Name: `event_db_test` (or similar)
    - Region: Same as your production database
    - Plan: Can use the free tier for testing
3. **Copy the connection string** - you'll need this for the next step

## Step 2: Set Up Test Branch in AWS Amplify

### Option A: Create a New Branch-Based Environment

1. **In AWS Amplify Console**:

    - Go to your app
    - Click "Connect branch"
    - Select your repository
    - Choose a test branch (e.g., `test`, `staging`, `develop`)
    - If the branch doesn't exist, create it first in your repository

2. **Configure Build Settings**:
    - Use the custom build specification
    - Upload the `amplify-test.yml` file (already created in your project)

### Option B: Use Environment-Based Deployment

1. **Create environment variables** in Amplify for your test environment:
    - Go to App Settings > Environment variables
    - Add the following variables:

```
DATABASE_TEST_URL=your_test_database_connection_string_from_neon
NEXTAUTH_URL=https://your-test-branch.amplifyapp.com
NEXTAUTH_SECRET=Test Secret Client Id - Change This
NODE_ENV=development
GOOGLE_ID=your_google_oauth_id
GOOGLE_SECRET=your_google_oauth_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (use test keys)
STRIPE_SECRET_KEY=sk_test_... (use test keys)
```

## Step 3: Local Testing Setup

1. **Copy the test environment file**:

    ```bash
    cp .env.test .env.local
    ```

2. **Update `.env.local`** with your actual test database URL:

    ```
    DATABASE_TEST_URL="your_actual_test_database_url_from_neon"
    ```

3. **Set up the test database**:

    ```bash
    npm run setup-test-db
    ```

4. **Test locally**:
    ```bash
    npm run dev
    ```

## Step 4: Deploy Test Environment

### If using branch-based deployment:

1. **Push to your test branch**:

    ```bash
    git checkout -b test  # or your chosen test branch name
    git add .
    git commit -m "Set up test environment"
    git push origin test
    ```

2. **Amplify will automatically deploy** the test branch

### If using environment variables:

1. **Deploy normally** - Amplify will use the environment variables you set

## Step 5: Verify Test Environment

1. **Check the deployment logs** in Amplify Console
2. **Visit your test URL** (provided by Amplify)
3. **Test key functionality**:
    - User authentication
    - Database operations
    - Payment processing (with test cards)

## Environment Variables Reference

### Required for Test Environment:

-   `DATABASE_TEST_URL`: Your test database connection string
-   `NEXTAUTH_URL`: Your test environment URL
-   `NEXTAUTH_SECRET`: A secret for NextAuth (different from production)

### Optional but Recommended:

-   `NODE_ENV`: Set to `development` for test environment
-   `GOOGLE_ID` & `GOOGLE_SECRET`: OAuth credentials (can share with production)
-   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY`: Use Stripe test keys

## Database Management Commands

```bash
# Set up test database (run once)
npm run setup-test-db

# Check database status
npm run test-db-status

# Push schema changes to test database
npm run test-db-push

# Reset test database (WARNING: deletes all data)
npm run test-db-reset
```

## Testing Workflow

1. **Make changes** in your development environment
2. **Test locally** using the test database
3. **Push to test branch** or deploy to test environment
4. **Verify functionality** in the test environment
5. **Deploy to production** once testing is complete

## Troubleshooting

### Database Connection Issues

-   Verify `DATABASE_TEST_URL` is correctly set
-   Check Neon database is running and accessible
-   Ensure connection string includes all required parameters

### Build Failures

-   Check Amplify build logs
-   Verify all required environment variables are set
-   Run `npm run validate-env` locally to check configuration

### Authentication Issues

-   Ensure `NEXTAUTH_URL` matches your test environment URL
-   Verify OAuth redirect URLs include your test domain
-   Check `NEXTAUTH_SECRET` is set and unique

## Security Notes

-   **Never use production database URLs** in test environments
-   **Use Stripe test keys** for payment testing
-   **Use different secrets** for test and production environments
-   **Regularly clean up test data** to avoid accumulation

## Cleanup

To remove the test environment:

1. Delete the test branch in Amplify Console
2. Delete the test database in Neon Console
3. Remove test environment variables

---

## Quick Reference

### Files Created/Modified:

-   `.env.test` - Test environment configuration template
-   `amplify-test.yml` - Test environment build configuration
-   `scripts/setup-test-db.js` - Database setup script
-   `scripts/validate-env-amplify.js` - Updated validation script
-   `src/utils/connect.ts` - Updated database connection logic

### New NPM Scripts:

-   `npm run setup-test-db` - Initialize test database
-   `npm run test-db-status` - Check database status
-   `npm run test-db-push` - Push schema to test database
-   `npm run test-db-reset` - Reset test database
-   `npm run build:test` - Build for test environment
