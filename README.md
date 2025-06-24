# PHI Vendor Recommendation Assistant

A smart, client-side chatbot designed to help healthcare organizations find the right vendors, software, and hardware solutions for their PHI (Protected Health Information) programs. This tool provides intelligent recommendations based on your specific needs while maintaining complete privacy.

## 🌟 Features

- **Guided Conversation Flow**: Step-by-step questions for personalized recommendations
- **6 Solution Categories**: Project Management, Data Analysis, Communication, Business Intelligence, Hardware, and Security
- **PDF Report Generation**: Download professional vendor recommendations
- **Contextual Help System**: Get assistance at any step in the conversation
- **Privacy-First Design**: All processing happens in your browser - no data sent to servers
- **Mobile Responsive**: Works seamlessly on all devices
- **Accessibility Compliant**: Screen reader friendly with ARIA labels
- **Session Persistence**: Conversation history saved locally
- **Smart Filtering**: Recommendations based on team size, budget, and requirements

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Visit the live demo: [PHI Vendor Assistant](https://joshuamtm.github.io/phi-helper/)
2. Start chatting immediately - no setup required!

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/joshuamtm/phi-helper.git

# Navigate to the project
cd phi-helper

# Open in your browser
open index.html
```

## 💬 How to Use

### New Enhanced Experience!
1. **Welcome Introduction**: Learn how the assistant works and what to expect
2. **Choose Your Category**: Tell the assistant what type of solution you need
3. **Answer Simple Questions**: The assistant asks one question at a time:
   - How many people will use this?
   - What's your budget range?
   - Any special requirements?
4. **Get Personalized Recommendations**: Receive 3-4 tailored vendor suggestions
5. **Download PDF Report**: Save a professional report with all details

### Getting Help
- Type "help" at any step for guidance
- Use quick action buttons for common requests
- Ask questions in your own words - no special format needed

### Example Interactions
- **You**: "Project management tools"
- **Assistant**: "Great! I'll help you find project management solutions. How many people will be using this solution?"
- **You**: "15 people"
- **Assistant**: "Perfect! So this is for 15 people. What's your approximate monthly budget?"

## 🏗️ Architecture

### Client-Side Only
- **Zero Backend**: Pure HTML, CSS, and JavaScript
- **No API Calls**: All data processing happens locally
- **Privacy Focused**: No user data leaves your device

### File Structure
```
phi-helper/
├── index.html          # Main chatbot interface
├── style.css           # Responsive styling
├── chatbot.js          # Enhanced conversation logic with PDF generation
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
Update the `categories` array in the `handleInitialMessage` function in `chatbot.js` to add new solution types.

### Customizing Conversation Flow
Modify the conversation steps in `chatbot.js`:
- `handleTeamSizeQuestion()` - Team size collection
- `handleBudgetQuestion()` - Budget information
- `handleSpecialRequirements()` - Additional requirements
- `generateHelpResponse()` - Context-sensitive help

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
- **PDF Generation**: Happens locally in browser - no server upload
- **No External APIs**: All processing done client-side

## 🚀 Deployment

### GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/" root
5. Your chatbot will be live at `https://username.github.io/phi-helper/`

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
- 🐛 [Report Issues](https://github.com/joshuamtm/phi-helper/issues)
- 💡 [Feature Requests](https://github.com/joshuamtm/phi-helper/issues)

## 📊 Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

**Made with ❤️ for healthcare organizations seeking the right technology solutions.**