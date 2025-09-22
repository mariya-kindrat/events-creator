#!/bin/bash
# AWS CLI commands to set environment variables in Amplify
# This script uses environment variables and contains NO hard-coded secrets.
# Before running, export the values appropriate for each environment.
#
# Required env vars (set these in your shell before running):
#   APP_ID, REGION
#   PROD_DATABASE_URL, DEV_DATABASE_URL, STAGING_DATABASE_URL
#   PROD_NEXTAUTH_SECRET, DEV_NEXTAUTH_SECRET, STAGING_NEXTAUTH_SECRET
#   PROD_GOOGLE_CLIENT_ID, DEV_GOOGLE_CLIENT_ID, STAGING_GOOGLE_CLIENT_ID
#   PROD_GOOGLE_CLIENT_SECRET, DEV_GOOGLE_CLIENT_SECRET, STAGING_GOOGLE_CLIENT_SECRET
#   PROD_STRIPE_SECRET_KEY, DEV_STRIPE_SECRET_KEY, STAGING_STRIPE_SECRET_KEY
#   PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, DEV_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STAGING_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
#
# Example (zsh/bash):
#   export APP_ID="YOUR_AMPLIFY_APP_ID"
#   export REGION="us-east-1"
#   export PROD_DATABASE_URL="postgresql://..."
#   export PROD_NEXTAUTH_SECRET="..."
#   export PROD_GOOGLE_CLIENT_ID="..."
#   export PROD_GOOGLE_CLIENT_SECRET="..."
#   export PROD_STRIPE_SECRET_KEY="..."
#   export PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
#   # Repeat for DEV_*, STAGING_*
#
set -euo pipefail

APP_ID=${APP_ID:?Please export APP_ID}
REGION=${REGION:-us-east-1}

# Helper to push a single key/value pair into Amplify backend environment
put_env() {
  local env_name=$1
  local key=$2
  local value=$3
  aws amplify put-backend-environment \
    --app-id "$APP_ID" \
    --environment-name "$env_name" \
    --deployment-artifacts "{\"$key\":\"$value\"}" \
    --region "$REGION"
}

# ===== PRODUCTION (main) =====
put_env production NODE_ENV production
put_env production DATABASE_URL "${PROD_DATABASE_URL:?export PROD_DATABASE_URL}"
put_env production NEXTAUTH_SECRET "${PROD_NEXTAUTH_SECRET:?export PROD_NEXTAUTH_SECRET}"
put_env production GOOGLE_CLIENT_ID "${PROD_GOOGLE_CLIENT_ID:?export PROD_GOOGLE_CLIENT_ID}"
put_env production GOOGLE_CLIENT_SECRET "${PROD_GOOGLE_CLIENT_SECRET:?export PROD_GOOGLE_CLIENT_SECRET}"
put_env production STRIPE_SECRET_KEY "${PROD_STRIPE_SECRET_KEY:?export PROD_STRIPE_SECRET_KEY}"
put_env production NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "${PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:?export PROD_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"

# ===== DEVELOPMENT (develop) =====
put_env development NODE_ENV development
put_env development DATABASE_URL "${DEV_DATABASE_URL:?export DEV_DATABASE_URL}"
put_env development NEXTAUTH_SECRET "${DEV_NEXTAUTH_SECRET:?export DEV_NEXTAUTH_SECRET}"
put_env development GOOGLE_CLIENT_ID "${DEV_GOOGLE_CLIENT_ID:?export DEV_GOOGLE_CLIENT_ID}"
put_env development GOOGLE_CLIENT_SECRET "${DEV_GOOGLE_CLIENT_SECRET:?export DEV_GOOGLE_CLIENT_SECRET}"
put_env development STRIPE_SECRET_KEY "${DEV_STRIPE_SECRET_KEY:?export DEV_STRIPE_SECRET_KEY}"
put_env development NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "${DEV_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:?export DEV_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"

# ===== STAGING (staging) =====
put_env staging NODE_ENV production
put_env staging DATABASE_URL "${STAGING_DATABASE_URL:?export STAGING_DATABASE_URL}"
put_env staging NEXTAUTH_SECRET "${STAGING_NEXTAUTH_SECRET:?export STAGING_NEXTAUTH_SECRET}"
put_env staging GOOGLE_CLIENT_ID "${STAGING_GOOGLE_CLIENT_ID:?export STAGING_GOOGLE_CLIENT_ID}"
put_env staging GOOGLE_CLIENT_SECRET "${STAGING_GOOGLE_CLIENT_SECRET:?export STAGING_GOOGLE_CLIENT_SECRET}"
put_env staging STRIPE_SECRET_KEY "${STAGING_STRIPE_SECRET_KEY:?export STAGING_STRIPE_SECRET_KEY}"
put_env staging NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "${STAGING_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:?export STAGING_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"

echo "Done: Amplify env vars updated without committing secrets."