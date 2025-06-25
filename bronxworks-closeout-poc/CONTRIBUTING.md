# 🤝 Contributing to BronxWorks Program Closeout Assistant

Thank you for your interest in contributing to the enhanced BronxWorks Program Closeout Assistant! This document provides guidelines for contributing to this professionally branded, user-experience focused project.

🌐 **Live Application**: https://joshuamtm.github.io/bronxworks-closeout-poc/

## Development Setup

### 💻 Prerequisites
- **Node.js 18+** (20+ recommended for optimal performance)
- **npm** (yarn also supported)
- **Git** for version control
- **Modern Browser** for testing (Chrome 90+, Firefox 88+, Safari 14+)
- **Code Editor** with TypeScript support (VS Code recommended)

### Getting Started
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bronxworks-closeout-poc.git
   cd bronxworks-closeout-poc
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming
- `feature/feature-name` for new features
- `fix/bug-description` for bug fixes
- `docs/documentation-update` for documentation changes

### Commit Messages
Follow conventional commit format:
- `feat: add new feature`
- `fix: resolve bug issue`
- `docs: update documentation`
- `style: formatting changes`
- `refactor: code refactoring`
- `test: add or update tests`

### 🎨 Code Style & Branding Guidelines
- **TypeScript First**: Use TypeScript for all new code with proper type definitions
- **BronxWorks Branding**: Maintain consistent use of brand colors (teal #2bc4b2, pink #f7215e)
- **Tailwind Classes**: Use custom `bronx-teal` and `bronx-pink` color classes
- **Component Consistency**: Follow established patterns for form styling and validation
- **Code Quality**: ESLint configuration enforced, follow existing formatting
- **Meaningful Names**: Use descriptive variable and function names
- **Documentation**: Comment complex logic, especially UI/UX enhancements

### 📝 Testing Requirements
- **Build Validation**: Run `npm run build` successfully before submitting
- **Lint Check**: Ensure `npm run lint` passes without errors
- **Cross-Browser Testing**: Test in Chrome, Firefox, Safari, and Edge
- **Responsive Design**: Verify functionality on desktop and tablet viewports
- **Form Validation**: Test all form steps with both valid and invalid data
- **PDF Generation**: Verify branded PDF reports generate correctly
- **Brand Consistency**: Ensure BronxWorks colors and styling are maintained
- **Auto-save Functionality**: Test draft saving and restoration
- **Accessibility**: Basic keyboard navigation and screen reader compatibility

## Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Test Thoroughly**: Ensure all functionality works
3. **Clean Commits**: Squash commits if necessary
4. **Descriptive Title**: Use clear, descriptive PR titles
5. **Detailed Description**: Explain what changes were made and why

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] PDF generation works
- [ ] Form validation works
- [ ] Responsive design tested

## Screenshots (if applicable)
Add screenshots of UI changes
```

## 💡 Feature Requests

When suggesting new features:
1. **Check Existing Issues**: Review current issues and roadmap first
2. **Use Case Description**: Provide clear, specific use case scenarios
3. **Business Value**: Explain benefits for BronxWorks operations
4. **Implementation Scope**: Consider complexity and resource requirements
5. **Brand Alignment**: Ensure suggestions align with BronxWorks professional image
6. **User Experience**: Focus on improvements that enhance the guided process

## Bug Reports

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots if applicable

## Code Review Guidelines

- Be constructive and respectful
- Focus on the code, not the person
- Suggest improvements with examples
- Approve when ready for merge

## Architecture Guidelines

### File Organization
```
src/
├── components/          # React components
│   ├── FormSteps/      # Individual form step components
│   └── ...
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

### 🧩 Component Guidelines
- **Functional Components**: Use hooks-based functional components exclusively
- **Single Responsibility**: Keep components focused and single-purpose
- **TypeScript Interfaces**: Define proper interfaces for all props and state
- **Brand Consistency**: Apply BronxWorks styling patterns consistently
- **Form Integration**: Follow react-hook-form patterns for form components
- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Error Handling**: Implement branded error states with helpful messaging

### 💾 State Management & Data Flow
- **Form State**: React Hook Form for all form data and validation
- **Local Persistence**: Browser localStorage for draft auto-save functionality
- **Component State**: useState for component-specific UI state
- **State Proximity**: Keep state as close to usage point as possible
- **Type Safety**: Use TypeScript interfaces for all state shapes
- **Data Validation**: Implement both client and form-level validation
- **Brand State**: Maintain consistency in UI state across components

## 🚀 Deployment Process

### Automatic Deployment
- **GitHub Actions**: Automatic deployment on push to `main` branch
- **Build Environment**: Node.js 20 with npm caching
- **Target**: GitHub Pages with custom domain support
- **Live URL**: https://joshuamtm.github.io/bronxworks-closeout-poc/

### Manual Deployment Options
- **Local Build**: `npm run build` for local testing
- **Preview**: `npm run preview` to test production build
- **Quality Checks**: `npm run lint` before deployment

### Deployment Verification
- Verify BronxWorks branding displays correctly
- Test form functionality and PDF generation
- Check responsive design on multiple screen sizes
- Confirm auto-save and data persistence features

## Questions?

- Open an issue for questions
- Tag maintainers for urgent matters
- Check existing documentation first

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.