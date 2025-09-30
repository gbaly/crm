# Deployment Guide

Complete guide for deploying the CRM Frontend to various hosting platforms.

## 🚀 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Build completes without errors: `npm run build`
- [ ] Environment variables configured
- [ ] API endpoints configured
- [ ] Performance optimization completed
- [ ] Security review completed
- [ ] Documentation up to date

## 🌐 Vercel Deployment (Recommended)

### Why Vercel?
- Built by Next.js creators
- Zero configuration
- Automatic deployments
- Edge network CDN
- Free SSL certificates
- Preview deployments

### Steps:

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd crm-frontend
vercel
```

4. **Production Deployment**
```bash
vercel --prod
```

### Environment Variables on Vercel:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_APP_NAME`
   - `NEXT_PUBLIC_APP_URL`

### GitHub Integration:
1. Push code to GitHub
2. Import project in Vercel
3. Configure settings
4. Deploy automatically on push

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  crm-frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://api:8000/api
      - NEXT_PUBLIC_APP_NAME=CRM System
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    depends_on:
      - api
    restart: unless-stopped

  api:
    image: your-backend-api:latest
    ports:
      - "8000:8000"
    restart: unless-stopped
```

### Build & Run:
```bash
docker build -t crm-frontend .
docker run -p 3000:3000 crm-frontend
```

### With Docker Compose:
```bash
docker-compose up -d
```

## ☁️ AWS Deployment

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Click "New App" → "Host web app"
   - Connect your GitHub repository

2. **Configure Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables**
   - Add in Amplify Console under "Environment variables"

4. **Deploy**
   - Automatic deployment on push to main branch

### AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier) or larger

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm nginx
```

3. **Clone & Build**
```bash
git clone <your-repo>
cd crm-frontend
npm install
npm run build
npm start
```

4. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Setup PM2 for Process Management**
```bash
npm install -g pm2
pm2 start npm --name "crm-frontend" -- start
pm2 startup
pm2 save
```

## 🌊 DigitalOcean App Platform

1. **Create New App**
   - Connect GitHub repository
   - Select branch

2. **Configure Settings**
   - Build Command: `npm run build`
   - Run Command: `npm start`

3. **Environment Variables**
   - Add in App Settings

4. **Deploy**
   - Automatic deployment on push

## 🚂 Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Login & Initialize**
```bash
railway login
railway init
```

3. **Deploy**
```bash
railway up
```

4. **Add Environment Variables**
```bash
railway variables set NEXT_PUBLIC_API_URL=<value>
```

### Railway.toml
```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

## 🌐 Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 🔧 Environment Variables

### Required Variables:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_NAME=CRM System
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Platform-Specific Setup:

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Build & Deploy → Environment

**Railway:**
- `railway variables set KEY=VALUE`

**AWS Amplify:**
- App Settings → Environment Variables

**DigitalOcean:**
- App → Settings → Environment Variables

## 🔒 Security Considerations

### Before Deployment:

1. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific env var storage
   - Rotate secrets regularly

2. **API Security**
   - Use HTTPS only
   - Configure CORS properly
   - Implement rate limiting

3. **Headers**
```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

4. **Content Security Policy**
```javascript
// Add to headers
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
}
```

## 📊 Performance Optimization

### Before Deployment:

1. **Image Optimization**
```bash
# Use Next.js Image component
import Image from 'next/image'
```

2. **Bundle Analysis**
```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

3. **Enable Compression**
```javascript
// next.config.ts
const nextConfig = {
  compress: true,
}
```

## 🔍 Monitoring & Analytics

### Setup Monitoring:

1. **Vercel Analytics**
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

2. **Error Tracking (Sentry)**
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## 🌍 Custom Domain Setup

### Vercel:
1. Project Settings → Domains
2. Add domain
3. Configure DNS records

### Netlify:
1. Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

### Railway:
1. Project Settings → Domains
2. Add custom domain
3. Update DNS records

### DNS Records:
```
A Record:
Host: @
Value: [Platform IP]

CNAME Record:
Host: www
Value: [Platform domain]
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Check language switching (Arabic/English)
- [ ] Verify theme switching (Dark/Light)
- [ ] Test responsive design on mobile
- [ ] Check API connectivity
- [ ] Verify environment variables
- [ ] Test forms and CRUD operations
- [ ] Check console for errors
- [ ] Run Lighthouse audit
- [ ] Test on different browsers
- [ ] Monitor error logs
- [ ] Setup analytics
- [ ] Configure CDN caching
- [ ] Test SSL certificate
- [ ] Setup backup strategy

## 🚨 Rollback Procedure

### Vercel:
```bash
vercel rollback [deployment-url]
```

### Railway:
- Go to Deployments
- Select previous deployment
- Click "Redeploy"

### Docker:
```bash
docker pull crm-frontend:previous-tag
docker run -p 3000:3000 crm-frontend:previous-tag
```

### Git:
```bash
git revert HEAD
git push origin main
```

## 📊 Performance Benchmarks

### Target Metrics:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Tips:
1. Enable static generation where possible
2. Use dynamic imports for heavy components
3. Optimize images with Next.js Image
4. Enable CDN caching
5. Minimize JavaScript bundles
6. Use server components when possible

## 🎯 Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Railway
railway up

# Docker
docker build -t crm-frontend . && docker run -p 3000:3000 crm-frontend

# AWS Amplify
amplify publish
```

---

**Choose your platform and deploy! 🚀**
