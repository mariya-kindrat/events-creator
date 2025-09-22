# AWS Amplify Setup Guide for Events Application

This comprehensive guide will walk you through setting up AWS Amplify with production and development environments for your Next.js events application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [AWS Account Setup](#aws-account-setup)
3. [Repository Preparation](#repository-preparation)
4. [AWS Amplify Console Setup](#aws-amplify-console-setup)
5. [Environment Configuration](#environment-configuration)
6. [Build Configuration](#build-configuration)
7. [Domain Setup](#domain-setup)
8. [Deployment Process](#deployment-process)
9. [Monitoring and Troubleshooting](#monitoring-and-troubleshooting)
10. [Best Practices](#best-practices)

## Prerequisites

Before starting, ensure you have:
- ✅ AWS Account with appropriate permissions
- ✅ GitHub/GitLab/Bitbucket repository with your code
- ✅ Node.js 18+ installed locally
- ✅ Next.js application ready for deployment
- ✅ Environment variables documented
- ✅ Database setup (if using external database)

## AWS Account Setup

### Step 1: Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Follow the registration process
4. Verify your email and phone number
5. Add payment method (required even for free tier)

### Step 2: Set Up IAM User (Recommended)
1. Navigate to IAM service in AWS Console
2. Create a new user with programmatic access
3. Attach the following policies:
   - `AdministratorAccess-Amplify`
   - `AWSAmplifyConsoleServiceRolePolicy`
   - Or create custom policy with minimum required permissions

### Step 3: Enable Required Services
Ensure these services are available in your region:
- AWS Amplify
- CloudFront (for CDN)
- Route 53 (for custom domains)
- Certificate Manager (for SSL)

## Repository Preparation

### Step 1: Organize Your Code Structure
Your current structure looks good:
```
event_ui_docker/
├── src/
├── public/
├── package.json
├── next.config.ts
├── amplify.yml          ✅ Already configured
├── .env.local           ✅ Local environment
├── .env                 ✅ Default environment
└── .env.test           ✅ Test environment
```

### Step 2: Create Environment-Specific Files

Create `.env.production` for production environment:
```bash
# .env.production
NODE_ENV=production
DATABASE_URL=your_production_database_url
NEXTAUTH_URL=https://your-production-domain.com
NEXTAUTH_SECRET=your_production_secret
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret
STRIPE_SECRET_KEY=your_production_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_production_stripe_publishable_key
```

Create `.env.development` for development environment:
```bash
# .env.development
NODE_ENV=development
DATABASE_URL=your_development_database_url
NEXTAUTH_URL=https://your-dev-domain.com
NEXTAUTH_SECRET=your_development_secret
GOOGLE_CLIENT_ID=your_development_google_client_id
GOOGLE_CLIENT_SECRET=your_development_google_client_secret
STRIPE_SECRET_KEY=your_development_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_development_stripe_publishable_key
```

### Step 3: Update .gitignore
Ensure sensitive files are ignored:
```gitignore
# Environment variables
.env
.env.local
.env.development
.env.production
.env.test

# AWS Amplify
amplify-env-vars.txt
```

### Step 4: Commit and Push Changes
```bash
git add .
git commit -m "Prepare for AWS Amplify deployment"
git push origin main
```

## AWS Amplify Console Setup

### Step 1: Access Amplify Console
1. Log into AWS Console
2. Search for "Amplify" in services
3. Click "AWS Amplify"
4. Choose "Amplify Hosting"

### Step 2: Connect Repository
1. Click "Get Started" under "Amplify Hosting"
2. Choose your Git provider (GitHub, GitLab, Bitbucket)
3. Authorize AWS Amplify to access your repositories
4. Select your repository: `events_project/event_ui_docker`
5. Choose the main branch for production

### Step 3: Configure App Settings
1. **App name**: `events-app-production`
2. **Environment name**: `production`
3. **Build settings**: Amplify will detect your `amplify.yml` file
4. Review the detected build settings

### Step 4: Advanced Settings
1. **Environment variables**: Add all production environment variables
2. **Build image**: Use default (Amazon Linux 2)
3. **Build timeout**: 30 minutes (default)
4. **Compute type**: Medium (recommended for Next.js)

## Environment Configuration

### Step 1: Production Environment Setup
1. In Amplify Console, go to your app
2. Click "Environment variables" in the left sidebar
3. Add all production environment variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| NODE_ENV | production | production |
| DATABASE_URL | your_production_db_url | production |
| NEXTAUTH_URL | https://your-domain.com | production |
| NEXTAUTH_SECRET | your_production_secret | production |
| GOOGLE_CLIENT_ID | your_prod_google_id | production |
| GOOGLE_CLIENT_SECRET | your_prod_google_secret | production |
| STRIPE_SECRET_KEY | your_prod_stripe_secret | production |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | your_prod_stripe_key | production |

### Step 2: Development Environment Setup
1. In your app, click "Add environment"
2. Choose "Connect a branch"
3. Select `develop` branch (create if doesn't exist)
4. **Environment name**: `development`
5. Add development environment variables (same structure as above)

### Step 3: Environment Variable Management
```bash
# Create a secure way to manage environment variables
# Option 1: Use AWS Systems Manager Parameter Store
aws ssm put-parameter \
    --name "/amplify/events-app/production/DATABASE_URL" \
    --value "your_production_database_url" \
    --type "SecureString"

# Option 2: Use AWS Secrets Manager
aws secretsmanager create-secret \
    --name "amplify/events-app/production" \
    --description "Production secrets for events app"
```

## Build Configuration

### Step 1: Verify amplify.yml Configuration
Your current `amplify.yml` is well-configured. Here's an enhanced version:

```yaml
version: 1
frontend:
    phases:
        preBuild:
            commands:
                - echo "=== Pre-Build Phase ==="
                - echo "Node.js version:" $(node --version)
                - echo "NPM version:" $(npm --version)
                - echo "Current directory:" $(pwd)
                - echo "Environment: $AWS_BRANCH"
                - echo "Environment check..."
                - env | grep -E "(NODE_ENV|DATABASE_URL|NEXTAUTH|GOOGLE|STRIPE|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)" || echo "No matching env vars found"
                - node scripts/validate-env-amplify.js
                - echo "Installing dependencies..."
                - npm ci --no-audit --no-fund || npm install --no-audit --no-fund --include=dev
                - npm dedupe || true
                - echo "Dependencies installed successfully"
                - echo "Verifying PostCSS dependencies..."
                - npm list autoprefixer postcss tailwindcss || echo "Some PostCSS dependencies missing"
                - echo "Generating Prisma client..."
                - npx prisma generate
                - echo "Prisma client generated successfully"
        build:
            commands:
                - echo "=== Build Phase ==="
                - echo "Original NODE_ENV:" $NODE_ENV
                - echo "AWS_BRANCH:" $AWS_BRANCH
                - echo "Setting NODE_ENV=production for build process (Next.js requirement)"
                - export NODE_ENV=production
                - echo "Building Next.js application..."
                - npm run build:amplify
                - echo "Build completed successfully"
        postBuild:
            commands:
                - echo "=== Post Build Phase ==="
                - echo "Listing build output..."
                - ls -la .next/ || echo "No .next directory found"
                - echo "Checking standalone output..."
                - ls -la .next/standalone/ || echo "No standalone directory found"
                - echo "Build artifacts ready"
    artifacts:
        baseDirectory: .next
        files:
            - "**/*"
    cache:
        paths:
            - node_modules/**/*
            - .next/cache/**/*
            - .cache/**/*
```

### Step 2: Environment-Specific Build Commands
Update your `package.json` scripts:

```json
{
    "scripts": {
        "build:amplify:production": "NODE_ENV=production next build",
        "build:amplify:development": "NODE_ENV=development next build",
        "build:amplify": "next build"
    }
}
```

### Step 3: Create Branch-Specific amplify.yml (Optional)
For different build processes per environment:

**amplify-production.yml**:
```yaml
version: 1
frontend:
    phases:
        preBuild:
            commands:
                - npm ci
                - npx prisma generate
        build:
            commands:
                - npm run build:amplify:production
    artifacts:
        baseDirectory: .next
        files:
            - "**/*"
```

## Domain Setup

### Step 1: Custom Domain Configuration
1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name (e.g., `youreventsapp.com`)
4. Choose SSL certificate option:
   - **Option A**: Let Amplify create certificate (recommended)
   - **Option B**: Use existing certificate from ACM

### Step 2: Subdomain Configuration
Set up subdomains for different environments:
- Production: `youreventsapp.com` or `www.youreventsapp.com`
- Development: `dev.youreventsapp.com`
- Staging: `staging.youreventsapp.com`

### Step 3: DNS Configuration
1. **If using Route 53**:
   - Amplify will automatically configure DNS
2. **If using external DNS provider**:
   - Add CNAME records as shown in Amplify Console
   - Wait for DNS propagation (up to 48 hours)

### Step 4: SSL Certificate Verification
1. Amplify will automatically request SSL certificate
2. Verify domain ownership via DNS or email
3. Certificate will be automatically renewed

## Deployment Process

### Step 1: Automatic Deployments
1. **Production**: Triggered by pushes to `main` branch
2. **Development**: Triggered by pushes to `develop` branch

### Step 2: Manual Deployment
```bash
# Trigger manual deployment
aws amplify start-job \
    --app-id YOUR_APP_ID \
    --branch-name main \
    --job-type RELEASE
```

### Step 3: Deployment Monitoring
1. Go to Amplify Console
2. Click on your app
3. Monitor build progress in real-time
4. Check logs for any issues

### Step 4: Rollback Process
```bash
# List previous deployments
aws amplify list-jobs --app-id YOUR_APP_ID --branch-name main

# Rollback to previous version
aws amplify start-job \
    --app-id YOUR_APP_ID \
    --branch-name main \
    --job-type RELEASE \
    --job-id PREVIOUS_JOB_ID
```

## Monitoring and Troubleshooting

### Step 1: CloudWatch Integration
1. Enable CloudWatch logs in Amplify Console
2. Set up custom metrics and alarms
3. Monitor application performance

### Step 2: Common Issues and Solutions

**Build Failures**:
```bash
# Check build logs in Amplify Console
# Common issues:
# 1. Missing environment variables
# 2. Node.js version mismatch
# 3. Dependency conflicts
# 4. Database connection issues
```

**Environment Variable Issues**:
```bash
# Verify environment variables are set
echo $DATABASE_URL
echo $NEXTAUTH_SECRET

# Test environment variable loading
node -e "console.log(process.env.DATABASE_URL)"
```

**Database Connection Issues**:
```bash
# Test database connectivity
npx prisma db pull
npx prisma generate
```

### Step 3: Performance Monitoring
1. **Core Web Vitals**: Monitor in Amplify Console
2. **Custom Metrics**: Set up application-specific monitoring
3. **Error Tracking**: Integrate with services like Sentry

### Step 4: Logging Strategy
```javascript
// Add to your Next.js app
console.log('Environment:', process.env.NODE_ENV);
console.log('Database connected:', !!process.env.DATABASE_URL);
console.log('Auth configured:', !!process.env.NEXTAUTH_SECRET);
```

## Best Practices

### Step 1: Security Best Practices
1. **Environment Variables**:
   - Never commit sensitive data to repository
   - Use AWS Secrets Manager for production secrets
   - Rotate secrets regularly

2. **Access Control**:
   - Use IAM roles with minimal permissions
   - Enable MFA for AWS account
   - Regular security audits

### Step 2: Performance Optimization
1. **Build Optimization**:
   - Enable build caching
   - Use appropriate compute size
   - Optimize dependencies

2. **Runtime Optimization**:
   - Enable CloudFront CDN
   - Configure proper caching headers
   - Optimize images and assets

### Step 3: Cost Management
1. **Monitor Usage**:
   - Set up billing alerts
   - Monitor build minutes
   - Track bandwidth usage

2. **Optimize Costs**:
   - Use appropriate compute sizes
   - Clean up unused environments
   - Optimize build processes

### Step 4: Development Workflow
1. **Branch Strategy**:
   ```
   main (production) → Auto-deploy to production
   develop (development) → Auto-deploy to development
   feature/* → Manual review before merge
   ```

2. **Testing Strategy**:
   - Run tests in build process
   - Use preview deployments for feature branches
   - Implement proper CI/CD pipeline

### Step 5: Backup and Recovery
1. **Database Backups**:
   - Regular automated backups
   - Test restore procedures
   - Document recovery processes

2. **Code Backups**:
   - Multiple repository mirrors
   - Regular code exports
   - Version tagging strategy

## Quick Start Checklist

- [ ] AWS Account created and configured
- [ ] Repository connected to Amplify
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Domain configured (optional)
- [ ] First deployment successful
- [ ] Monitoring set up
- [ ] Team access configured
- [ ] Documentation updated

## Support and Resources

### AWS Documentation
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js on Amplify Guide](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)

### Community Resources
- [AWS Amplify Discord](https://discord.gg/amplify)
- [AWS Amplify GitHub](https://github.com/aws-amplify)

### Troubleshooting Resources
- [Common Build Issues](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting.html)
- [Performance Optimization](https://docs.aws.amazon.com/amplify/latest/userguide/performance.html)

---

## Next Steps

1. Follow this guide step by step
2. Test both production and development environments
3. Set up monitoring and alerts
4. Document your specific configuration
5. Train your team on the deployment process

Good luck with your AWS Amplify deployment! 🚀