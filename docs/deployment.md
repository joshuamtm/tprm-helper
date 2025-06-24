# Deployment Guide

This guide covers how to deploy the PHI Vendor Recommendation Assistant to various hosting platforms.

## GitHub Pages (Recommended)

GitHub Pages is the easiest and most cost-effective way to deploy this chatbot.

### Quick Setup

1. **Fork the Repository**
   ```bash
   # Go to GitHub and fork the repository
   # Or clone if you have write access
   git clone https://github.com/your-username/phi-request-helper.git
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Site**
   - Your site will be available at: `https://your-username.github.io/phi-request-helper/`
   - It may take a few minutes to become available

### Custom Domain (Optional)

To use your own domain:

1. **Add CNAME File**
   ```bash
   echo "your-domain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS**
   - Add a CNAME record pointing to `your-username.github.io`
   - Or use A records pointing to GitHub Pages IPs

3. **Enable HTTPS**
   - GitHub Pages automatically provides SSL certificates
   - Ensure "Enforce HTTPS" is checked in repository settings

## Alternative Hosting Options

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: (leave empty - no build needed)
   - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Custom Domain**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Netlify handles SSL automatically

### Vercel

1. **Deploy from GitHub**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - No build configuration needed

2. **Environment**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Project**
   ```bash
   firebase init hosting
   # Select your project
   # Public directory: . (current directory)
   # Single-page app: No
   # Overwrite index.html: No
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Traditional Web Hosting

For shared hosting providers:

1. **Upload Files**
   - Upload all files to your web hosting directory
   - Ensure `index.html` is in the root directory

2. **No Server Configuration Needed**
   - This is a static site - no server-side code
   - Works with any web server (Apache, Nginx, IIS)

## Configuration

### Basic Configuration

No configuration is required for basic deployment. The chatbot works out of the box.

### Customization Options

**Update Vendor Data:**
- Edit `vendors.js` to add/modify vendor information
- No rebuild required - changes are immediate

**Styling Changes:**
- Modify `style.css` for visual customizations
- Update CSS variables for theme changes

**Functionality Updates:**
- Edit `chatbot.js` for conversation logic changes
- Update `index.html` for structural changes

## Environment-Specific Settings

### Production Optimizations

1. **Minification (Optional)**
   ```bash
   # Install terser for JS minification
   npm install -g terser
   
   # Minify JavaScript files
   terser chatbot.js -o chatbot.min.js
   terser vendors.js -o vendors.min.js
   
   # Update script tags in index.html
   ```

2. **Image Optimization**
   - Use compressed images if adding any
   - Consider WebP format for better compression

3. **Caching Headers**
   ```apache
   # .htaccess for Apache servers
   <IfModule mod_expires.c>
     ExpiresActive on
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType text/html "access plus 1 hour"
   </IfModule>
   ```

### Development Environment

For local development:

1. **Local Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

2. **Live Reload (Optional)**
   ```bash
   # Install live-server
   npm install -g live-server
   
   # Start with live reload
   live-server
   ```

## Security Considerations

### HTTPS Configuration

Always serve over HTTPS in production:

**GitHub Pages:** Automatic HTTPS
**Netlify:** Automatic SSL certificates
**Custom Hosting:** Configure SSL certificates

### Content Security Policy

Add CSP headers for enhanced security:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### Security Headers

For custom hosting, add security headers:

```apache
# .htaccess
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy strict-origin-when-cross-origin
```

## Monitoring and Analytics

### GitHub Pages Monitoring

- Monitor via GitHub repository insights
- Check Actions tab for deployment status
- Use GitHub's built-in traffic analytics

### Google Analytics (Optional)

Add to `index.html` before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting Deployment

### Common Issues

**404 Not Found:**
- Ensure `index.html` is in the root directory
- Check that all file names match exactly (case-sensitive)
- Verify hosting platform configuration

**JavaScript Not Loading:**
- Check browser console for errors
- Ensure file paths are correct
- Verify files are uploaded properly

**Styling Issues:**
- Check CSS file is loading
- Verify path to `style.css` is correct
- Clear browser cache

**GitHub Pages Not Updating:**
- Check Actions tab for build status
- Ensure latest commits are pushed
- Wait a few minutes for propagation

### Debug Steps

1. **Check Browser Console**
   - Open developer tools (F12)
   - Look for JavaScript errors
   - Check network tab for failed requests

2. **Verify File Structure**
   ```
   phi-request-helper/
   ├── index.html
   ├── style.css
   ├── chatbot.js
   ├── vendors.js
   └── docs/
   ```

3. **Test Locally**
   - Run local server
   - Verify everything works locally
   - Compare with deployed version

## Maintenance

### Regular Updates

- Update vendor information as needed
- Monitor for security issues
- Keep documentation current
- Test on new browser versions

### Backup Strategy

- Repository serves as backup
- Consider additional backups for customizations
- Document any manual configuration changes

---

Need help with deployment? [Open an issue](https://github.com/your-username/phi-request-helper/issues) on GitHub.