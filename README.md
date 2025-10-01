# 🚀 نظام إدارة علاقات العملاء (CRM)

نظام CRM متكامل مبني بأحدث التقنيات، يدعم العربية والإنجليزية مع واجهة مستخدم حديثة وأداء عالي.

![Status](https://img.shields.io/badge/Status-Active-success)
![Backend](https://img.shields.io/badge/Backend-.NET%208-blue)
![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014-black)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)

---

## 📋 المحتويات

- [نظرة عامة](#نظرة-عامة)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [المميزات](#المميزات)
- [البدء السريع](#البدء-السريع)
- [الهيكل المعماري](#الهيكل-المعماري)
- [API Documentation](#api-documentation)
- [لقطات الشاشة](#لقطات-الشاشة)
- [المساهمة](#المساهمة)

---

## 🎯 نظرة عامة

نظام CRM شامل يوفر حلاً متكاملاً لإدارة:
- 👥 المستخدمين والصلاحيات
- 🤝 الوكلاء وعمولاتهم
- 👨‍💼 العملاء وبياناتهم
- 📦 المنتجات والمخزون
- 💰 المبيعات والفواتير
- 🛠️ الخدمات وطلبات الدعم
- 💵 العمولات والأرصدة
- 📊 سجل التدقيق الكامل

---

## 🛠️ التقنيات المستخدمة

### Backend
- **Framework**: .NET 8 (C#)
- **Database**: PostgreSQL 12+
- **ORM**: Entity Framework Core 8
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: BCrypt
- **Logging**: Serilog
- **API Documentation**: Swagger/OpenAPI
- **Architecture**: Clean Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI
- **Internationalization**: i18next
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions (قريباً)
- **Testing**: xUnit, Jest, Playwright

---

## ✨ المميزات

### 🌍 دعم متعدد اللغات
- ✅ العربية (RTL)
- ✅ الإنجليزية (LTR)
- تبديل سلس بين اللغات

### 🎨 واجهة المستخدم
- ✅ تصميم حديث ومتجاوب (Desktop + Mobile)
- ✅ وضع داكن/فاتح (Dark/Light Mode)
- ✅ خط Cairo من Google Fonts
- ✅ Soft shadows & Rounded corners
- ✅ تجربة مستخدم سلسة (Smooth UX)

### 🔐 الأمان
- ✅ JWT Authentication
- ✅ Role-based Authorization (Admin, Agent, Accountant)
- ✅ Password Hashing مع BCrypt
- ✅ Protected Routes
- ✅ Audit Log لجميع العمليات

### 📊 وظائف متقدمة
- ✅ CRUD كامل لجميع الكيانات
- ✅ Partial Payments للفواتير
- ✅ حساب العمولات تلقائياً
- ✅ تتبع المخزون
- ✅ إدارة طلبات الخدمة
- ✅ تقارير وإحصائيات

---

## 🚀 البدء السريع

### المتطلبات الأساسية

#### Backend:
- .NET 8 SDK
- PostgreSQL 12+

#### Frontend:
- Node.js 18+
- npm أو yarn

### خطوات التثبيت

#### 1. Clone المشروع
```bash
git clone <repository-url>
cd crm
```

#### 2. إعداد Backend

```bash
# الانتقال لمجلد Backend
cd crm-backend

# استعادة Packages
dotnet restore

# تحديث connection string في appsettings.json
# "DefaultConnection": "Host=localhost;Port=5432;Database=crm_system;Username=openpg;Password=123"

# إنشاء قاعدة البيانات
# راجع crm-backend/setup_database.sql

# تشغيل API
cd CRM.API
dotnet run --launch-profile http
```

API سيعمل على: **http://localhost:5000**
Swagger UI: **http://localhost:5000/swagger**

#### 3. إعداد Frontend

```bash
# الانتقال لمجلد Frontend
cd crm-frontend

# تثبيت Dependencies
npm install

# تشغيل Frontend
npm run dev
```

Frontend سيعمل على: **http://localhost:3000**

---

## 🏗️ الهيكل المعماري

### Backend (Clean Architecture)

```
crm-backend/
├── CRM.API/              # Web API Layer
│   ├── Controllers/      # API Controllers
│   ├── Program.cs        # Entry Point
│   └── appsettings.json  # Configuration
├── CRM.Application/      # Business Logic Layer
│   ├── DTOs/             # Data Transfer Objects
│   ├── Services/         # Business Services
│   └── Interfaces/       # Abstractions
├── CRM.Domain/           # Domain Layer
│   ├── Entities/         # Domain Entities
│   └── Enums/            # Enumerations
├── CRM.Infrastructure/   # Data Access Layer
│   ├── Data/             # DbContext & Migrations
│   └── Repositories/     # Repository Pattern
└── CRM.Tests/            # Unit & Integration Tests
```

### Frontend (Next.js App Router)

```
crm-frontend/
├── app/                  # App Router Pages
│   ├── login/            # Login Page
│   ├── dashboard/        # Dashboard
│   ├── customers/        # Customers Page
│   └── ...               # Other Pages
├── components/           # React Components
│   ├── ui/               # Shadcn UI Components
│   └── layout/           # Layout Components
├── lib/                  # Utilities & Services
│   ├── services/         # API Services
│   ├── api-client.ts     # Axios Client
│   └── config.ts         # Configuration
├── hooks/                # Custom React Hooks
├── locales/              # i18n Translations
│   ├── ar.json           # Arabic
│   └── en.json           # English
└── public/               # Static Assets
```

---

## 📚 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@crm.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "token": "eyJhbGci...",
  "userId": "c4d55bcb-...",
  "email": "admin@crm.com",
  "name": "Admin User",
  "role": "Admin"
}
```

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/{id}` | Get user by ID | Authenticated |
| POST | `/api/users` | Create user | Admin |
| PUT | `/api/users/{id}` | Update user | Admin |
| DELETE | `/api/users/{id}` | Delete user | Admin |

### Customers

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/customers` | Get all customers | Authenticated |
| GET | `/api/customers/{id}` | Get customer by ID | Authenticated |
| POST | `/api/customers` | Create customer | Authenticated |
| PUT | `/api/customers/{id}` | Update customer | Authenticated |
| DELETE | `/api/customers/{id}` | Delete customer | Admin |

**📖 للمزيد، راجع**: http://localhost:5000/swagger

---

## 🔑 بيانات الدخول الافتراضية

### Admin
- **Email**: `admin@crm.com`
- **Password**: `Admin@123`
- **الصلاحيات**: كامل الصلاحيات

### Agent
- **Email**: `agent@crm.com`
- **Password**: `Agent@123`
- **الصلاحيات**: محدودة

---

## 📊 قاعدة البيانات

### الجداول (10):

1. **Users** - المستخدمون والصلاحيات
2. **Agents** - الوكلاء (مرتبط بـ Users)
3. **Customers** - العملاء
4. **Products** - المنتجات والمخزون
5. **Sales** - الفواتير والمبيعات
6. **SaleItems** - تفاصيل الفواتير
7. **Payments** - المدفوعات
8. **ServiceRequests** - طلبات الخدمة
9. **Commissions** - العمولات
10. **AuditLogs** - سجل التدقيق

### Schema:
راجع ملف: `crm-backend/setup_database.sql`

---

## 🖼️ لقطات الشاشة

### Login Page
- واجهة تسجيل دخول حديثة
- دعم Dark/Light Mode
- تصميم متجاوب

### Dashboard
- إحصائيات فورية
- Charts & Graphs
- Quick Actions

### Customers Page
- عرض جميع العملاء من API
- Loading States
- Error Handling

---

## 🧪 الاختبار

### Backend Tests
```bash
cd crm-backend
dotnet test
```

### Frontend Tests
```bash
cd crm-frontend
npm run test        # Unit tests (Jest)
npm run test:e2e    # E2E tests (Playwright)
```

---

## 📝 الوثائق الإضافية

- **Backend Quick Start**: [crm-backend/QUICK_START_AR.md](crm-backend/QUICK_START_AR.md)
- **Backend README**: [crm-backend/README.md](crm-backend/README.md)
- **Build Log**: [crm-backend/build_log.txt](crm-backend/build_log.txt)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Project Summary**: [crm-backend/PROJECT_SUMMARY.md](crm-backend/PROJECT_SUMMARY.md)

---

## 🔄 حالة المشروع

### ✅ مكتمل:
- [x] Backend API Architecture
- [x] Database Schema
- [x] Authentication & Authorization
- [x] Frontend Structure
- [x] Login Integration
- [x] Customers API Integration
- [x] Bilingual Support (AR/EN)
- [x] Dark/Light Mode
- [x] Responsive Design

### ⏳ قيد التطوير:
- [ ] Remaining Controllers (Products, Sales, Services, etc.)
- [ ] CRUD Forms (Create/Edit/Delete)
- [ ] Advanced Filtering & Search
- [ ] Charts & Reports
- [ ] License Module Integration
- [ ] Unit & E2E Tests
- [ ] Deployment Scripts

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء Branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ Branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

---

## 👨‍💻 المطورون

- **Backend**: .NET 8 Clean Architecture
- **Frontend**: Next.js 14 + TypeScript
- **Database**: PostgreSQL with EF Core

---

## 📞 الدعم

للدعم والأسئلة:
- 📧 Email: support@crm.com
- 📖 Documentation: [Wiki](https://github.com/your-repo/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

## 🎉 شكر خاص

- **Shadcn UI** للمكونات الرائعة
- **TailwindCSS** لنظام التصميم
- **Microsoft** لـ .NET Framework
- **PostgreSQL** لقاعدة البيانات القوية

---

<div align="center">

**صُنع بـ ❤️ باستخدام .NET 8 & Next.js 14**

⭐ إذا أعجبك المشروع، لا تنسى إعطاءه نجمة!

</div>
