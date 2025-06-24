# PHI Vendor Recommendation Chatbot - Development Guide

## Development Environment Setup

### Prerequisites

- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Local web server (Python, Node.js, or browser extension)

### Getting Started

1. **Clone the Repository**
```bash
git clone https://github.com/joshuamtm/tprm-helper.git
cd tprm-helper
```

2. **Start Local Development Server**

Using Python:
```bash
python -m http.server 8000
# Python 2: python -m SimpleHTTPServer 8000
```

Using Node.js:
```bash
npx http-server -p 8000
```

Using VS Code Live Server:
- Install "Live Server" extension
- Right-click on index.html
- Select "Open with Live Server"

3. **Access Local Instance**
```
http://localhost:8000
```

## Project Structure

```
tprm-helper/
├── index.html          # Main chatbot interface
├── chatbot.js          # Core chatbot logic and NLP
├── vendors.js          # Vendor database and assessments
├── style.css           # Styling and responsive design
├── test-chatbot.html   # Testing interface
├── docs/               # GitHub Pages documentation
│   ├── index.html      # Documentation home
│   ├── architecture.md # System architecture
│   ├── user-guide.md   # User documentation
│   └── deployment.md   # Deployment guide
└── README.md           # Project overview
```

## Core Components

### 1. Chatbot Engine (chatbot.js)

The main chatbot logic handles:
- Natural language processing
- Vendor recognition
- Risk assessment
- Response generation

```javascript
// Core chatbot class structure
class PHIChatbot {
  constructor() {
    this.vendors = window.vendorDatabase;
    this.context = {};
  }
  
  processQuery(input) {
    // NLP and intent recognition
    const intent = this.detectIntent(input);
    const vendor = this.extractVendor(input);
    const context = this.extractContext(input);
    
    // Generate appropriate response
    return this.generateResponse(intent, vendor, context);
  }
}
```

### 2. Vendor Database (vendors.js)

Structured vendor information:

```javascript
window.vendorDatabase = {
  "zoom": {
    name: "Zoom",
    category: "video_conferencing",
    variants: {
      "standard": {
        hipaa_compliant: false,
        risk_score: 75,
        issues: ["No BAA available", "Consumer-grade security"]
      },
      "healthcare": {
        hipaa_compliant: true,
        risk_score: 20,
        requirements: ["BAA required", "E2E encryption enabled"],
        certifications: ["SOC 2 Type 2", "HIPAA attestation"]
      }
    }
  }
};
```

### 3. UI Components (index.html + style.css)

Clean, accessible chat interface:

```html
<div class="chat-container">
  <div class="chat-header">
    <h1>PHI Vendor Recommendation Chatbot</h1>
  </div>
  <div class="chat-messages" id="chat-messages">
    <!-- Messages rendered here -->
  </div>
  <div class="chat-input">
    <input type="text" id="user-input" placeholder="Ask about a vendor...">
    <button onclick="sendMessage()">Send</button>
  </div>
</div>
```

## Development Workflow

### 1. Adding New Vendors

Edit `vendors.js`:

```javascript
window.vendorDatabase["new-vendor"] = {
  name: "New Vendor",
  category: "category_type",
  aliases: ["alternate-name", "subsidiary"],
  hipaa_compliant: true,
  risk_score: 25,
  certifications: ["SOC 2 Type 2", "ISO 27001"],
  requirements: ["Sign BAA", "Enable audit logs"],
  known_issues: [],
  last_updated: "2024-01-15"
};
```

### 2. Enhancing NLP Capabilities

Improve intent recognition in `chatbot.js`:

```javascript
detectIntent(input) {
  const lowerInput = input.toLowerCase();
  
  // Check for various intent patterns
  if (lowerInput.includes("compare") && lowerInput.includes("vs")) {
    return "comparison";
  } else if (lowerInput.includes("alternative") || lowerInput.includes("instead")) {
    return "alternatives";
  } else if (lowerInput.includes("requirement") || lowerInput.includes("need")) {
    return "requirements";
  }
  // ... more patterns
  
  return "vendor_assessment";
}
```

### 3. Adding Response Templates

Create new response types:

