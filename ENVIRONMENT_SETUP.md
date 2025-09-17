# Environment Setup Guide

This guide explains how to set up different environments using a single `DATABASE_URL` variable with branch-specific overrides in AWS Amplify.

## 🏗️ **Environment Strategy**

We use **one environment variable** (`DATABASE_URL`) that points to different databases based on the environment:

-   **Local Development**: Test database (via `.env.local`)
-   **Test Branch (Amplify)**: Test database (via Amplify override)
-   **Production Branch (Amplify)**: Production database (via Amplify default)

## 🔧 **Local Development Setup**

### **Step 1: Configure Local Environment**

1. **Copy environment template**:

    ```bash
    # Your .env.local should contain:
    DATABASE_URL="postgresql://neondb_owner:npg_JGD6lOUwupQ7@ep-lucky-dream-ad4mr3hk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    NEXTAUTH_URL="http://localhost:3000"
    NODE_ENV="development"
    # ... other variables
    ```

2. **Initialize database**:

    ```bash
    npm run setup-db
    ```

3. **Verify setup**:

    ```bash
    npm run check-env
    ```

4. **Start development**:
    ```bash
    npm run dev
    ```

## ☁️ **AWS Amplify Setup**

### **Step 1: Set Default Environment Variables**

In AWS Amplify Console → Environment Variables, set these **default values** (for production):

```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://main.your-app-id.amplifyapp.com
NODE_ENV=production
NEXTAUTH_SECRET=your-production-secret
# ... other production variables
```

### **Step 2: Create Test Branch Overrides**

For your test branch, use **"Add Override"** to override specific variables:

#### **DATABASE_URL Override**

-   **Branch**: `test`
-   **Value**: `postgresql://neondb_owner:npg_JGD6lOUwupQ7@ep-lucky-dream-ad4mr3hk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

#### **NEXTAUTH_URL Override**

-   **Branch**: `test`
-   **Value**: `https://test.your-app-id.amplifyapp.com`

#### **NODE_ENV Override**

-   **Branch**: `test`
-   **Value**: `development`

### **Step 3: Deploy Branches**

```bash
# Deploy test branch
npm run deploy-test

# Deploy production (merge to main)
git checkout main
git merge test
git push origin main
```

## 🗄️ **Database Management**

### **Available Commands**

```bash
# Database setup and management
npm run setup-db          # Initialize database with schema
npm run db-push           # Push schema changes
npm run db-reset          # Reset database (careful!)
npm run db-introspect     # Pull schema from database

# Environment management
npm run check-env         # Verify environment setup
npm run deploy-test       # Deploy to test branch
```

### **Database Operations**

The application automatically detects which database you're using:

-   **Neon Database** (contains 'neondb'): Detected as test/development
-   **Other Databases**: Detected as production

## 🔍 **Environment Verification**

### **Check Current Environment**

```bash
npm run check-env
```

This will show:

-   ✅ Environment files status
-   ✅ Environment variables status
-   🧪 Database type detection (test vs production)

### **Test Database Connection**

```bash
# Local development
curl http://localhost:3000/api/test-db

# Test environment
curl https://test.your-app-id.amplifyapp.com/api/test-db

# Production environment
curl https://main.your-app-id.amplifyapp.com/api/test-db
```

## 🚀 **Deployment Workflow**

### **1. Local Development**

```bash
# Make changes
npm run dev

# Test locally
npm run check-env
curl http://localhost:3000/api/test-db
```

### **2. Deploy to Test**

```bash
# Deploy test branch
npm run deploy-test

# Verify test environment
curl https://test.your-app-id.amplifyapp.com/api/test-db
```

### **3. Deploy to Production**

```bash
# Merge to main
git checkout main
git merge test
git push origin main

# Verify production
curl https://main.your-app-id.amplifyapp.com/api/test-db
```

## 🛡️ **Security & Best Practices**

### **Environment Separation**

-   ✅ **Test database** for development and testing
-   ✅ **Production database** for live application
-   ✅ **No cross-contamination** between environments

### **Variable Management**

-   ✅ **Single variable name** (`DATABASE_URL`) for consistency
-   ✅ **Branch-specific overrides** for different environments
-   ✅ **Automatic detection** of environment type

### **Safety Measures**

-   ✅ **Test keys** for Stripe in development
-   ✅ **Production keys** only in production
-   ✅ **Environment validation** before deployment

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Wrong Database Connected**

    ```bash
    npm run check-env
    # Check the database detection output
    ```

2. **Environment Variables Not Loading**

    ```bash
    # Check if .env.local exists
    ls -la .env.local

    # Verify Amplify overrides are set correctly
    ```

3. **Database Schema Out of Sync**

    ```bash
    npm run db-push
    # Push latest schema to database
    ```

4. **Build Failures**
    ```bash
    npm run build
    # Check for TypeScript or dependency errors
    ```

This simplified approach makes environment management much easier while maintaining proper separation between test and production data.
