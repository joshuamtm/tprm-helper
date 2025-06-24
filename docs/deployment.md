# PHI Vendor Recommendation Chatbot - Deployment Guide

## Overview

This guide covers deploying the PHI Vendor Recommendation Chatbot to GitHub Pages. The deployment process is straightforward since the application is built as a static client-side application.

## Prerequisites

- GitHub account
- Git installed locally
- Basic familiarity with Git commands

## Deployment Steps

### 1. Fork or Clone the Repository

```bash
# Clone the repository
git clone https://github.com/joshuamtm/tprm-helper.git
cd tprm-helper

# Or fork it on GitHub and clone your fork
git clone https://github.com/YOUR-USERNAME/tprm-helper.git
cd tprm-helper
```

### 2. Verify File Structure

Ensure these critical files are present:
```
tprm-helper/
├── index.html          # Main chatbot interface
├── chatbot.js          # Chatbot logic
├── vendors.js          # Vendor database
├── style.css           # Styling
├── docs/               # GitHub Pages content
│   ├── index.html      # Documentation homepage
│   ├── _config.yml     # Jekyll configuration
│   └── app.js          # Documentation app logic
└── README.md           # Repository documentation
```

### 3. Configure GitHub Pages

#### Option A: Through GitHub Web Interface

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/docs" folder
6. Click "Save"

#### Option B: Using gh CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Enable GitHub Pages
gh repo set-pages --branch main --path docs
```

### 4. Verify Deployment

After configuration, GitHub Pages will build and deploy your site. This typically takes 2-10 minutes.

1. Check deployment status:
   - Go to Settings → Pages
   - Look for "Your site is published at..."

2. Access your chatbot:
   - Main app: `https://YOUR-USERNAME.github.io/tprm-helper/`
   - Documentation: Same URL (served from /docs)

### 5. Custom Domain (Optional)

To use a custom domain:

1. Create a `CNAME` file in the `/docs` directory:
```bash
echo "your-domain.com" > docs/CNAME
```

2. Configure DNS:
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`
   - Or add A records for GitHub Pages IPs

3. Enable HTTPS in repository settings

## Configuration Options

### Jekyll Configuration

The `docs/_config.yml` file controls GitHub Pages behavior:

```yaml
theme: jekyll-theme-cayman
title: PHI Vendor Recommendation Chatbot
description: Instant vendor security assessments for healthcare
```

### Customizing the Chatbot

1. **Update Vendor Database** (`vendors.js`):
```javascript
const vendors = {
  "vendor-name": {
    risk_score: 25,
    compliance: ["HIPAA", "SOC2"],
    known_issues: [],
    recommendations: "Approved with BAA"
  }
};
```

2. **Modify Chatbot Responses** (`chatbot.js`):
```javascript
// Customize response templates
const responses = {
  approved: "✅ {vendor} is APPROVED for PHI handling",
  rejected: "❌ {vendor} does not meet security requirements"
};
```

3. **Adjust Styling** (`style.css`):
```css
/* Customize chatbot appearance */
.chat-container {
  max-width: 800px;
  height: 600px;
}
```

## Updating the Deployment

### Manual Updates

```bash
# Make your changes
git add .
git commit -m "Update chatbot logic"
git push origin main

# GitHub Pages auto-deploys from main branch
```

### Automated Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs
```

## Testing Deployment

### Local Testing

```bash
# Simple HTTP server
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Access at http://localhost:8000
```

### Production Testing Checklist

- [ ] Chatbot loads without errors
- [ ] Vendor queries return appropriate responses
- [ ] Styling displays correctly
- [ ] No console errors in browser
- [ ] HTTPS is enabled
- [ ] Mobile responsive design works

## Troubleshooting

### Common Issues

1. **404 Error**
   - Check GitHub Pages is enabled
   - Verify branch and folder settings
   - Ensure index.html exists in /docs

2. **Chatbot Not Responding**
   - Check browser console for errors
   - Verify chatbot.js and vendors.js are loaded
   - Clear browser cache

3. **Slow Loading**
   - GitHub Pages CDN may take time to propagate
   - Try clearing browser cache
   - Check from different location/device

4. **CORS Errors**
   - Ensure all resources are served from same domain
   - Don't make external API calls
   - Keep everything client-side

### Debug Mode

Add to chatbot.js for debugging:
```javascript
const DEBUG = true;

function log(message) {
  if (DEBUG) console.log(`[Chatbot] ${message}`);
}
```

## Monitoring

### GitHub Pages Status

- Check: https://www.githubstatus.com/
- Look for "GitHub Pages" component

### Analytics (Optional)

Add privacy-respecting analytics:
```html
<!-- In index.html -->
<script data-goatcounter="https://YOURACCOUNT.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

## Security Considerations

1. **No Secrets**: Never commit API keys or sensitive data
2. **Client-Side Only**: Keep all processing in the browser
3. **HTTPS**: Always use HTTPS in production
4. **Content Security Policy**: Add CSP headers via meta tags

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

## Maintenance

### Regular Updates

1. Review vendor database monthly
2. Update security assessments quarterly
3. Check for new HIPAA requirements
4. Monitor user feedback

### Backup Strategy

```bash
# Regular backups
git tag -a v1.0.0 -m "Stable release"
git push origin v1.0.0
```

## Support

For deployment issues:
1. Check GitHub Pages documentation
2. Review repository settings
3. Open an issue in the repository
4. Check GitHub community forums