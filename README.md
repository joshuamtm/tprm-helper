# PHI Vendor Recommendation Assistant

A smart, client-side chatbot designed to help healthcare organizations find the right vendors, software, and hardware solutions for their PHI (Protected Health Information) programs. This tool provides intelligent recommendations based on your specific needs while maintaining complete privacy.

## 🌟 Features

- **Intelligent Vendor Matching**: AI-powered recommendations based on your specific requirements
- **6 Solution Categories**: Project Management, Data Analysis, Communication, Business Intelligence, Hardware, and Security
- **Privacy-First Design**: All processing happens in your browser - no data sent to servers
- **Mobile Responsive**: Works seamlessly on all devices
- **Accessibility Compliant**: Screen reader friendly with ARIA labels
- **Session Persistence**: Conversation history saved locally
- **Real-time Filtering**: Smart recommendations based on team size and budget

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Visit the live demo: [PHI Vendor Assistant](https://your-username.github.io/phi-request-helper/)
2. Start chatting immediately - no setup required!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/phi-request-helper.git

# Navigate to the project
cd phi-request-helper

# Open in your browser
open index.html
```

## 💬 How to Use

1. **Start a Conversation**: Type your question or click a quick action button
2. **Get Recommendations**: The assistant will ask clarifying questions and provide tailored vendor suggestions
3. **Explore Options**: Each recommendation includes pricing, features, and integration details
4. **Refine Results**: Ask follow-up questions to narrow down your options

### Example Queries
- "I need project management tools for a team of 15"
- "What data analysis software works with Google Workspace?"
- "Looking for secure communication platforms"
- "Need CRM solutions under $500/month"

## 🏗️ Architecture

### Client-Side Only
- **Zero Backend**: Pure HTML, CSS, and JavaScript
- **No API Calls**: All data processing happens locally
- **Privacy Focused**: No user data leaves your device

### File Structure
```
phi-request-helper/
├── index.html          # Main chatbot interface
├── style.css           # Responsive styling
├── chatbot.js          # Core chatbot logic
├── vendors.js          # Vendor knowledge base
├── docs/               # Documentation
└── README.md           # This file
```

## 🔧 Customization

### Adding New Vendors
Edit `vendors.js` and add to the appropriate category:

```javascript
{
    name: "New Vendor",
    status: "approved|supported|not-approved",
    description: "Brief description",
    features: ["Feature 1", "Feature 2"],
    nonprofitPricing: "Pricing details",
    bestFor: "Use case description",
    integrations: ["Integration 1", "Integration 2"]
}
```

### Modifying Categories
Update the `categories` array in `chatbot.js` to add new solution types.

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🔒 Security & Privacy

- **No Data Collection**: All conversations stay on your device
- **XSS Protection**: All user inputs are sanitized
- **Session Storage**: Data cleared when browser closes
- **HTTPS Ready**: Secure deployment on GitHub Pages

## 🚀 Deployment

### GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/" root
5. Your chatbot will be live at `https://username.github.io/phi-request-helper/`

### Custom Domain
Add a `CNAME` file with your domain name for custom hosting.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Ideas
- Add new vendors to the knowledge base
- Improve conversation logic
- Enhance mobile experience
- Add new solution categories
- Improve accessibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📚 [Documentation](docs/)
- 🐛 [Report Issues](https://github.com/your-username/phi-request-helper/issues)
- 💡 [Feature Requests](https://github.com/your-username/phi-request-helper/issues)

## 📊 Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

**Made with ❤️ for healthcare organizations seeking the right technology solutions.**