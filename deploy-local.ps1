# Local Deployment Script for Events API
# Usage: .\deploy-local.ps1 [environment] [action]
# Examples:
#   .\deploy-local.ps1 dev up
#   .\deploy-local.ps1 staging down
#   .\deploy-local.ps1 prod restart

param(
    [Parameter(Position=0)]
    [ValidateSet("dev", "staging", "prod")]
    [string]$Environment = "dev",
    
    [Parameter(Position=1)]
    [ValidateSet("up", "down", "restart", "logs", "status")]
    [string]$Action = "up"
)

# Configuration
$ComposeFiles = @{
    "dev" = "src\docker\docker-compose.yml"
    "staging" = "docker-compose.staging.yml"
    "prod" = "docker-compose.prod.yml"
}

$EnvFiles = @{
    "dev" = ".env"
    "staging" = ".env.staging"
    "prod" = ".env.production"
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-Prerequisites {
    # Check if Docker is running
    try {
        docker version | Out-Null
        Write-ColorOutput "✅ Docker is running" "Green"
    } catch {
        Write-ColorOutput "❌ Docker is not running. Please start Docker Desktop." "Red"
        exit 1
    }
    
    # Check if compose file exists
    $composeFile = $ComposeFiles[$Environment]
    if (-not (Test-Path $composeFile)) {
        Write-ColorOutput "❌ Docker compose file not found: $composeFile" "Red"
        exit 1
    }
    
    # Check if env file exists
    $envFile = $EnvFiles[$Environment]
    if (-not (Test-Path $envFile)) {
        Write-ColorOutput "⚠️  Environment file not found: $envFile" "Yellow"
        Write-ColorOutput "Creating from example..." "Yellow"
        
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" $envFile
            Write-ColorOutput "✅ Created $envFile from .env.example" "Green"
            Write-ColorOutput "Please update $envFile with your configuration" "Yellow"
        }
    }
}

function Start-Services {
    Write-ColorOutput "🚀 Starting $Environment environment..." "Cyan"
    
    $composeFile = $ComposeFiles[$Environment]
    $envFile = $EnvFiles[$Environment]
    
    # Pull latest images
    Write-ColorOutput "📥 Pulling latest images..." "Blue"
    docker-compose -f $composeFile --env-file $envFile pull
    
    # Start services
    Write-ColorOutput "🔄 Starting services..." "Blue"
    docker-compose -f $composeFile --env-file $envFile up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Services started successfully!" "Green"
        
        # Wait for database to be ready
        Write-ColorOutput "⏳ Waiting for database to be ready..." "Yellow"
        Start-Sleep -Seconds 30
        
        # Run migrations if this is not dev environment
        if ($Environment -ne "dev") {
            Write-ColorOutput "🔄 Running database migrations..." "Blue"
            docker-compose -f $composeFile --env-file $envFile exec app npx prisma migrate deploy
        }
        
        # Show status
        Show-Status
    } else {
        Write-ColorOutput "❌ Failed to start services" "Red"
        exit 1
    }
}

function Stop-Services {
    Write-ColorOutput "🛑 Stopping $Environment environment..." "Cyan"
    
    $composeFile = $ComposeFiles[$Environment]
    $envFile = $EnvFiles[$Environment]
    
    docker-compose -f $composeFile --env-file $envFile down
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Services stopped successfully!" "Green"
    } else {
        Write-ColorOutput "❌ Failed to stop services" "Red"
    }
}

function Restart-Services {
    Write-ColorOutput "🔄 Restarting $Environment environment..." "Cyan"
    Stop-Services
    Start-Sleep -Seconds 5
    Start-Services
}

function Show-Logs {
    Write-ColorOutput "📋 Showing logs for $Environment environment..." "Cyan"
    
    $composeFile = $ComposeFiles[$Environment]
    $envFile = $EnvFiles[$Environment]
    
    docker-compose -f $composeFile --env-file $envFile logs -f
}

function Show-Status {
    param([string]$Env = $Environment)
    
    Write-ColorOutput "📊 Status for $Env environment:" "Cyan"
    
    $composeFile = $ComposeFiles[$Env]
    $envFile = $EnvFiles[$Env]
    
    # Show running containers
    docker-compose -f $composeFile --env-file $envFile ps
    
    # Show resource usage
    Write-ColorOutput "`n💾 Resource Usage:" "Yellow"
    docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
    
    # Test database connection
    Write-ColorOutput "`n🔍 Testing database connection..." "Blue"
    $dbTest = docker-compose -f $composeFile --env-file $envFile exec -T db pg_isready -U user -d event_db 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Database is ready" "Green"
    } else {
        Write-ColorOutput "❌ Database is not ready" "Red"
    }
    
    # Show URLs
    Write-ColorOutput "`n🌐 Available URLs:" "Yellow"
    Write-ColorOutput "Application: http://localhost:3000" "White"
    if ($Env -ne "prod") {
        Write-ColorOutput "PgAdmin: http://localhost:8080" "White"
    }
}

# Main execution
Write-ColorOutput "Events API Local Deployment" "Cyan"
Write-ColorOutput "===========================" "Cyan"
Write-ColorOutput "Environment: $Environment" "Yellow"
Write-ColorOutput "Action: $Action" "Yellow"
Write-ColorOutput ""

# Test prerequisites
Test-Prerequisites

# Execute action
switch ($Action) {
    "up" { Start-Services }
    "down" { Stop-Services }
    "restart" { Restart-Services }
    "logs" { Show-Logs }
    "status" { 
        Write-ColorOutput "Status for $Environment environment:" "Cyan"
        
        $composeFile = $ComposeFiles[$Environment]
        $envFile = $EnvFiles[$Environment]
        
        # Show running containers
        if (Test-Path $composeFile) {
            docker-compose -f $composeFile --env-file $envFile ps
        } else {
            Write-ColorOutput "Warning: Compose file not found: $composeFile" "Yellow"
        }
        
        # Show resource usage
        Write-ColorOutput "`nResource Usage:" "Yellow"
        docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" 2>$null
        
        # Show URLs
        Write-ColorOutput "`nAvailable URLs:" "Yellow"
        Write-ColorOutput "Application: http://localhost:3000" "White"
        if ($Environment -ne "prod") {
            Write-ColorOutput "PgAdmin: http://localhost:8080" "White"
        }
    }
}

Write-ColorOutput "`nDeployment script completed!" "Cyan"