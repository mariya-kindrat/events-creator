# 🚀 Deployment Guide

## AWS Infrastructure

### S3 Bucket

-   **Bucket Name**: `your-app-name-static-website`
-   **Region**: `us-east-1` (or your chosen region)
-   **Static Website Hosting**: Enabled
-   **Public Access**: Enabled for website hosting

### CloudFront Distribution

-   **Origin**: S3 bucket
-   **Default Root Object**: `index.html`
-   **Error Pages**: Custom error response for SPA routing

### CodePipeline

-   **Source**: GitHub repository
-   **Build**: AWS CodeBuild
-   **Deploy**: S3 bucket

## Environment Variables

Set these in AWS Systems Manager Parameter Store:

### Required Parameters

-   `/nextjs-app/DATABASE_URL` (SecureString)
-   `/nextjs-app/NEXTAUTH_SECRET` (SecureString)
-   `/nextjs-app/GOOGLE_ID` (String)
-   `/nextjs-app/GOOGLE_SECRET` (SecureString)
-   `/nextjs-app/STRIPE_SECRET_KEY` (SecureString)

### Public Variables (in buildspec.yml)

-   `NEXTAUTH_URL`: Your production domain
-   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

## Deployment Process

1. **Push to main branch** → Triggers CodePipeline
2. **CodeBuild** → Builds the Next.js app
3. **S3 Deploy** → Uploads static files to S3
4. **CloudFront** → Serves content globally

## Manual Deployment

```bash
# Build the application
npm run build

# Upload to S3 (using AWS CLI)
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

## Monitoring

-   **CloudWatch**: Monitor build logs and errors
-   **S3 Access Logs**: Track website access
-   **CloudFront Metrics**: Monitor CDN performance

## Troubleshooting

### Build Failures

-   Check CodeBuild logs in CloudWatch
-   Verify environment variables in Parameter Store
-   Ensure buildspec.yml is correct

### 404 Errors

-   Verify S3 bucket policy allows public read
-   Check CloudFront error page configuration
-   Ensure index.html exists in S3 bucket

### Environment Issues

-   Verify all required environment variables are set
-   Check Parameter Store permissions for CodeBuild role
-   Ensure production URLs are correct
