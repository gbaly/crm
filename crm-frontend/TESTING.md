# Testing Guide

## 🧪 Testing Strategy

This CRM system includes manual testing scenarios and guidelines for implementing automated tests.

## ✅ Manual Testing Checklist

### 1. Authentication Flow

#### Login Page (`/login`)
- [ ] Page loads correctly
- [ ] Form displays email and password fields
- [ ] Submit button is clickable
- [ ] Loading state shows during submission
- [ ] Successful login redirects to `/dashboard`
- [ ] User data is stored in state
- [ ] Token is saved for API calls

### 2. Language Switching

#### English to Arabic
- [ ] Click language toggle in header
- [ ] UI switches to Arabic text
- [ ] Direction changes to RTL
- [ ] Language preference persists on refresh
- [ ] All pages show Arabic translations

#### Arabic to English
- [ ] Click language toggle in header
- [ ] UI switches to English text
- [ ] Direction changes to LTR
- [ ] Language preference persists on refresh
- [ ] All pages show English translations

### 3. Theme Switching

#### Light to Dark
- [ ] Click theme toggle (moon icon)
- [ ] Background changes to dark
- [ ] Text colors update appropriately
- [ ] Cards and components adapt to dark theme
- [ ] Theme persists on refresh

#### Dark to Light
- [ ] Click theme toggle (sun icon)
- [ ] Background changes to light
- [ ] Text colors update appropriately
- [ ] Cards and components adapt to light theme
- [ ] Theme persists on refresh

### 4. Responsive Design

#### Mobile (< 768px)
- [ ] Sidebar is hidden by default
- [ ] Hamburger menu appears in header
- [ ] Clicking hamburger opens sidebar
- [ ] Overlay appears behind sidebar
- [ ] Clicking overlay closes sidebar
- [ ] All pages are scrollable
- [ ] Cards stack vertically
- [ ] Tables are scrollable horizontally

#### Tablet (768px - 1024px)
- [ ] Sidebar is collapsible
- [ ] Layout adjusts to medium screen
- [ ] Cards display in appropriate grid
- [ ] Navigation works smoothly

#### Desktop (> 1024px)
- [ ] Sidebar is always visible
- [ ] Multi-column layouts work
- [ ] Full dashboard view
- [ ] All interactive elements are accessible

### 5. Navigation

#### Sidebar Links
- [ ] Dashboard link navigates correctly
- [ ] Users link navigates correctly
- [ ] Agents link navigates correctly
- [ ] Customers link navigates correctly
- [ ] Products link navigates correctly
- [ ] Sales link navigates correctly
- [ ] Services link navigates correctly
- [ ] Commissions link navigates correctly
- [ ] Audit link navigates correctly
- [ ] Settings link navigates correctly
- [ ] Active link is highlighted

#### Header Actions
- [ ] Logo/brand displays correctly
- [ ] Notifications icon is clickable
- [ ] User menu dropdown opens
- [ ] Profile link works (when implemented)
- [ ] Logout clears auth state
- [ ] Logout redirects to login

### 6. Dashboard Pages

#### Admin Dashboard (`/dashboard`)
- [ ] Total Sales widget displays
- [ ] Best Agent widget displays
- [ ] Top Customer widget displays
- [ ] Profit widget displays
- [ ] Sales chart renders correctly
- [ ] Recent activity list shows
- [ ] All data is properly formatted

#### Agent Dashboard (`/dashboard`)
- [ ] Balance widget displays
- [ ] Commissions widget displays
- [ ] Licenses Assigned widget displays
- [ ] Licenses Sold widget displays
- [ ] Recent customers list shows

### 7. CRUD Pages

#### Users Page (`/users`)
- [ ] Users table displays
- [ ] Add User button is visible
- [ ] Table columns are correct
- [ ] Status badges show correctly
- [ ] Edit buttons are clickable
- [ ] Delete buttons are clickable
- [ ] Data is properly formatted

#### Agents Page (`/agents`)
- [ ] Agents table displays
- [ ] Add Agent button is visible
- [ ] Balance shows correctly
- [ ] Assign License button works
- [ ] All data is visible

#### Customers Page (`/customers`)
- [ ] Customers table displays
- [ ] Add Customer button is visible
- [ ] Email and phone show correctly
- [ ] Purchase totals display

#### Products Page (`/products`)
- [ ] Products display in grid
- [ ] Add Product button is visible
- [ ] Price, stock, category show
- [ ] Cards are properly styled

