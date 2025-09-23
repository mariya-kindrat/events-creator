# Deploy Test Branch Script (PowerShell)
# This script helps you deploy your test environment to AWS Amplify

Write-Host "🚀 Deploying Test Branch to AWS Amplify" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Git repository not found. Please initialize git first." -ForegroundColor Red
    exit 1
}

Write-Host "📋 Current git status:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "🔄 Step 1: Creating/switching to test branch..." -ForegroundColor Yellow
try {
    git checkout test 2>$null
    if ($LASTEXITCODE -ne 0) {
        git checkout -b test
    }
} catch {
    git checkout -b test
}

Write-Host ""
Write-Host "📦 Step 2: Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💬 Step 3: Committing changes..." -ForegroundColor Yellow
$commit_msg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commit_msg)) {
    $commit_msg = "Set up test environment with test database"
}
git commit -m $commit_msg

Write-Host ""
Write-Host "🚀 Step 4: Pushing to remote test branch..." -ForegroundColor Yellow
git push origin test

Write-Host ""
Write-Host "✅ Test branch deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to AWS Amplify Console" -ForegroundColor White
Write-Host "2. Connect the 'test' branch to your app" -ForegroundColor White
Write-Host "3. Set up environment variables (see amplify-env-vars.txt)" -ForegroundColor White
Write-Host "4. Deploy and test your application" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Your test branch should be available at:" -ForegroundColor Cyan
Write-Host "   https://develop.d16jh2qsui6dp9.amplifyapp.com/" -ForegroundColor White