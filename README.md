# TPRM Helper - Third-Party Risk Management Tool

A command-line tool for evaluating third-party vendor security postures based on publicly available data and standard TPRM frameworks.

🌐 **Documentation**: [https://joshuamtm.github.io/tprm-helper/](https://joshuamtm.github.io/tprm-helper/)

## Features

- **Automated Security Assessment**: Retrieves SecurityScorecard ratings and public security documentation
- **Risk Classification**: Automatically classifies vendors based on multiple risk factors
- **Approval Determination**: Provides approval status (Approved, Conditionally Approved, Rejected)
- **Compliance Checking**: Verifies SOC 2 Type 2, ISO 27001, and other certifications
- **Template Generation**: Creates ready-to-send stakeholder communications
- **Public Issue Scanning**: Identifies data breaches, vulnerabilities, and negative news
- **Complementary Controls**: Provides user entity controls for critical vendors

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

## Output

The tool generates:

1. **Risk Determination Summary**
   - SecurityScorecard rating and grade
   - Certification status (SOC 2, ISO 27001)
   - Public security issues found
   - Risk classification with justification
   - Approval status and reasoning

2. **Response Template**
   - Pre-formatted email template
   - Customized based on approval status
   - Includes all relevant findings and next steps

3. **Saved Assessment File** (optional)
   - Markdown format with full details
   - Timestamped filename
   - Includes both summary and template

## Example Output

```
## Risk Determination Summary

- **SecurityScorecard rating:** 85 (B) - [View Report](https://securityscorecard.com/...)
- **SOC 2 Type 2:** ✓ Available - [View](https://vendor.com/trust)
- **ISO 27001:** ✗ Not confirmed
- **Trust Center:** [https://vendor.com/trust](https://vendor.com/trust)
- **Public security issues:** None identified
- **Risk classification:** High with justification:
  - Handles sensitive data for 500 users (High threshold: 50)
  - SecurityScorecard rating: 85 (B)
  - SOC 2 Type 2 certification available
- **Approval status:** Approved
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

## License

ISC

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.