# PostgreSQL Database Backup Script for Events API
# Usage: .\backup-database.ps1

param(
    [string]$ContainerName = "docker-db-1",
    [string]$Database = "event_db",
    [string]$Username = "user",
    [string]$BackupDir = ".\backups"
)

# Create backup directory if it doesn't exist
if (!(Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force
    Write-Host "Created backup directory: $BackupDir"
}

# Generate timestamp for backup filename
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$BackupDir\backup_$timestamp.sql"

Write-Host "Starting backup of database '$Database' from container '$ContainerName'..."

try {
    # Create backup using pg_dump
    docker exec $ContainerName pg_dump -U $Username $Database > $backupFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backup completed successfully!"
        Write-Host "📁 Backup saved to: $backupFile"
        
        # Show backup file size
        $fileSize = (Get-Item $backupFile).Length
        $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
        Write-Host "📊 Backup size: $fileSizeMB MB"
    } else {
        Write-Error "❌ Backup failed with exit code: $LASTEXITCODE"
    }
} catch {
    Write-Error "❌ Error during backup: $($_.Exception.Message)"
}

Write-Host "`n🔧 To restore this backup, use:"
Write-Host "docker exec -i $ContainerName psql -U $Username $Database < $backupFile"