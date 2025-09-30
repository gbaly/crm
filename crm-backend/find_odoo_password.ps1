# Script to find Odoo PostgreSQL password

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Searching for Odoo PostgreSQL Password" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Common Odoo configuration file locations
$possiblePaths = @(
    "C:\Program Files\Odoo*\server\odoo.conf",
    "C:\Program Files (x86)\Odoo*\server\odoo.conf",
    "C:\Odoo*\server\odoo.conf",
    "$env:USERPROFILE\.odoorc",
    "C:\ProgramData\Odoo\odoo.conf"
)

$found = $false

foreach ($pattern in $possiblePaths) {
    $files = Get-ChildItem -Path $pattern -ErrorAction SilentlyContinue -Recurse
    
    foreach ($file in $files) {
        Write-Host "Found config file: $($file.FullName)" -ForegroundColor Green
        Write-Host ""
        
        $content = Get-Content $file.FullName
        
        # Search for db_password
        $passwordLine = $content | Select-String -Pattern "db_password"
        if ($passwordLine) {
            Write-Host "PostgreSQL Password found:" -ForegroundColor Yellow
            Write-Host $passwordLine -ForegroundColor White
            $found = $true
        }
        
        # Search for db_user
        $userLine = $content | Select-String -Pattern "db_user"
        if ($userLine) {
            Write-Host "PostgreSQL User:" -ForegroundColor Yellow
            Write-Host $userLine -ForegroundColor White
        }
        
        Write-Host ""
    }
}

if (-not $found) {
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "No Odoo config files found!" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Try these common passwords:" -ForegroundColor Yellow
    Write-Host "  - odoo" -ForegroundColor White
    Write-Host "  - openpgpwd" -ForegroundColor White
    Write-Host "  - postgres" -ForegroundColor White
    Write-Host "  - (empty password)" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
