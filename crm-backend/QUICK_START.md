# 🚀 CRM Backend - Quick Start Guide

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Prerequisites

#### Windows:
```powershell
# Install .NET 8 SDK
winget install Microsoft.DotNet.SDK.8

# Install PostgreSQL
winget install PostgreSQL.PostgreSQL
```

#### Linux/Mac:
```bash
# Install .NET 8 SDK
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 8.0

# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib
```

### Step 2: Setup Database

```bash
# Start PostgreSQL
sudo service postgresql start  # Linux
# or
# pg_ctl start  # Windows/Mac

# Create database
sudo -u postgres psql
CREATE DATABASE crm_system;
\q
```

### Step 3: Run the Application

```bash
cd crm-backend

# Restore packages
dotnet restore

# Apply migrations
cd CRM.API
dotnet ef database update

# Run
dotnet run
```

### Step 4: Access the API

🌐 **Swagger UI:** http://localhost:5000/swagger  
📚 **API Base:** http://localhost:5000/api

### Step 5: Login

Default credentials:
- **Admin:**
  - Email: `admin@crm.com`
  - Password: `Admin@123`
  
- **Agent:**
  - Email: `agent@crm.com`
  - Password: `Agent@123`

---

## 🐳 Docker Quick Start (Even Faster!)

```bash
cd crm-backend

# Start everything with Docker Compose
docker-compose up -d

# Access API
# Swagger: http://localhost:5000/swagger
```

That's it! 🎉

---

## 📝 Quick API Test

### 1. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@crm.com",
    "password": "Admin@123"
  }'
```

### 2. Get Users (use token from login)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Create Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Customer",
    "email": "customer@example.com",
    "phone": "+1234567890"
  }'
```

---

## 🔧 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Update connection string in appsettings.json
"DefaultConnection": "Host=localhost;Port=5432;Database=crm_system;Username=postgres;Password=YOUR_PASSWORD"
```

### Migration Errors
```bash
# Remove all migrations
dotnet ef migrations remove

# Create fresh migration
dotnet ef migrations add InitialCreate

# Apply to database
dotnet ef database update
```

### Port Already in Use
```bash
# Change port in Properties/launchSettings.json
# or
dotnet run --urls="http://localhost:5001"
```

---

## 📖 Next Steps

1. ✅ Read [README.md](README.md) for full documentation
2. ✅ Check [build_log.txt](build_log.txt) for build details
3. ✅ Explore Swagger UI at http://localhost:5000/swagger
4. ✅ Customize appsettings.json
5. ✅ Add more controllers and features

---

**Happy Coding! 🎉**
