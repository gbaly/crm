# 🚀 دليل تشغيل نظام CRM الكامل

## 📋 المحتويات
- [المتطلبات](#المتطلبات)
- [تشغيل Backend API](#تشغيل-backend-api)
- [تشغيل Frontend](#تشغيل-frontend)
- [الربط بين Frontend و Backend](#الربط-بين-frontend-و-backend)
- [بيانات الدخول](#بيانات-الدخول)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## ✅ المتطلبات

### Backend:
- ✅ .NET 8 SDK (مثبت)
- ✅ PostgreSQL 12+ (مثبت ويعمل)
- ✅ قاعدة البيانات `crm_system` (جاهزة)

### Frontend:
- ✅ Node.js 18+ (مثبت)
- ✅ npm أو yarn (مثبت)

---

## 🔧 تشغيل Backend API

### الخطوة 1: فتح Terminal للـ Backend

```powershell
# الانتقال لمجلد API
cd C:\Users\USER\Documents\crm\crm-backend\CRM.API

# تعيين بيئة التطوير
$env:ASPNETCORE_ENVIRONMENT="Development"

# تشغيل API
dotnet run --launch-profile http
```

### الخطوة 2: التحقق من عمل API

افتح المتصفح على:
- **API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger

### الخطوة 3: اختبار تسجيل الدخول

```powershell
# PowerShell
$body = '{"email":"admin@crm.com","password":"Admin@123"}'
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

✅ **النتيجة المتوقعة**: ستحصل على JWT token

---

## 🎨 تشغيل Frontend

### الخطوة 1: فتح Terminal جديد للـ Frontend

```powershell
# الانتقال لمجلد Frontend
cd C:\Users\USER\Documents\crm\crm-frontend

# تثبيت Dependencies (إذا لم تكن مثبتة)
npm install

# تشغيل Frontend في وضع التطوير
npm run dev
```

### الخطوة 2: فتح التطبيق

افتح المتصفح على: **http://localhost:3000**

---

## 🔗 الربط بين Frontend و Backend

### 1. ملف الإعدادات

تم إنشاء ملف `lib/config.ts` يحتوي على:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
    },
    USERS: '/api/users',
    CUSTOMERS: '/api/customers',
    // ... المزيد
  },
};
```

### 2. API Client

تم إنشاء `lib/api-client.ts` مع:
- ✅ Axios instance مع Base URL
- ✅ Request interceptor لإضافة JWT token تلقائياً
- ✅ Response interceptor لمعالجة الأخطاء
- ✅ إعادة توجيه تلقائية عند انتهاء الجلسة (401)

### 3. Services

تم إنشاء Services لكل كيان:
- ✅ **Auth Service** (`lib/services/auth.service.ts`)
- ✅ **User Service** (`lib/services/user.service.ts`)
- ✅ **Customer Service** (`lib/services/customer.service.ts`)

### 4. الصفحات المحدثة

#### صفحة Login:
- ✅ تستخدم `authService.login()` للاتصال بـ API الحقيقي
- ✅ تحفظ JWT token في localStorage
- ✅ تحفظ بيانات المستخدم في localStorage
- ✅ إعادة توجيه للـ Dashboard بعد نجاح تسجيل الدخول

#### صفحة Customers:
- ✅ تستخدم `customerService.getAll()` لجلب العملاء من API
- ✅ عرض Loading state
- ✅ معالجة الأخطاء
- ✅ عرض رسالة "لا توجد بيانات" عند عدم وجود عملاء

---

## 🔑 بيانات الدخول

### Admin (المدير):
- **Email**: `admin@crm.com`
- **Password**: `Admin@123`
- **Role**: Admin
- **الصلاحيات**: كامل الصلاحيات

### Agent (الوكيل):
- **Email**: `agent@crm.com`
- **Password**: `Agent@123`
- **Role**: Agent
- **الصلاحيات**: صلاحيات محدودة

---

## 🧪 كيفية الاختبار

### 1. اختبار تسجيل الدخول

1. شغل Backend و Frontend
2. افتح http://localhost:3000
3. ستجد نفسك في صفحة Login
4. أدخل:
   - Email: `admin@crm.com`
   - Password: `Admin@123`
5. اضغط "تسجيل الدخول"
6. ✅ يجب أن يتم توجيهك للـ Dashboard

### 2. اختبار صفحة Customers

1. من الـ Sidebar، اضغط على "العملاء"
2. ✅ يجب أن ترى قائمة بـ 2 عملاء من قاعدة البيانات:
   - TechCorp Inc
   - Digital Solutions Ltd

### 3. اختبار Logout

1. من الـ Header، اضغط على أيقونة المستخدم
2. اختر "تسجيل الخروج"
3. ✅ يجب أن يتم حذف Token وإعادة التوجيه لصفحة Login

---

## 📊 API Endpoints المتاحة

### 🔐 Authentication
| Method | Endpoint | وصف |
|--------|----------|-----|
| POST | `/api/auth/login` | تسجيل الدخول |

### 👥 Users
| Method | Endpoint | وصف | صلاحيات |
|--------|----------|-----|----------|
| GET | `/api/users` | عرض جميع المستخدمين | Admin only |
| GET | `/api/users/{id}` | عرض مستخدم محدد | Authenticated |
| POST | `/api/users` | إنشاء مستخدم | Admin only |
| PUT | `/api/users/{id}` | تحديث مستخدم | Admin only |
| DELETE | `/api/users/{id}` | حذف مستخدم | Admin only |

### 👤 Customers
| Method | Endpoint | وصف | صلاحيات |
|--------|----------|-----|----------|
| GET | `/api/customers` | عرض جميع العملاء | Authenticated |
| GET | `/api/customers/{id}` | عرض عميل محدد | Authenticated |
| POST | `/api/customers` | إنشاء عميل | Authenticated |
| PUT | `/api/customers/{id}` | تحديث عميل | Authenticated |
| DELETE | `/api/customers/{id}` | حذف عميل | Admin only |

---

## 🛠️ استكشاف الأخطاء

### ❌ Backend لا يعمل

**المشكلة**: `dotnet: command not found`
**الحل**: تأكد من تثبيت .NET 8 SDK

```powershell
dotnet --version
# يجب أن يظهر: 8.0.414
```

**المشكلة**: `Connection refused`
**الحل**: تأكد من أن PostgreSQL يعمل

```powershell
Get-Service | Where-Object {$_.Name -like "*postgres*"}
```

### ❌ Frontend لا يتصل بـ Backend

**المشكلة**: `Network Error` أو `CORS Error`
**الحل**: 
1. تأكد من أن Backend يعمل على port 5000
2. تأكد من CORS مفعّل في Backend
3. افتح Developer Tools → Console للتحقق من الأخطاء

**المشكلة**: `401 Unauthorized`
**الحل**:
1. سجل الدخول مرة أخرى
2. تأكد من أن JWT token موجود في localStorage:
```javascript
console.log(localStorage.getItem('token'));
```

### ❌ صفحة Customers فارغة

**المشكلة**: لا تظهر بيانات
**الحل**:
1. افتح Developer Tools → Network
2. ابحث عن طلب `/api/customers`
3. تحقق من Response
4. إذا كانت 200 OK ولكن `[]` فارغة، تحقق من قاعدة البيانات:

```powershell
$env:PGPASSWORD="123"
& "C:\Program Files\Odoo 18.0.20250917\PostgreSQL\bin\psql.exe" -U openpg -d crm_system -c 'SELECT * FROM "Customers";'
```

---

## 🔄 الخطوات التالية

### لإكمال المشروع:

#### Backend:
- [ ] إنشاء Controllers المتبقية:
  - ProductsController
  - SalesController
  - ServicesController
  - CommissionsController
  - AgentsController
  - AuditLogsController
- [ ] إضافة FluentValidation
- [ ] كتابة Unit Tests
- [ ] تكامل مع License Module

#### Frontend:
- [ ] تحديث صفحة Users لاستخدام API
- [ ] تحديث صفحة Products
- [ ] تحديث صفحة Sales
- [ ] تحديث صفحة Services
- [ ] إضافة نماذج Create/Edit للعملاء
- [ ] إضافة تأكيد Delete
- [ ] تحسين معالجة الأخطاء
- [ ] إضافة Notifications/Toasts

---

## 📝 ملاحظات هامة

### JWT Token:
- مدة صلاحية Token: **24 ساعة**
- يتم حفظ Token في `localStorage`
- يتم إضافة Token تلقائياً لكل طلب عبر Axios interceptor
- عند انتهاء صلاحية Token (401)، يتم حذفه وإعادة التوجيه لصفحة Login

### CORS:
- Backend يسمح بطلبات من أي مصدر (`AllowAll`)
- في الإنتاج، يجب تحديد المصادر المسموح بها

### Database:
- قاعدة البيانات: `crm_system`
- Username: `openpg`
- Password: `123`
- Host: `localhost`
- Port: `5432`

---

## 🎉 تهانينا!

الآن لديك نظام CRM كامل يعمل مع:
- ✅ Backend API متكامل
- ✅ Frontend حديث ومتجاوب
- ✅ Authentication بـ JWT
- ✅ قاعدة بيانات PostgreSQL
- ✅ دعم العربية والإنجليزية
- ✅ Dark/Light Mode

**للمساعدة أو الأسئلة، راجع:**
- `crm-backend/QUICK_START_AR.md`
- `crm-backend/build_log.txt`
- `crm-backend/README.md`
- `crm-frontend/README.md`
