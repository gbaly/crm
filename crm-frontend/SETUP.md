# CRM Frontend - Setup & Usage Guide

## 🎯 Quick Start

### 1. Installation

```bash
cd crm-frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## 🔐 Login Credentials

**Mock Authentication** - Use any credentials:
- Email: `admin@example.com` (or any email)
- Password: `password` (or any password)

The system will automatically log you in and redirect to the dashboard.

## 🌍 Language Switching

1. **Default Language**: English (LTR)
2. **Toggle to Arabic**: Click the language button in the header (shows "ع" for Arabic or "EN" for English)
3. **Automatic RTL/LTR**: The entire UI switches direction automatically
4. **Persistence**: Language preference is saved in localStorage

## 🎨 Theme Switching

1. **Default Theme**: Light mode
2. **Toggle Dark Mode**: Click the sun/moon icon in the header
3. **Persistence**: Theme preference is saved in localStorage

## 📱 Navigation Structure

### Header (Top Bar)
- **Left**: Hamburger menu (mobile), Logo
- **Right**: Language toggle, Theme toggle, Notifications, User menu

### Sidebar (Left Panel)
- Dashboard
- Users & Roles
- Agents
- Customers
- Products & Inventory
- Sales & Invoices
- Services
- Commissions
- Audit Log
- Settings

### Footer (Bottom)
- Copyright information

## 👥 User Roles

### Admin Dashboard
Displays:
- Total Sales widget
- Best Agent widget
- Top Customer widget
- Profit widget
- Sales overview chart
- Recent activity log

### Agent Dashboard
Displays:
- Balance widget
- Commissions Earned widget
- Licenses Assigned widget
- Licenses Sold widget
- Recent customers list

## 📄 Page Descriptions

### 1. Users & Roles (`/users`)
- View all users in a table
- Add new users (button)
- Edit/Delete users
- Shows: Name, Email, Role, Status, Actions

### 2. Agents (`/agents`)
- View all agents in a table
- Add new agents (button)
- Assign licenses to agents
- Shows: Name, Email, Balance, Licenses

### 3. Customers (`/customers`)
- View all customers in a table
- Add new customers (button)
- Shows: Name, Email, Phone, Total Purchases

### 4. Products & Inventory (`/products`)
- Grid view of products
- Add new products (button)
- Shows: Name, Price, Stock, Category

### 5. Sales & Invoices (`/sales`)
- View all invoices in a table
- Create new invoice (button)
- Status badges (Paid/Pending/Overdue)
- Shows: Invoice Number, Customer, Amount, Date, Status

### 6. Services (`/services`)
- View service requests in a table
- Create new service request (button)
- Status badges (In Progress/Completed/Pending)
- Shows: Request Number, Type, Customer, Status

### 7. Commissions (`/commissions`)
- View commission reports
- Shows: Agent, Rate, Total Earned

### 8. Audit Log (`/audit`)
- View all system actions
- Export functionality (button)
- Shows: Action, User, Timestamp, Details

### 9. Settings (`/settings`)
- Company Information settings
- Currency settings
- Notification preferences

## 🎨 UI Components Used

### From Shadcn UI:
- **Button**: Primary actions, icon buttons
- **Card**: Content containers with header/body/footer
- **Input**: Form inputs
- **Label**: Form labels
- **Table**: Data tables with sorting
- **Dropdown Menu**: User menu, context menus
- **Avatar**: User avatars with fallback
- **Switch**: Toggle switches

### Custom Components:
- **Header**: Top navigation bar
- **Sidebar**: Left navigation panel
- **Footer**: Bottom bar
- **DashboardLayout**: Main layout wrapper

## 🔧 State Management

### Zustand Stores:

1. **useAuth** (`hooks/use-auth.ts`)
```typescript
const { user, token, isAuthenticated, login, logout } = useAuth();
```

2. **useTheme** (`hooks/use-theme.ts`)
```typescript
const { theme, toggleTheme, setTheme } = useTheme();
```

3. **useLanguage** (`hooks/use-language.ts`)
```typescript
const { language, direction, setLanguage } = useLanguage();
```

4. **useSidebar** (`hooks/use-sidebar.ts`)
```typescript
const { isOpen, toggle, open, close } = useSidebar();
```

## 🌐 Translations

### Using Translations in Components:

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('common.dashboard')}</h1>;
}
```

### Adding New Translations:

1. **English** (`locales/en.json`):
```json
{
  "mySection": {
    "myKey": "My English Text"
  }
}
```

2. **Arabic** (`locales/ar.json`):
```json
{
  "mySection": {
    "myKey": "النص العربي"
  }
}
```

## 📊 Charts & Data Visualization

**Recharts** is used for data visualization:

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
];

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="hsl(var(--primary))" />
  </BarChart>
</ResponsiveContainer>
```

## 🔌 API Integration

### API Client Setup (`lib/api.ts`)

```typescript
import { api } from '@/lib/api';

// GET request
const users = await api.get('/users');

// POST request
const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });

// PUT request
const updatedUser = await api.put('/users/1', { name: 'John Updated' });

// DELETE request
await api.delete('/users/1');
```

### Environment Variables

Create a `.env.local` file (copy from `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=CRM System
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (hamburger menu, stacked layout)
- **Tablet**: 768px - 1024px (collapsible sidebar)
- **Desktop**: > 1024px (fixed sidebar, multi-column)

## 🎯 Development Tips

### 1. Hot Reload
Changes to files automatically reload in the browser.

### 2. TypeScript Support
Full TypeScript support with auto-completion.

### 3. Linting
Run `npm run lint` to check for code issues.

### 4. Cairo Font
The Cairo font is automatically loaded from Google Fonts and applied globally.

### 5. Dark Mode Colors
All colors use CSS variables defined in `globals.css`. Modify these for custom theming.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Other Platforms
- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Connect GitHub repo
- **Railway**: Connect GitHub repo

## ⚡ Performance Tips

1. **Code Splitting**: Automatic with Next.js App Router
2. **Image Optimization**: Use Next.js `<Image>` component
3. **Font Optimization**: Cairo font is optimized via Google Fonts
4. **Static Generation**: Pages are pre-rendered at build time

## 🐛 Troubleshooting

### Issue: Language not switching
- Check browser console for i18next errors
- Verify translation files exist in `/locales`
- Clear localStorage: `localStorage.clear()`

### Issue: Theme not applying
- Check if CSS variables are defined in `globals.css`
- Verify ThemeProvider is wrapping the app
- Clear localStorage: `localStorage.clear()`

### Issue: Sidebar not showing on mobile
- Check if useSidebar hook is imported correctly
- Verify z-index values aren't conflicting
- Check responsive breakpoints in CSS

### Issue: Authentication not persisting
- Check if Zustand persist middleware is configured
- Verify localStorage is accessible
- Check browser privacy settings

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [i18next Documentation](https://www.i18next.com)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Recharts Documentation](https://recharts.org)

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review the README.md
3. Check the code comments
4. Search GitHub issues

---

**Happy Coding!** 🎉
