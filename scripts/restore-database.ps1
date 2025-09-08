# PostgreSQL Database Restore Script for Events API
# Usage: .\restore-database.ps1 -BackupFile ".\backups\backup_20250907_123456.sql"

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFile,
    [string]$ContainerName = "docker-db-1",
    [string]$Database = "event_db",
    [string]$Username = "user"
)

# Check if backup file exists
if (!(Test-Path $BackupFile)) {
    Write-Error "❌ Backup file not found: $BackupFile"
    exit 1
}

Write-Host "Starting restore of database '$Database' from backup file '$BackupFile'..."
Write-Host "⚠️  WARNING: This will overwrite the existing database!"

# Ask for confirmation
$confirmation = Read-Host "Are you sure you want to continue? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "❌ Restore cancelled by user."
    exit 0
}

try {
    # Restore database using psql
    Get-Content $BackupFile | docker exec -i $ContainerName psql -U $Username $Database
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database restore completed successfully!"
        Write-Host "📁 Restored from: $BackupFile"
    } else {
        Write-Error "❌ Restore failed with exit code: $LASTEXITCODE"
    }
} catch {
    Write-Error "❌ Error during restore: $($_.Exception.Message)"
}

Write-Host "`n🔧 You may need to restart your application to reflect the changes."