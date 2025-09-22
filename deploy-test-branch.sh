#!/bin/bash

# Deploy Test Branch Script
# This script helps you deploy your test environment to AWS Amplify

echo "🚀 Deploying Test Branch to AWS Amplify"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

echo "📋 Current git status:"
git status --short

echo ""
echo "🔄 Step 1: Creating/switching to test branch..."
git checkout -b test 2>/dev/null || git checkout test

echo ""
echo "📦 Step 2: Adding all changes..."
git add .

echo ""
echo "💬 Step 3: Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Set up test environment with test database"
fi
git commit -m "$commit_msg"

echo ""
echo "🚀 Step 4: Pushing to remote test branch..."
git push origin test

echo ""
echo "✅ Test branch deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Go to AWS Amplify Console"
echo "2. Connect the 'test' branch to your app"
echo "3. Set up environment variables (see amplify-env-vars.txt)"
echo "4. Deploy and test your application"
echo ""
echo "🔗 Your test branch should be available at:"
echo "   https://develop.d16jh2qsui6dp9.amplifyapp.com"