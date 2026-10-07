$src = "C:\Users\Saurabh\.gemini\antigravity-ide\scratch\job-notification-portal"
$desktop = [System.Environment]::GetFolderPath('Desktop')
$dest = Join-Path $desktop "job-portal-files"
$zip = Join-Path $desktop "job-portal-deploy.zip"

Write-Host "Creating clean export folder on Desktop: $dest"
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
New-Item -ItemType Directory -Path $dest -Force | Out-Null

$exclude = @('node_modules', '.next', '.git')
Get-ChildItem -Path $src | Where-Object { $exclude -notcontains $_.Name } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
}

Write-Host "Creating clean deployment ZIP on Desktop: $zip"
if (Test-Path $zip) { Remove-Item -Force $zip }
Compress-Archive -Path "$dest\*" -DestinationPath $zip -Force

Write-Host "EXPORT COMPLETE!"
Write-Host "Folder: $(Test-Path $dest)"
Write-Host "Zip file: $(Test-Path $zip)"
