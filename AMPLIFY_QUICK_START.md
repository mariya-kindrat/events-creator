# AWS Amplify Quick Start Checklist

This is a condensed checklist to get your Events Application deployed on AWS Amplify quickly.

## ✅ Pre-Deployment Checklist

### 1. AWS Account Setup
- [x] AWS Account created
- [x] AWS CLI installed and configured
- [x] IAM user with Amplify permissions created

### 2. Repository Preparation
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Environment variables documented
- [ ] Build configuration verified

### 3. Environment Variables Setup
Run the interactive setup script:
```bash
npm run setup-amplify-env
```

Or manually create these files:
- [ ] `.env.production` created
- [ ] `.env.development` created
- [ ] Environment variables added to `.gitignore`

## 🚀 Deployment Steps

### Step 1: Connect Repository to Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your Git provider
4. Select repository: `events_project/event_ui_docker`
5. Choose `main` branch for production

### Step 2: Configure Build Settings
1. App name: `events-app`
2. Environment name: `production`
3. Build settings: Use detected `amplify.yml`
4. Advanced settings: Add environment variables

### Step 3: Add Environment Variables
Copy from your `.env.production` file:

| Variable | Value | Required |
|----------|-------|----------|
| NODE_ENV | production | ✅ |
| DATABASE_URL | your_production_db_url | ✅ |
| NEXTAUTH_URL | https://your-domain.com | ✅ |
| NEXTAUTH_SECRET | your_secret_key | ✅ |
| GOOGLE_CLIENT_ID | your_google_client_id | ⚠️ |
| GOOGLE_CLIENT_SECRET | your_google_client_secret | ⚠️ |
| STRIPE_SECRET_KEY | your_stripe_secret | ⚠️ |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | your_stripe_public_key | ⚠️ |

### Step 4: Deploy
1. Click "Save and deploy"
2. Monitor build progress
3. Wait for deployment to complete (5-15 minutes)

## 🔧 Development Environment Setup

### Step 1: Add Development Branch
1. In Amplify Console, click "Connect branch"
2. Select `develop` branch (create if needed)
3. Environment name: `development`
4. Add development environment variables

### Step 2: Configure Development Build
Use the development-specific amplify configuration:
```bash
# Copy amplify-development.yml to your develop branch
git checkout develop
cp amplify-development.yml amplify.yml
git add amplify.yml
git commit -m "Add development build configuration"
git push origin develop
```

## 🌐 Custom Domain Setup (Optional)

### Step 1: Add Domain
1. Go to "Domain management" in Amplify Console
2. Click "Add domain"
3. Enter your domain name
4. Configure subdomains:
   - `www.yourdomain.com` → production
   - `dev.yourdomain.com` → development

### Step 2: DNS Configuration
1. Update DNS records as shown in Amplify Console
2. Wait for SSL certificate verification
3. Test domain access

## 📊 Monitoring and Maintenance

### Build Monitoring
- [ ] CloudWatch logs enabled
- [ ] Build notifications configured
- [ ] Performance monitoring set up

### Regular Tasks
- [ ] Monitor build minutes usage
- [ ] Update environment variables as needed
- [ ] Review security settings monthly
- [ ] Update dependencies regularly

## 🛠️ Useful Commands

### Local Development
```bash
# Run development server
npm run dev

# Validate environment variables
npm run validate-env:amplify

# Setup environment variables interactively
npm run setup-amplify-env
```

### Deployment
```bash
# Deploy to production
npm run deploy:amplify:production

# Deploy to development
npm run deploy:amplify:development

# List all environments
npm run amplify:list-environments
```

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npm run db-push

# Seed database
npm run db-seed
```

## 🆘 Troubleshooting

### Common Issues

**Build Fails with Environment Variables**
```bash
# Check environment variables in Amplify Console
# Verify all required variables are set
npm run validate-env:amplify
```

**Database Connection Issues**
```bash
# Verify DATABASE_URL is correct
# Check database server accessibility
# Ensure Prisma client is generated
npx prisma generate
```

**Authentication Issues**
```bash
# Verify NEXTAUTH_URL matches your domain
# Check NEXTAUTH_SECRET is set
# Validate Google OAuth credentials
```

**Build Timeout**
- Increase build timeout in Amplify Console
- Optimize dependencies
- Use build caching

### Getting Help
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [AWS Support](https://aws.amazon.com/support/)
- [Community Forums](https://forums.aws.amazon.com/forum.jspa?forumID=314)

## 📋 Success Criteria

Your deployment is successful when:
- [ ] Build completes without errors
- [ ] Application loads in browser
- [ ] Authentication works (if configured)
- [ ] Database connections work
- [ ] Payment processing works (if configured)
- [ ] All features function as expected

## 🎉 Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure backup strategies
3. Plan scaling and optimization
4. Document deployment process for team
5. Set up CI/CD pipeline improvements

---

**Need help?** Check the full [AWS Amplify Setup Guide](./AWS_AMPLIFY_SETUP_GUIDE.md) for detailed instructions.