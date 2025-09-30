# CRM Frontend System

A modern, bilingual (Arabic/English) CRM system built with Next.js 14, TypeScript, TailwindCSS, and Shadcn UI.

> 📚 **Complete Documentation:** See [INDEX.md](INDEX.md) for a comprehensive guide to all documentation files.

## 🌟 Features

- ✅ **Bilingual Support**: Arabic (RTL) and English (LTR) with i18next
- ✅ **Dark/Light Mode**: Theme switcher with persistent storage
- ✅ **Responsive Design**: Mobile-first approach with collapsible sidebar
- ✅ **Modern UI**: Clean design with Shadcn UI components
- ✅ **Cairo Font**: Google Fonts integration for both languages
- ✅ **Authentication**: Login system with JWT token handling
- ✅ **Role-Based Views**: Different dashboards for Admin and Agent roles
- ✅ **Data Visualization**: Charts and widgets using Recharts
- ✅ **State Management**: Zustand for global state

## 📁 Project Structure

```
crm-frontend/
├── app/                    # Next.js 14 App Router pages
│   ├── dashboard/         # Admin & Agent dashboards
│   ├── users/             # Users & Roles management
│   ├── agents/            # Agents management
│   ├── customers/         # Customers management
│   ├── products/          # Products & Inventory
│   ├── sales/             # Sales & Invoices
│   ├── services/          # Service requests
│   ├── commissions/       # Commission settings
│   ├── audit/             # Audit log
│   ├── settings/          # System settings
│   └── login/             # Authentication page
├── components/
│   ├── ui/                # Shadcn UI components
│   ├── layout/            # Layout components (Header, Sidebar, Footer)
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks (Zustand stores)
│   ├── use-auth.ts       # Authentication state
│   ├── use-theme.ts      # Theme state
│   ├── use-language.ts   # Language state
│   └── use-sidebar.ts    # Sidebar state
├── lib/                   # Utilities and configurations
│   ├── i18n.ts           # i18next configuration
│   └── utils.ts          # Helper functions
├── locales/              # Translation files
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
└── styles/
    └── globals.css       # Global styles with Cairo font
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd crm-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Authentication

The app includes a mock authentication system:

- **Email**: Any valid email (e.g., admin@example.com)
- **Password**: Any password
- Upon successful login, you'll be redirected to the dashboard

## 📱 Pages Overview

### Authentication
- **Login Page**: Bilingual login form with email/password

### Dashboards
- **Admin Dashboard**: 
  - Total sales, best agent, top customer, profit widgets
  - Sales overview chart
  - Recent activity log
  
- **Agent Dashboard**:
  - Balance, commissions, licenses widgets
  - Recent customers list

### Management Pages
1. **Users & Roles**: User management with CRUD operations
2. **Agents**: Agent management with license assignment
3. **Customers**: Customer database with purchase history
4. **Products & Inventory**: Product catalog with grid view
5. **Sales & Invoices**: Invoice management with status tracking
6. **Services**: Service request tracking
7. **Commissions**: Commission settings and reports
8. **Audit Log**: System activity tracking with export functionality
9. **Settings**: Company info, currency, and notification settings

## 🎨 Design System

### Colors
- **Neutral**: Base color scheme
- **Primary**: Dark theme for buttons and accents
- **Secondary**: Light gray for secondary elements
- **Destructive**: Red for delete/error actions

### Typography
- **Font**: Cairo (Google Fonts)
- **Weight**: 300, 400, 500, 600, 700

### Components (Shadcn UI)
- Button
- Card
- Input
- Label
- Table
- Dropdown Menu
- Avatar
- Switch

## 🌐 Internationalization (i18n)

### Language Switching
- Toggle between Arabic and English using the language switcher in the header
- Automatic RTL/LTR direction switching
- Persistent language preference in localStorage

### Adding Translations
Edit translation files in `/locales`:
- `en.json` for English
- `ar.json` for Arabic

Example:
```json
{
  "common": {
    "dashboard": "Dashboard"
  }
}
```

## 🎨 Theming

### Dark/Light Mode
- Click the sun/moon icon in the header to toggle themes
- Theme preference is saved in localStorage
- CSS variables for easy customization in `globals.css`

## 📊 State Management

### Zustand Stores
- **useAuth**: Authentication state (user, token, login/logout)
- **useTheme**: Theme state (light/dark toggle)
- **useLanguage**: Language state (en/ar with direction)
- **useSidebar**: Sidebar state (open/close)

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: Re-usable component library
- **i18next**: Internationalization framework
- **Zustand**: State management
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **Radix UI**: Headless UI components

## 📱 Responsive Design

- **Mobile**: Hamburger menu, full-width cards
- **Tablet**: Collapsible sidebar
- **Desktop**: Fixed sidebar, multi-column layouts

## 🔒 Security Features

- JWT token storage in Zustand with persistence
- Protected routes (redirect to login if not authenticated)
- Role-based dashboard views

## 🚧 Future Enhancements

- [ ] API integration with backend
- [ ] Real-time notifications
- [ ] Advanced data filtering
- [ ] File upload functionality
- [ ] Email/SMS notifications
- [ ] Export to PDF/Excel
- [ ] Advanced charts and analytics
- [ ] Multi-tenancy support

## 📝 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for modern CRM systems

---

**Note**: This is a frontend-only implementation. For full functionality, integrate with your backend API according to the Swagger documentation.