#### Sales Page (`/sales`)
- [ ] Sales table displays
- [ ] Create Invoice button is visible
- [ ] Status badges show colors
- [ ] Invoice numbers display
- [ ] Dates are formatted correctly

#### Services Page (`/services`)
- [ ] Service requests table displays
- [ ] New Request button is visible
- [ ] Status badges work correctly
- [ ] Request numbers show

#### Commissions Page (`/commissions`)
- [ ] Commission table displays
- [ ] Rates show correctly
- [ ] Total earned displays

#### Audit Page (`/audit`)
- [ ] Audit log table displays
- [ ] Export button is visible
- [ ] Timestamps show correctly
- [ ] Action details are readable

#### Settings Page (`/settings`)
- [ ] All setting cards display
- [ ] Company info form works
- [ ] Currency input works
- [ ] Notification toggles work
- [ ] Save buttons are clickable

### 8. State Management

#### Authentication State
- [ ] Login updates auth state
- [ ] Logout clears auth state
- [ ] State persists across refreshes
- [ ] Protected routes redirect when not authenticated

#### Theme State
- [ ] Theme changes update state
- [ ] State persists across refreshes
- [ ] Theme applies immediately

#### Language State
- [ ] Language changes update state
- [ ] State persists across refreshes
- [ ] Direction updates correctly

#### Sidebar State
- [ ] Open/close updates state
- [ ] Mobile behavior works
- [ ] Desktop behavior works

### 9. UI Components

#### Buttons
- [ ] Primary buttons style correctly
- [ ] Secondary buttons style correctly
- [ ] Outline buttons style correctly
- [ ] Ghost buttons style correctly
- [ ] Icon buttons work
- [ ] Hover states work
- [ ] Disabled states work

#### Cards
- [ ] Card headers display
- [ ] Card content shows
- [ ] Card footers work
- [ ] Shadows render correctly
- [ ] Borders are visible

#### Tables
- [ ] Headers are bold
- [ ] Rows have hover states
- [ ] Cell alignment is correct
- [ ] Scrolling works on mobile

#### Forms
- [ ] Inputs accept text
- [ ] Labels are associated
- [ ] Validation works (when implemented)
- [ ] Error messages show

#### Dropdowns
- [ ] Menu opens on click
- [ ] Items are selectable
- [ ] Menu closes after selection
- [ ] Positioning is correct

## 🤖 Automated Testing (To Implement)

### Unit Tests with Jest

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Example test for a component:

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Tests with Playwright

```bash
npm install --save-dev @playwright/test
```

Example E2E test:

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('language switching', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  
  await page.click('[title*="العربية"]');
  
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
```

### Component Snapshot Tests

```typescript
// __tests__/components/Card.snapshot.test.tsx
import { render } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

describe('Card Snapshots', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## 🔍 Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Run audit
4. Check scores:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔒 Security Testing

### Authentication
- [ ] Invalid credentials are rejected
- [ ] Token is properly stored
- [ ] Token is sent with API requests
- [ ] Expired tokens redirect to login
- [ ] Logout clears sensitive data

### XSS Protection
- [ ] User inputs are sanitized
- [ ] HTML is properly escaped
- [ ] Scripts cannot be injected

### CSRF Protection
- [ ] API requests include CSRF tokens (when implemented)
- [ ] Forms validate origin

## 📊 Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **E2E Tests**: Critical user flows
- **Component Tests**: All UI components
- **Integration Tests**: API integration points

## 🐛 Bug Reporting Template

```markdown
**Bug Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What should happen.

**Actual Behavior:**
What actually happens.

**Screenshots:**
If applicable.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Screen Size: [e.g., 1920x1080]
- Language: [e.g., Arabic]
- Theme: [e.g., Dark]
```

## ✨ Testing Best Practices

1. **Test Early and Often**: Run tests during development
2. **Write Descriptive Tests**: Clear test names and assertions
3. **Test User Flows**: Focus on real user scenarios
4. **Mock External Dependencies**: Isolate components
5. **Test Edge Cases**: Empty states, errors, loading
6. **Accessibility Testing**: Screen readers, keyboard navigation
7. **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
8. **Mobile Testing**: iOS Safari, Android Chrome

## 📝 Test Execution

### Run Manual Tests
```bash
npm run dev
# Follow manual testing checklist
```

### Run Unit Tests (when implemented)
```bash
npm run test
```

### Run E2E Tests (when implemented)
```bash
npm run test:e2e
```

### Run Coverage (when implemented)
```bash
npm run test:coverage
```

---

**Quality Assurance is Critical!** 🎯
