# Contributing to PHI Vendor Recommendation Assistant

Thank you for your interest in contributing to the PHI Vendor Recommendation Assistant! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use issue templates** when available
3. **Provide clear descriptions** including:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser/OS information

### Suggesting Enhancements

1. **Open an issue** with the "enhancement" label
2. **Describe the feature** and its benefits
3. **Include use cases** and examples

### Adding Vendors

To add new vendors to the knowledge base:

1. Edit `vendors.js`
2. Follow the existing vendor object structure:
```javascript
{
    name: "Vendor Name",
    status: "approved|supported|not-approved",
    description: "Brief description",
    features: ["Feature 1", "Feature 2"],
    nonprofitPricing: "Pricing details",
    bestFor: "Use case description",
    integrations: ["Integration 1", "Integration 2"]
}
```
3. Ensure all fields are complete and accurate
4. Verify vendor information from official sources

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the code style
4. **Test thoroughly** in multiple browsers
5. **Commit with clear messages**: `git commit -m "Add: brief description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a Pull Request**

## Code Style Guidelines

### JavaScript
- Use ES6+ features where appropriate
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use strict equality (`===` instead of `==`)

### HTML
- Use semantic HTML elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)

### CSS
- Use meaningful class names
- Group related properties
- Include comments for complex styling
- Maintain mobile-first approach

## Testing

Before submitting:

1. **Test in multiple browsers** (Chrome, Firefox, Safari, Edge)
2. **Test on mobile devices** or using responsive mode
3. **Verify accessibility** using screen readers
4. **Check for console errors**
5. **Test all chatbot interactions**

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add: new feature or vendor`
- `Fix: bug fix description`
- `Update: modification to existing feature`
- `Remove: removed feature or code`
- `Docs: documentation changes`
- `Style: formatting changes`
- `Refactor: code restructuring`

## Security

- Never commit sensitive information
- Validate and sanitize all user inputs
- Follow security best practices
- Report security issues privately to maintainers

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping improve the PHI Vendor Recommendation Assistant!