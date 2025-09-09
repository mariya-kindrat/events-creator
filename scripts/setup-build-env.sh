#!/bin/bash

echo "Setting up build environment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in environment variables"
    echo "Available environment variables:"
    printenv | grep -E "(DATABASE|NEXTAUTH|GOOGLE|STRIPE)" || echo "No relevant environment variables found"
    
    echo "Setting placeholder DATABASE_URL for build..."
    export DATABASE_URL="postgresql://build:build@localhost:5432/build"
else
    echo "✅ DATABASE_URL found in environment"
    # Don't print the full URL for security, just confirm it exists
    echo "DATABASE_URL starts with: $(echo $DATABASE_URL | cut -c1-20)..."
fi

# Verify other important environment variables
echo "Checking other environment variables..."
if [ -n "$NEXTAUTH_URL" ]; then
    echo "✅ NEXTAUTH_URL is set"
else
    echo "❌ NEXTAUTH_URL not found"
fi

if [ -n "$NEXTAUTH_SECRET" ]; then
    echo "✅ NEXTAUTH_SECRET is set"
else
    echo "❌ NEXTAUTH_SECRET not found"
fi

echo "Environment setup complete!"