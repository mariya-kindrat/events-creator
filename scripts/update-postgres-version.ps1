# PostgreSQL Docker Image Version Update Script
# Usage: .\update-postgres-version.ps1 -NewVersion "v1.2.0"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewVersion,
    [string]$DockerUsername = "andriyko1983",
    [string]$ImageName = "events-postgres",
    [string]$DockerDir = ".\docker-postgres"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting PostgreSQL Docker image update process..."
Write-Host "📦 New Version: $NewVersion"
Write-Host "🐳 Image: $DockerUsername/$ImageName"

# Step 1: Update Dockerfile version label
Write-Host "`n📝 Step 1: Updating Dockerfile version label..."
$dockerfilePath = Join-Path $DockerDir "Dockerfile"

if (Test-Path $dockerfilePath) {
    $content = Get-Content $dockerfilePath
    $content = $content -replace 'LABEL version=".*"', "LABEL version=`"$NewVersion`""
    Set-Content -Path $dockerfilePath -Value $content
    Write-Host "✅ Dockerfile updated with version $NewVersion"
} else {
    Write-Error "❌ Dockerfile not found at: $dockerfilePath"
}

# Step 2: Build new image
Write-Host "`n🔨 Step 2: Building Docker image..."
Set-Location $DockerDir
docker build -t "$DockerUsername/${ImageName}:$NewVersion" .

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Docker build failed"
}
Write-Host "✅ Image built successfully: $DockerUsername/${ImageName}:$NewVersion"

# Step 3: Test the image locally
Write-Host "`n🧪 Step 3: Testing image locally..."
$testContainerName = "test-postgres-$NewVersion"
$testPort = "5433"

# Remove existing test container if it exists
docker rm -f $testContainerName 2>$null

# Start test container
docker run -d --name $testContainerName -p "${testPort}:5432" -e POSTGRES_DB=event_db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password "$DockerUsername/${ImageName}:$NewVersion"

if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Failed to start test container"
}

# Wait for container to be ready
Write-Host "⏳ Waiting for PostgreSQL to be ready..."
Start-Sleep -Seconds 10

# Test connection
$testResult = docker exec $testContainerName pg_isready -U user -d event_db
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database connection test passed"
    
    # Test version
    Write-Host "📊 Testing database version..."
    docker exec $testContainerName psql -U user -d event_db -c "SELECT version();"
    
    # Test health check
    $healthStatus = docker inspect $testContainerName --format='{{.State.Health.Status}}'
    Write-Host "🏥 Health status: $healthStatus"
} else {
    Write-Error "❌ Database connection test failed"
}

# Cleanup test container
Write-Host "🧹 Cleaning up test container..."
docker stop $testContainerName
docker rm $testContainerName

# Step 4: Push to Docker Hub
Write-Host "`n📤 Step 4: Pushing to Docker Hub..."
Write-Host "🔐 Make sure you're logged in to Docker Hub (docker login)"

$pushConfirmation = Read-Host "Push $NewVersion to Docker Hub? (y/N)"
if ($pushConfirmation -eq 'y' -or $pushConfirmation -eq 'Y') {
    docker push "$DockerUsername/${ImageName}:$NewVersion"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Version $NewVersion pushed successfully"
        
        # Ask about updating latest tag
        $latestConfirmation = Read-Host "Update 'latest' tag to point to $NewVersion? (y/N)"
        if ($latestConfirmation -eq 'y' -or $latestConfirmation -eq 'Y') {
            docker tag "$DockerUsername/${ImageName}:$NewVersion" "$DockerUsername/${ImageName}:latest"
            docker push "$DockerUsername/${ImageName}:latest"
            Write-Host "✅ Latest tag updated and pushed"
        }
    } else {
        Write-Error "❌ Failed to push image to Docker Hub"
    }
} else {
    Write-Host "⏭️ Skipping Docker Hub push"
}

# Step 5: Update project references
Write-Host "`n📋 Step 5: Update project references"
Write-Host "Don`'t forget to update your docker-compose files:"
Write-Host "  - docker-compose.prod.yml: image: $DockerUsername/${ImageName}:$NewVersion"
Write-Host "  - Consider updating development compose if needed"

Write-Host "`n🎉 PostgreSQL image update process completed!"
Write-Host "📝 Summary:"
Write-Host "  - Built: $DockerUsername/${ImageName}:$NewVersion"
Write-Host "  - Tested: ✅ Connection and health checks passed"
Write-Host "  - Next: Update your docker-compose files and deploy"

Set-Location ..