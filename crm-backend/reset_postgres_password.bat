@echo off
echo ============================================
echo PostgreSQL Password Reset Script
echo ============================================
echo.

echo Step 1: Finding PostgreSQL installation...
set PGPATH=
for /d %%i in ("C:\Program Files\PostgreSQL\*") do set PGPATH=%%i\bin
for /d %%i in ("C:\PostgreSQL\*") do set PGPATH=%%i\bin
for /d %%i in ("%ProgramFiles(x86)%\PostgreSQL\*") do set PGPATH=%%i\bin

if "%PGPATH%"=="" (
    echo PostgreSQL not found in standard locations.
    echo Please locate your PostgreSQL installation manually.
    pause
    exit /b
)

echo Found PostgreSQL at: %PGPATH%
echo.

echo Step 2: Resetting password...
echo Enter new password for postgres user (e.g., 123):
set /p NEWPASS=

"%PGPATH%\psql.exe" -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD '%NEWPASS%';"

if errorlevel 1 (
    echo.
    echo ============================================
    echo ERROR: Could not connect to PostgreSQL
    echo ============================================
    echo.
    echo Try these alternatives:
    echo 1. Find pg_hba.conf file
    echo 2. Change 'md5' to 'trust' for local connections
    echo 3. Restart PostgreSQL service
    echo 4. Try password reset again
    echo.
    pause
) else (
    echo.
    echo ============================================
    echo SUCCESS: Password changed successfully!
    echo ============================================
    echo.
    echo New password: %NEWPASS%
    echo.
    echo You can now use this password in pgAdmin.
    echo.
    pause
)
