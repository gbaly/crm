# 🚀 دليل التشغيل السريع - نظام CRM

## ✅ المتطلبات
- .NET 8 SDK ✅ (مثبت)
- PostgreSQL 12+ ✅ (مثبت)
- قاعدة البيانات `crm_system` ✅ (جاهزة)

---

## 🔧 تشغيل Backend API

### 1. الانتقال لمجلد API:
```powershell
cd C:\Users\USER\Documents\crm\crm-backend\CRM.API
```

### 2. تشغيل API:
```powershell
$env:ASPNETCORE_ENVIRONMENT="Development"
dotnet run --launch-profile http
```

### 3. فتح Swagger UI:
افتح المتصفح على: `http://localhost:5000/swagger`

---

## 🔑 بيانات الدخول

### Admin (مدير):
- **Email**: `admin@crm.com`
- **Password**: `Admin@123`
- **Role**: Admin

### Agent (وكيل):
- **Email**: `agent@crm.com`
- **Password**: `Agent@123`
- **Role**: Agent

---

## 📋 API Endpoints المتاحة

### 🔐 Authentication
- `POST /api/auth/login` - تسجيل الدخول

### 👥 Users
- `GET /api/users` - عرض جميع المستخدمين (Admin only)
- `GET /api/users/{id}` - عرض مستخدم محدد
- `POST /api/users` - إنشاء مستخدم جديد (Admin only)
- `PUT /api/users/{id}` - تحديث مستخدم (Admin only)
- `DELETE /api/users/{id}` - حذف مستخدم (Admin only)

### 👤 Customers
- `GET /api/customers` - عرض جميع العملاء
- `GET /api/customers/{id}` - عرض عميل محدد
- `POST /api/customers` - إنشاء عميل جديد
- `PUT /api/customers/{id}` - تحديث عميل
- `DELETE /api/customers/{id}` - حذف عميل

---

## 🧪 اختبار API

### تسجيل الدخول:
```powershell
$body = '{"email":"admin@crm.com","password":"Admin@123"}'
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

### عرض المستخدمين (يحتاج Token):
```powershell
$token = "YOUR_JWT_TOKEN_HERE"
$headers = @{"Authorization" = "Bearer $token"}
Invoke-RestMethod -Uri "http://localhost:5000/api/users" -Method GET -Headers $headers
```

---

## 📊 قاعدة البيانات

### معلومات الاتصال:
- **Host**: localhost
- **Port**: 5432
- **Database**: crm_system
- **Username**: openpg
- **Password**: 123

### الجداول (10):
1. **Users** - المستخدمين
2. **Agents** - الوكلاء
3. **Customers** - العملاء
4. **Products** - المنتجات
5. **Sales** - المبيعات
6. **SaleItems** - تفاصيل المبيعات
7. **Payments** - المدفوعات
8. **ServiceRequests** - طلبات الخدمة
9. **Commissions** - العمولات
10. **AuditLogs** - سجل التدقيق

---

## 🛠️ إعادة تعيين قاعدة البيانات

إذا أردت إعادة إنشاء قاعدة البيانات:

```powershell
# حذف القاعدة
$env:PGPASSWORD="123"
& "C:\Program Files\Odoo 18.0.20250917\PostgreSQL\bin\psql.exe" -U openpg -d postgres -c "DROP DATABASE crm_system;"

# إعادة إنشائها
& "C:\Program Files\Odoo 18.0.20250917\PostgreSQL\bin\psql.exe" -U openpg -d postgres -c "CREATE DATABASE crm_system OWNER openpg;"

# تنفيذ SQL
& "C:\Program Files\Odoo 18.0.20250917\PostgreSQL\bin\psql.exe" -U openpg -d crm_system -f "C:\Users\USER\Documents\crm\crm-backend\setup_database.sql"
```

---

## 📝 Logs

ملفات الـ Logs موجودة في:
```
C:\Users\USER\Documents\crm\crm-backend\CRM.API\Logs\
```

---

## 🔄 الخطوات التالية

### لإكمال Backend:
1. ✅ إنشاء Controllers المتبقية (Products, Sales, Services, Commissions, Agents, AuditLogs)
2. ✅ إضافة Validation باستخدام FluentValidation
3. ✅ إضافة Unit Tests
4. ✅ تكامل مع License Module

### لربط Frontend:
1. ✅ تحديث `.env.local` في crm-frontend بـ API URL
2. ✅ اختبار تسجيل الدخول من Frontend
3. ✅ ربط جميع الصفحات بـ API

---

## ❓ استكشاف الأخطاء

### API لا يعمل؟
```powershell
# تحقق من العمليات الجارية
Get-Process -Name dotnet

# تحقق من المنافذ
netstat -ano | findstr ":5000"
```

### قاعدة البيانات لا تعمل؟
```powershell
# تحقق من خدمة PostgreSQL
Get-Service | Where-Object {$_.Name -like "*postgres*"}
```

---

**🎉 نظام CRM جاهز للتطوير والاستخدام!**
