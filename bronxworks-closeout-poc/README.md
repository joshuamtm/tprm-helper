# BronxWorks Program Closeout Assistant

A conversational, AI-powered web application designed to streamline the program closeout process for BronxWorks personnel. This innovative tool uses a chat-based interface to guide users through a natural conversation, making the complex closeout process feel simple and intuitive.

💬 **Now featuring a conversational chat interface inspired by modern AI assistants**
🎨 **Official BronxWorks branding with teal and pink color palette**

🔗 **Live Application**: https://joshuamtm.github.io/bronxworks-closeout-poc/

## ✨ Key Features

### 💬 **Conversational Interface**
- **Chat-Based Experience**: Natural conversation flow similar to modern AI assistants
- **Friendly Bot Guide**: Personalized assistant that walks you through each step
- **Real-Time Interaction**: Immediate responses with typing indicators and smooth message flow
- **Smart Validation**: Contextual error messages and helpful guidance in conversation
- **Message History**: Complete conversation log with timestamps

### 🎯 **Enhanced User Experience**
- **Natural Language Processing**: Type responses in your own words - no rigid forms
- **Guided Conversation**: Bot asks questions one at a time, preventing overwhelm
- **Professional BronxWorks Branding**: Official teal (#2bc4b2) and pink (#f7215e) throughout
- **Visual Chat Elements**: Message bubbles, avatars, and typing indicators

### 📋 **Comprehensive Data Collection**
- **Program Information**: Name, type, staff count, dates, and detailed location information
- **Contact Management**: Primary and alternate contacts with complete coordination details
- **IT Equipment Inventory**: Detailed cataloging with asset tracking and special instructions
- **Furniture Documentation**: Complete inventory with condition assessment and disposition planning
- **Microsoft 365 Accounts**: User account management with data backup requirements
- **Timeline Coordination**: Key dates and logistics planning with access restrictions

### 📄 **Professional Reporting**
- **Branded PDF Reports**: 3-page comprehensive reports with BronxWorks visual identity
- **Structured Information**: Organized sections for easy IT and Operations review
- **Professional Formatting**: Clean, readable layout with branded headers and colors
- **Automatic Naming**: Files named with program name and generation date

### 💾 **Smart Data Management**
- **Auto-save Functionality**: Automatically saves progress every 30 seconds
- **Manual Save Option**: "Save Draft" button for immediate data persistence
- **Local Storage**: Progress saved locally to prevent data loss
- **Form Validation**: Real-time validation with helpful error messages

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/joshuamtm/bronxworks-closeout-poc.git
cd bronxworks-closeout-poc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Enable GitHub Pages** in your repository:
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the source

2. **Push to main branch** - the deployment will happen automatically via GitHub Actions

3. **Access your deployed app** at: https://joshuamtm.github.io/bronxworks-closeout-poc/

#### Manual Deployment:

If you prefer manual deployment, you can use the deploy script:

```bash
npm run deploy
```

Then commit and push the built files to the `gh-pages` branch.

## 💬 Usage Guide

### Getting Started
1. **Start Conversation**: Simply visit the app and the bot will greet you
2. **Type 'yes' or 'start'**: Begin the conversation naturally
3. **Follow the Chat**: Answer questions one at a time in your own words

### During the Conversation
4. **Natural Responses**: Type answers naturally - "5 people", "John Smith", "15 computers", etc.
5. **Real-Time Guidance**: Bot provides immediate feedback and helps with formatting
6. **Typing Indicators**: See when the bot is preparing the next question
7. **Message History**: Scroll up to review previous questions and answers
8. **Start Over**: Use "Start Over" button to restart the conversation anytime

### Conversation Flow
- **Welcome & Introduction** → **Program Details** → **Timeline** → **Location**
- **Contact Information** → **Equipment Inventory** → **Furniture Inventory**
- **M365 Accounts** → **Final Details** → **Review Summary** → **Generate PDF**

### What to Expect
- **Duration**: 15-20 minute natural conversation
- **Tone**: Friendly, helpful, and professional
- **Validation**: Real-time help with date formats, email addresses, etc.
- **Output**: Professional PDF report with all collected information

## 🛠 Technology Stack

### Frontend Framework
- **React 18** with TypeScript for type safety and modern development
- **Vite** for lightning-fast development and optimized builds
- **Conversational State Management** with React hooks for chat flow
- **Real-time Message Handling** with smooth animations and interactions

### Styling & Design
- **Tailwind CSS** with custom BronxWorks brand color extensions
- **Chat Interface Design** with message bubbles and avatars
- **Responsive Design** optimized for desktop and tablet devices
- **Lucide React** for bot/user icons and chat interface elements

### PDF Generation & Utilities
- **@react-pdf/renderer** for professional PDF report generation
- **date-fns** for robust date formatting and manipulation
- **Local Storage API** for automatic draft persistence

### Development & Deployment
- **ESLint** for code quality and consistency
- **GitHub Actions** for automated CI/CD
- **GitHub Pages** for reliable hosting and deployment

## Project Structure

```
src/
├── components/
│   ├── CloseoutForm.tsx        # Main form wizard component
│   ├── CloseoutPDF.tsx         # PDF generation component
│   └── FormSteps/              # Individual form step components
│       ├── ProgramInfoStep.tsx
│       ├── ContactInfoStep.tsx
│       ├── EquipmentStep.tsx
│       ├── FurnitureStep.tsx
│       ├── M365AccountsStep.tsx
│       └── TimelineStep.tsx
├── types/
│   └── closeout.ts             # TypeScript interfaces
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles

```

## Documentation

- **[User Guide](docs/USER_GUIDE.md)** - Comprehensive guide for end users
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Instructions for deploying the application
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project
- **[Changelog](CHANGELOG.md)** - Version history and changes

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Development setup
- Code style guidelines
- Pull request process
- Issue reporting

For bug reports and feature requests, please use our [GitHub Issues](https://github.com/joshuamtm/bronxworks-closeout-poc/issues).

## 🗺 Roadmap

### Immediate Enhancements (v3.1)
- **Enhanced AI Capabilities**: More natural language understanding
- **Voice Interface**: Speech-to-text and text-to-speech options
- **Mobile App**: Native iOS and Android conversational experience
- **Multi-language Support**: Spanish conversation interface

### Short-term Goals (v2.5)
- Backend API integration for centralized data management
- User authentication and role-based access control
- Admin dashboard for managing multiple closeouts
- Email notification system for automated workflows

### Long-term Vision (v3.0)
- Integration with existing BronxWorks systems (HRIS, Asset Management)
- Mobile application for iOS and Android
- Advanced reporting and analytics dashboard
- Workflow automation and approval processes
- Multi-language support
- Real-time collaboration features

## 📞 Support & Resources

### Documentation
- **[📖 User Guide](docs/USER_GUIDE.md)** - Comprehensive step-by-step usage instructions
- **[🚀 Deployment Guide](docs/DEPLOYMENT.md)** - Complete deployment and hosting instructions
- **[🤝 Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project
- **[📋 Changelog](CHANGELOG.md)** - Version history and feature updates

### Getting Help
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/joshuamtm/bronxworks-closeout-poc/issues) - Report technical problems
- **💡 Feature Requests**: [GitHub Issues](https://github.com/joshuamtm/bronxworks-closeout-poc/issues) - Suggest new features
- **❓ Questions**: Check documentation first, then open an issue for clarification
- **🔧 Technical Support**: Contact IT Operations team for BronxWorks-specific assistance

### Contact Information
- **IT Operations**: it-ops@bronxworks.org | (718) 588-1030 ext. 123
- **Project Repository**: https://github.com/joshuamtm/bronxworks-closeout-poc
- **Live Application**: https://joshuamtm.github.io/bronxworks-closeout-poc/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.