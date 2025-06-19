# TPRM Helper - Third-Party Risk Management Tool

[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://joshuamtm.github.io/tprm-helper/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A command-line tool for evaluating third-party vendor security postures and providing clear **APPROVED**, **CONDITIONALLY APPROVED**, or **REJECTED** decisions based on automated risk assessment.

🌐 **Documentation**: [https://joshuamtm.github.io/tprm-helper/](https://joshuamtm.github.io/tprm-helper/)

## Table of Contents

- [Features](#features)
- [Decision Outcomes](#decision-outcomes)
- [Installation](#installation)
- [Usage](#usage)
- [Risk Framework](#risk-framework)
- [Example Output](#example-output)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Clear Business Decisions**: Provides definitive APPROVED, CONDITIONALLY APPROVED, or REJECTED outcomes
- **Automated Risk Assessment**: Evaluates vendors using SecurityScorecard ratings and public security data
- **Alternative Vendor Suggestions**: Recommends pre-approved alternatives for rejected vendors
- **Actionable Next Steps**: Clear guidance on what to do after each decision
- **Business-Focused Rationale**: Explains decisions in business terms, not technical jargon
- **Smart Conditional Approval**: Identifies specific requirements for conditional approvals
- **Compliance Integration**: Automatically checks SOC 2 Type 2, ISO 27001, and security certifications

## Installation

```bash
# Clone the repository
git clone https://github.com/joshuamtm/tprm-helper.git
cd tprm-helper

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Interactive Mode (Default)

```bash
npm run cli
```

This will prompt you for:
- Vendor name
- Risk classification (Critical/High/Medium/Low)
- Number of users
- Whether sensitive data is shared
- Intended use case

### Quick Assessment Mode

```bash
npm run cli quick --name "Vendor Name" --risk high --users 100 --sensitive --case "Cloud storage for customer data"
```

Options:
- `-n, --name <vendor>`: Vendor name (required)
- `-r, --risk <level>`: Risk level - critical/high/medium/low (required)
- `-u, --users <number>`: Number of users (required)
- `-s, --sensitive`: Flag if vendor handles sensitive data
- `-c, --case <description>`: Use case description (required)

### Configuration

To use real SecurityScorecard data (optional):

```bash
# Create .env file
echo "SECURITYSCORECARD_API_KEY=your_api_key_here" > .env

# Run config command for more info
npm run cli config
```

## Risk Framework

### Risk Classifications

1. **Critical**: Handles highly sensitive data, critical business functions, or has broad system access
   - Requires SOC 2 Type 2 or ISO 27001
   - SecurityScorecard grade B or higher
   - Complementary User Entity Controls required

2. **High**: Processes sensitive data or supports important business functions
   - Requires security attestation
   - SecurityScorecard grade C or higher
   - Annual reviews required

3. **Medium**: Limited data access or moderate business impact
   - Basic security documentation required
   - Periodic reviews

4. **Low**: Minimal data access and low business impact
   - Standard security checks

### Approval Criteria

- **Approved**: Meets all security requirements for the risk level
- **Conditionally Approved**: Pending specific remediation items (30-day timeline)
- **Rejected**: Does not meet minimum requirements, requires significant remediation

## Decision Outcomes

The tool provides one of three clear decisions:

### 🟢 APPROVED
- **What it means**: Vendor meets all security requirements
- **Next steps**: Proceed with onboarding and implementation
- **Example**: Microsoft Teams for collaboration

### 🟡 CONDITIONALLY APPROVED  
- **What it means**: Vendor can be used with specific requirements
- **Next steps**: Complete requirements within 30 days for full approval
- **Example**: Vendor needs to provide SOC 2 certification

### 🔴 NOT APPROVED
- **What it means**: Vendor doesn't meet minimum security standards
- **Next steps**: Use suggested alternatives or wait for vendor improvements
- **Example**: Poor security score, recent data breaches

## Example Output

```
# VENDOR ASSESSMENT RESULT

## 🟢 APPROVED

**Vendor:** Microsoft Teams
**Decision:** Approved for use
**Assessment Date:** 6/19/2025

### Rationale
Microsoft Teams has been approved based on the following factors:

✓ Strong security posture (SecurityScorecard: A)
✓ No significant public security issues identified  
✓ Meets security requirements for medium risk classification

### Next Steps
1. **Proceed with vendor onboarding** - You may begin using this vendor
2. **Contract review** - Ensure security requirements are included
3. **Implementation planning** - Work with IT to set up secure integration
4. **Schedule annual review** - Set reminder for next year's assessment
```

## Development

```bash
# Run in development mode
npm run dev

# Build TypeScript
npm run build

# Run compiled version
npm start
```

## Configuration

### SecurityScorecard API (Optional)

For real SecurityScorecard data, set your API key:

```bash
# Create .env file
echo "SECURITYSCORECARD_API_KEY=your_api_key_here" > .env
```

Without an API key, the tool uses realistic mock data for demonstration.

### Environment Variables

- `SECURITYSCORECARD_API_KEY` - SecurityScorecard API key (optional)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test: `npm run build && npm run cli`
4. Commit with descriptive message: `git commit -m "Add feature"`
5. Push and create a Pull Request

## Security

If you discover a security vulnerability, please see our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

## Support

- 📖 [Documentation](https://joshuamtm.github.io/tprm-helper/)
- 🐛 [Issue Tracker](https://github.com/joshuamtm/tprm-helper/issues)
- 💬 [Discussions](https://github.com/joshuamtm/tprm-helper/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- SecurityScorecard for security rating data
- NIST Cybersecurity Framework for risk classification guidance
- SOC 2 and ISO 27001 standards for compliance requirements