# Testing Workflow Guide

This document outlines the complete testing workflow for your Events API application.

## 🏗️ **Environment Setup Overview**

```
Development (Local) → Test (AWS Amplify) → Production (AWS Amplify)
       ↓                    ↓                      ↓
   Test Database        Test Database         Production Database
```

## 🔄 **Step 4: Complete Testing Workflow**

### **Phase 1: Local Development & Testing**

1. **Start Local Development**

    ```bash
    npm run dev
    ```

2. **Make Your Changes**

    - Edit code, add features, fix bugs
    - Test locally with test database

3. **Verify Environment**

    ```bash
    npm run check-env
    ```

4. **Test Database Operations**

    ```bash
    # Test database connection
    curl http://localhost:3000/api/test-db

    # Test specific endpoints
    curl http://localhost:3000/api/events
    curl http://localhost:3000/api/categories
    ```

### **Phase 2: Deploy to Test Environment**

1. **Run Deployment Script**

    ```powershell
    # Windows PowerShell
    .\deploy-test-branch.ps1
    ```

    ```bash
    # Linux/Mac
    ./deploy-test-branch.sh
    ```

2. **Set Up Amplify Environment Variables**

    - Follow instructions in `amplify-env-vars.txt`
    - Add all environment variables to test branch

3. **Deploy in AWS Amplify**
    - Connect test branch
    - Deploy automatically

### **Phase 3: Test Environment Validation**

1. **Basic Functionality Tests**

    ```bash
    # Replace with your actual test URL
    curl https://develop.d16jh2qsui6dp9.amplifyapp.com/api/test-db
    ```

2. **Authentication Testing**

    - Test Google OAuth login
    - Verify session management
    - Check user creation/retrieval

3. **Database Operations Testing**

    - Create test events
    - Test CRUD operations
    - Verify data persistence

4. **Payment Integration Testing**
    - Test Stripe test mode
    - Verify payment flows
    - Check webhook handling

### **Phase 4: Production Deployment**

1. **Merge to Main Branch**

    ```bash
    git checkout main
    git merge test
    git push origin main
    ```

2. **Production Environment Variables**
    - Use production database URL
    - Use production Stripe keys
    - Set NODE_ENV=production

## 🛠️ **Available Testing Commands**

### **Local Development**

```bash
npm run dev                 # Start development server
npm run check-env          # Verify environment setup
npm run setup-db           # Initialize database
npm run db-push            # Push schema changes
npm run db-reset           # Reset database
```

### **Build & Deploy**

```bash
npm run build              # Build for production
npm run build:test         # Build for test environment
npm run start              # Start production server
```

### **Database Management**

```bash
npm run db-introspect      # Pull database schema
npx prisma studio          # Open database GUI
```

## 🔍 **Testing Checklist**

### **Before Deploying to Test:**

-   [ ] Local development server runs without errors
-   [ ] Database connection successful
-   [ ] All new features work locally
-   [ ] No console errors in browser
-   [ ] Environment variables properly set

### **Test Environment Validation:**

-   [ ] Application loads successfully
-   [ ] Database connectivity verified
-   [ ] Authentication flows work
-   [ ] API endpoints respond correctly
-   [ ] Payment integration functional (test mode)
-   [ ] No production data affected

### **Before Production Deployment:**

-   [ ] All test environment tests pass
-   [ ] Performance acceptable
-   [ ] Security review completed
-   [ ] Backup procedures verified
-   [ ] Rollback plan prepared

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Environment Variables Not Loading**

    ```bash
    npm run check-env
    # Check if .env.local exists and has correct values
    ```

2. **Database Connection Failed**

    ```bash
    npm run setup-db
    # Verify DATABASE_URL is correct
    ```

3. **Build Failures**

    ```bash
    npm run build
    # Check for TypeScript errors or missing dependencies
    ```

4. **Authentication Issues**
    - Verify NEXTAUTH_URL matches your domain
    - Check Google OAuth settings
    - Ensure NEXTAUTH_SECRET is set

## 📊 **Monitoring & Logs**

### **Local Development:**

-   Check terminal output for errors
-   Use browser developer tools
-   Monitor database queries in Prisma Studio

### **Test Environment:**

-   AWS Amplify build logs
-   CloudWatch logs for runtime errors
-   Network tab for API call failures

### **Production Environment:**

-   AWS CloudWatch monitoring
-   Error tracking (consider adding Sentry)
-   Performance monitoring
-   Database query performance

## 🔄 **Continuous Integration Tips**

1. **Automated Testing**

    - Add unit tests for critical functions
    - Integration tests for API endpoints
    - End-to-end tests for user flows

2. **Code Quality**

    - ESLint for code standards
    - Prettier for formatting
    - TypeScript for type safety

3. **Security**
    - Regular dependency updates
    - Environment variable validation
    - API rate limiting
    - Input sanitization

This workflow ensures safe, reliable deployments while maintaining data integrity across all environments.