```javascript
generateResponse(intent, vendor, context) {
  switch(intent) {
    case "comparison":
      return this.compareVendors(context.vendor1, context.vendor2);
    
    case "alternatives":
      return this.suggestAlternatives(vendor.category);
    
    case "requirements":
      return this.listRequirements(vendor);
    
    default:
      return this.assessVendor(vendor, context);
  }
}
```

## Testing

### Unit Testing

Create test cases in `test-chatbot.html`:

```javascript
// Test vendor recognition
console.assert(
  chatbot.extractVendor("Can we use Zoom?").name === "Zoom",
  "Should recognize Zoom"
);

// Test risk assessment
console.assert(
  chatbot.assessRisk("zoom", "standard") > 50,
  "Standard Zoom should be high risk"
);

// Test response generation
const response = chatbot.processQuery("Is Salesforce HIPAA compliant?");
console.assert(
  response.includes("Salesforce Health Cloud"),
  "Should mention Health Cloud variant"
);
```

### Manual Testing Checklist

- [ ] Test each vendor in the database
- [ ] Verify all response types (approved/conditional/rejected)
- [ ] Check edge cases (misspellings, partial names)
- [ ] Test conversation context preservation
- [ ] Verify mobile responsiveness
- [ ] Check accessibility (keyboard navigation, screen readers)

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Best Practices

### 1. Code Style

```javascript
// Use clear, descriptive names
function assessVendorCompliance(vendorData, requirements) {
  // Not: function avc(vd, r)
}

// Document complex logic
/**
 * Calculates risk score based on multiple factors
 * @param {Object} vendor - Vendor data object
 * @param {Object} context - Usage context (users, data type)
 * @returns {number} Risk score 0-100
 */
function calculateRiskScore(vendor, context) {
  // Implementation
}
```

### 2. Performance Optimization

- Lazy load vendor data for large databases
- Cache processed responses
- Minimize DOM manipulations
- Use event delegation for chat messages

### 3. Security Considerations

- Sanitize all user input
- Never execute user input as code
- Validate vendor data structure
- Keep all processing client-side

## Debugging

### Enable Debug Mode

```javascript
// In chatbot.js
const DEBUG = true;

class PHIChatbot {
  log(message, data = null) {
    if (DEBUG) {
      console.log(`[Chatbot] ${message}`, data || '');
    }
  }
}
```

### Common Issues

1. **Vendor Not Found**
```javascript
// Add debugging
this.log('Searching for vendor:', searchTerm);
this.log('Available vendors:', Object.keys(this.vendors));
```

2. **Incorrect Risk Assessment**
```javascript
// Log risk calculation
this.log('Base risk:', baseRisk);
this.log('Modifiers:', modifiers);
this.log('Final risk:', finalRisk);
```

## Contributing

### 1. Fork and Branch

```bash
git checkout -b feature/new-vendor-type
```

### 2. Make Changes

Follow the coding standards and test thoroughly.

### 3. Submit Pull Request

Include:
- Description of changes
- Testing performed
- Any new vendors added
- Documentation updates

## Advanced Features

### Implementing Fuzzy Matching

```javascript
function fuzzyMatch(input, target) {
  // Levenshtein distance implementation
  // Returns similarity score 0-1
}

function findVendor(input) {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [key, vendor] of Object.entries(this.vendors)) {
    const score = fuzzyMatch(input, vendor.name);
    if (score > bestScore && score > 0.7) {
      bestMatch = vendor;
      bestScore = score;
    }
  }
  
  return bestMatch;
}
```

### Adding Machine Learning

```javascript
// Simple pattern learning
class PatternLearner {
  constructor() {
    this.patterns = new Map();
  }
  
  learn(input, intent) {
    const tokens = this.tokenize(input);
    tokens.forEach(token => {
      if (!this.patterns.has(token)) {
        this.patterns.set(token, new Map());
      }
      const intents = this.patterns.get(token);
      intents.set(intent, (intents.get(intent) || 0) + 1);
    });
  }
  
  predict(input) {
    // Use learned patterns to predict intent
  }
}
```

## Resources

- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/index.html)
- [Security Frameworks](https://www.nist.gov/cyberframework)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Version Control

### Semantic Versioning

- MAJOR.MINOR.PATCH (e.g., 2.1.0)
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Process

```bash
# Tag release
git tag -a v2.1.0 -m "Add new healthcare vendors"
git push origin v2.1.0

# Update version in code
// In chatbot.js
const VERSION = "2.1.0";
```