# Build PostgreSQL Images for Different Environments
# Usage: .\build-images.ps1 [environment] [push]
# Examples:
#   .\build-images.ps1 dev
#   .\build-images.ps1 all push
#   .\build-images.ps1 prod push

param(
    [Parameter(Position=0)]
    [ValidateSet("dev", "staging", "prod", "all")]
    [string]$Environment = "all",
    
    [Parameter(Position=1)]
    [switch]$Push = $false
)

$ImageName = "andriyko1983/events-postgres"
$Version = "1.1.0"

function Build-PostgresImage {
    param(
        [string]$Env,
        [string]$Dockerfile,
        [string]$Tag
    )
    
    Write-Host "Building PostgreSQL image for $Env environment..." -ForegroundColor Green
    
    # Build the image
    $buildCommand = "docker build -t ${ImageName}:${Tag} -f $Dockerfile ."
    Write-Host "Executing: $buildCommand" -ForegroundColor Yellow
    Invoke-Expression $buildCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully built ${ImageName}:${Tag}" -ForegroundColor Green
        
        # Also tag with version
        $versionTag = "${Version}-${Env}"
        docker tag "${ImageName}:${Tag}" "${ImageName}:${versionTag}"
        Write-Host "✅ Tagged as ${ImageName}:${versionTag}" -ForegroundColor Green
        
        if ($Push) {
            Write-Host "Pushing ${ImageName}:${Tag}..." -ForegroundColor Blue
            docker push "${ImageName}:${Tag}"
            docker push "${ImageName}:${versionTag}"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Successfully pushed ${ImageName}:${Tag}" -ForegroundColor Green
            } else {
                Write-Host "❌ Failed to push ${ImageName}:${Tag}" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "❌ Failed to build ${ImageName}:${Tag}" -ForegroundColor Red
        exit 1
    }
}

function Test-PostgresImage {
    param(
        [string]$Tag
    )
    
    Write-Host "Testing PostgreSQL image: ${ImageName}:${Tag}..." -ForegroundColor Blue
    
    $containerName = "test-postgres-$(Get-Random)"
    
    try {
        # Start container
        docker run -d --name $containerName -p 5433:5432 -e POSTGRES_PASSWORD=test_password "${ImageName}:${Tag}"
        
        # Wait for PostgreSQL to start
        Start-Sleep -Seconds 30
        
        # Test connection
        $testResult = docker exec $containerName pg_isready -U user -d event_db
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Image test passed for ${ImageName}:${Tag}" -ForegroundColor Green
        } else {
            Write-Host "❌ Image test failed for ${ImageName}:${Tag}" -ForegroundColor Red
        }
    }
    finally {
        # Clean up
        docker stop $containerName 2>$null
        docker rm $containerName 2>$null
    }
}

# Main execution
Write-Host "PostgreSQL Docker Image Builder" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if Docker is running
try {
    docker version | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Set location to docker-postgres directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Build images based on environment parameter
switch ($Environment) {
    "dev" {
        Build-PostgresImage -Env "dev" -Dockerfile "Dockerfile.dev" -Tag "latest-dev"
        Test-PostgresImage -Tag "latest-dev"
    }
    "staging" {
        Build-PostgresImage -Env "staging" -Dockerfile "Dockerfile.staging" -Tag "latest-staging"
        Test-PostgresImage -Tag "latest-staging"
    }
    "prod" {
        Build-PostgresImage -Env "prod" -Dockerfile "Dockerfile.prod" -Tag "latest-prod"
        Test-PostgresImage -Tag "latest-prod"
    }
    "all" {
        Build-PostgresImage -Env "dev" -Dockerfile "Dockerfile.dev" -Tag "latest-dev"
        Test-PostgresImage -Tag "latest-dev"
        
        Build-PostgresImage -Env "staging" -Dockerfile "Dockerfile.staging" -Tag "latest-staging"
        Test-PostgresImage -Tag "latest-staging"
        
        Build-PostgresImage -Env "prod" -Dockerfile "Dockerfile.prod" -Tag "latest-prod"
        Test-PostgresImage -Tag "latest-prod"
    }
}

Write-Host "Build process completed!" -ForegroundColor Cyan

# Show built images
Write-Host "`nBuilt images:" -ForegroundColor Yellow
docker images | Select-String "andriyko1983/events-postgres"