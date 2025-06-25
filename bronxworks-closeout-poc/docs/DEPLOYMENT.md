# 🚀 Deployment Guide

This document provides comprehensive instructions for deploying the enhanced BronxWorks Program Closeout Assistant with official branding and improved user experience.

🌐 **Live Application**: https://joshuamtm.github.io/bronxworks-closeout-poc/

## Table of Contents
1. [GitHub Pages Deployment](#github-pages-deployment)
2. [Manual Deployment](#manual-deployment)
3. [Environment Configuration](#environment-configuration)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Troubleshooting](#troubleshooting)

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

The project is configured for automatic deployment using GitHub Actions.

#### Initial Setup

1. **Repository Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/joshuamtm/bronxworks-closeout-poc.git
   cd bronxworks-closeout-poc
   
   # Install dependencies
   npm install
   ```

2. **Enable GitHub Pages**
   - Go to repository **Settings → Pages**
   - Under "Source", select **"GitHub Actions"**
   - The workflow will automatically deploy on the next push to `main`

3. **Access Your Site**
   - **Live URL**: https://joshuamtm.github.io/bronxworks-closeout-poc/
   - **Deployment Time**: Typically takes 2-5 minutes
   - **Features**: Full BronxWorks branding with enhanced UX

#### 🛠 Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) automatically:
- **Triggers**: On push to `main` branch or manual workflow dispatch
- **Build Environment**: Node.js 20 with npm caching for efficiency
- **Build Process**: TypeScript compilation + Vite production build
- **Assets**: Deploys optimized bundle with BronxWorks branding
- **Deployment**: Automatic deployment to GitHub Pages environment
- **Monitoring**: Action logs available in repository Actions tab

#### Making Updates
```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
# Site automatically rebuilds and deploys
```

### Manual GitHub Pages Deployment

If you prefer manual control over deployments:

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy Using gh-pages Package**
   ```bash
   # Install gh-pages if not already installed
   npm install -g gh-pages
   
   # Deploy to gh-pages branch
   gh-pages -d dist
   ```

## Manual Deployment

### Static Web Server

For deployment to any static web server:

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Upload dist/ Contents**
   - Upload contents of `dist/` folder to your web server
   - Ensure `index.html` is in the root directory
   - Configure server to serve single-page application

### Apache Configuration

Add to `.htaccess` in the web root:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx Configuration

Add to your site configuration:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM nginx:alpine
   COPY dist/ /usr/share/nginx/html/
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and Run**
   ```bash
   # Build the application
   npm run build
   
   # Build Docker image
   docker build -t bronxworks-closeout .
   
   # Run container
   docker run -p 80:80 bronxworks-closeout
   ```

## Environment Configuration

### 📍 Base URL Configuration

The application is pre-configured for GitHub Pages deployment:

```typescript
// vite.config.ts - Current configuration
export default defineConfig({
  plugins: [react()],
  base: '/bronxworks-closeout-poc/', // GitHub Pages subdirectory
})
```

For different deployment environments:
```typescript
// For subdirectory deployment
base: '/your-subdirectory/'

// For root domain deployment
base: '/'

// For custom domain
base: '/'
```

### 🌍 Environment Variables

The application includes default branding configurations:

```bash
# .env (optional for customization)
VITE_APP_TITLE="BronxWorks Program Closeout Assistant"
VITE_BRAND_PRIMARY_COLOR="#2bc4b2"  # BronxWorks Teal
VITE_BRAND_SECONDARY_COLOR="#f7215e"  # BronxWorks Pink
VITE_SUPPORT_EMAIL="it-ops@bronxworks.org"
VITE_SUPPORT_PHONE="(718) 588-1030 ext. 123"
```

Access in TypeScript:
```typescript
const appTitle = import.meta.env.VITE_APP_TITLE;
const brandTeal = import.meta.env.VITE_BRAND_PRIMARY_COLOR;
```

## Custom Domain Setup

### GitHub Pages Custom Domain

1. **Add Domain File**
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **Configure DNS**
   - Add CNAME record pointing to `username.github.io`
   - Or A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update Vite Config**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/', // Remove subdirectory for custom domain
   })
   ```

## Security Considerations

### HTTPS Configuration
- GitHub Pages automatically provides HTTPS
- For custom deployments, ensure SSL certificates are configured
- Redirect HTTP to HTTPS

### Content Security Policy
Add to your HTML head or server configuration:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

## Performance Optimization

### 📊 Build Optimization

```bash
# Standard production build
npm run build

# Analyze bundle size (requires additional setup)
npm run build -- --analyze

# Preview production build locally
npm run preview

# Lint code before deployment
npm run lint
```

**Current Build Metrics** (v2.0.0):
- **Bundle Size**: ~1.8MB (includes PDF generation library)
- **Gzipped**: ~588KB
- **Load Time**: <3 seconds on standard connections
- **Optimization**: Tree-shaking enabled, code splitting implemented

### Caching Strategy
Configure server headers:
```
# Cache static assets for 1 year
Cache-Control: max-age=31536000, immutable

# Don't cache HTML files
Cache-Control: no-cache
```

## Monitoring and Analytics

### GitHub Pages Analytics
- Enable in repository settings
- Monitor deployment status in Actions tab
- Check Pages settings for deployment URLs

### Error Tracking
Add error tracking service (e.g., Sentry):
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
});
```

## Troubleshooting

### Common Deployment Issues

**"404 Page Not Found"**
- Check base URL configuration in `vite.config.ts`
- Ensure GitHub Pages is enabled with correct source
- Verify all paths are relative or absolute correctly

**"Build Fails"**
- Check for TypeScript errors: `npm run build`
- Ensure all dependencies are installed: `npm install`
- Check Node.js version compatibility

**"Site Not Updating or Missing New Branding"**
- **Clear Browser Cache**: Force refresh (Ctrl+F5 or Cmd+Shift+R)
- **Check GitHub Actions**: Verify deployment completed successfully
- **Verify Branch**: Ensure push was made to `main` branch
- **BronxWorks Styling**: New teal/pink branding should be visible immediately

**"Blank Page or Styling Issues After Deployment"**
- **Check Browser Console**: Look for JavaScript or CSS loading errors
- **Verify Base URL**: Ensure `vite.config.ts` has correct base path
- **Browser Compatibility**: Verify browser supports modern CSS features
- **BronxWorks Assets**: Check if custom brand colors are loading properly
- **Local Testing**: Run `npm run preview` to test production build locally

### GitHub Actions Debugging

1. **Check Workflow Status**
   - Go to repository → Actions tab
   - Click on failed deployment for logs

2. **Common Fixes**
   ```yaml
   # Update Node.js version in workflow
   - name: Setup Node
     uses: actions/setup-node@v4
     with:
       node-version: 20  # Update if needed
   ```

3. **Force Redeploy**
   ```bash
   # Trigger workflow manually
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

## Backup and Recovery

### Backup Strategy
- Repository code is backed up on GitHub
- Download releases for specific versions
- Export issues and wiki content regularly

### Recovery Process
1. Clone repository to new location
2. Install dependencies: `npm install`
3. Build and deploy: `npm run build`
4. Configure hosting environment

---

For additional support, consult the repository issues or contact the development team.