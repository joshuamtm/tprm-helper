# PHI Vendor Recommendation Chatbot - Architecture

## Overview

The PHI Vendor Recommendation Chatbot is built as a client-side web application that runs entirely in the user's browser. This architecture ensures maximum privacy and security for healthcare organizations evaluating vendors.

## System Architecture

### Client-Side Components

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌──────────────────┐               │
│  │   Chat Interface │    │  Risk Assessment  │               │
│  │    (chatbot.js)  │───▶│     Engine       │               │
│  └─────────────────┘    └──────────────────┘               │
│           │                       │                          │
│           ▼                       ▼                          │
│  ┌─────────────────┐    ┌──────────────────┐               │
│  │  Vendor Database │    │  Decision Logic  │               │
│  │   (vendors.js)   │    │   & Scoring      │               │
│  └─────────────────┘    └──────────────────┘               │
│                                   │                          │
│                                   ▼                          │
│                          ┌──────────────────┐               │
│                          │  Recommendation  │               │
│                          │     Output       │               │
│                          └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

1. **Chat Interface (chatbot.js)**
   - Natural language processing for user queries
   - Conversation state management
   - Response formatting and display

2. **Vendor Database (vendors.js)**
   - Pre-evaluated vendor information
   - Security certifications and compliance data
   - Known security issues and breach history

3. **Risk Assessment Engine**
   - HIPAA compliance evaluation
   - Security posture analysis
   - Data handling assessment
   - User scale and sensitivity factors

4. **Decision Logic**
   - Rule-based decision tree
   - Risk score calculation
   - Mitigation factor recognition
   - Alternative vendor suggestions

## Data Flow

1. **User Input** → Chat interface receives vendor inquiry
2. **Query Processing** → Natural language understanding extracts vendor name and use case
3. **Database Lookup** → Check pre-evaluated vendor information
4. **Risk Assessment** → Apply healthcare-specific evaluation criteria
5. **Decision Generation** → Calculate approval status with justification
6. **Response Formatting** → Present decision in conversational format

## Security & Privacy Architecture

### Client-Side Processing
- All vendor evaluation logic runs in the browser
- No API calls or server communication for assessments
- Vendor database embedded in JavaScript files

### Data Privacy
- No user data collection or tracking
- No cookies or local storage of queries
- Session-based conversations (memory cleared on refresh)
- No analytics or telemetry

### GitHub Pages Hosting
- Static file serving only
- HTTPS enforcement
- No server-side processing capabilities
- Transparent source code availability

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Hosting**: GitHub Pages
- **Build Tools**: None (pure client-side)
- **Dependencies**: None (zero external libraries)

## Deployment Architecture

```
GitHub Repository
      │
      ▼
GitHub Actions (Deploy)
      │
      ▼
GitHub Pages CDN
      │
      ▼
User's Browser
```

## Performance Considerations

- **Initial Load**: ~100KB total (HTML, CSS, JS)
- **Response Time**: <100ms (all client-side)
- **Memory Usage**: Minimal (~10MB active)
- **Browser Support**: All modern browsers (ES6+)

## Scalability

The client-side architecture provides:
- Unlimited concurrent users (no server bottleneck)
- Zero infrastructure costs
- No scaling concerns
- Consistent performance regardless of load

## Future Architecture Considerations

### Potential Enhancements
1. **Progressive Web App (PWA)** - Offline functionality
2. **Web Workers** - Background processing for large assessments
3. **IndexedDB** - Local caching of vendor data
4. **WebAssembly** - Performance optimization for complex calculations

### Maintaining Privacy
Any future enhancements will maintain the core principle of client-side processing with no data transmission to external servers.