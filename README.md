# TPRM Helper - Vendor Security Assessment Tool

[![GitHub Pages](https://img.shields.io/badge/app-live-green)](https://joshuamtm.github.io/tprm-helper/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A professional web-based tool for evaluating third-party vendor security postures with enhanced risk scoring algorithms, comprehensive user guidance, and detailed decision explanations. Provides clear **APPROVED**, **CONDITIONALLY APPROVED**, or **REJECTED** decisions based on enterprise-grade automated risk assessment.

🌐 **Live Application**: [https://joshuamtm.github.io/tprm-helper/](https://joshuamtm.github.io/tprm-helper/)

## Features

### 🔧 **Enhanced Risk Assessment Engine**
- **Advanced Risk Scoring** - Multi-component scoring system with detailed breakdowns
- **Automatic Risk Escalation** - Smart thresholds based on data sensitivity and user scale
- **Mitigation Credit System** - Recognizes security certifications and controls
- **Confidence Level Indicators** - Assessment reliability based on available data

### 📚 **Comprehensive User Guidance**
- **Interactive Decision Tree** - Step-by-step vendor classification assistance
- **Real-Time Risk Feedback** - Dynamic guidance as you complete the form
- **Sensitive Data Guide** - Detailed explanations of data types and risk levels
- **Vendor Pattern Recognition** - Automatic suggestions based on use case

### 📊 **Detailed Decision Explanations**
- **Risk Score Breakdowns** - Shows how each component contributes to final score
- **Blocking Issues Analysis** - Identifies specific security concerns
- **Compliance Mapping** - Links requirements to risk levels and frameworks
- **Actionable Next Steps** - Clear guidance based on decision outcome

### 🎨 **Professional Interface**
- **Interactive Help System** - Collapsible guidance panels and tooltips
- **Enhanced Form Validation** - Smart error detection with helpful suggestions
- **Visual Risk Indicators** - Color-coded feedback and progress tracking
- **PDF Export** - Professional assessment reports for record keeping

## How It Works

### 1. Submit Assessment Request
- Enter vendor name and website
- Select risk classification (Critical/High/Medium/Low)
- Specify number of users and data sensitivity
- Describe intended use case
- Optionally upload security documentation

### 2. Automated Assessment (3-5 minutes)
- Analyzes public security data
- Scans for compliance certifications
- Checks for security issues and breaches
- Processes uploaded documentation
- Applies risk assessment framework

### 3. Receive Clear Decision
- **🟢 APPROVED** - Ready to proceed with onboarding
- **🟡 CONDITIONALLY APPROVED** - Specific requirements to fulfill
- **🔴 REJECTED** - Alternative solutions provided

## Enhanced Decision Framework

### Risk Classifications

#### **Critical Risk** 🔴
- **Data Types**: SSNs, payment cards, PHI, financial accounts, biometric data
- **Examples**: Payroll systems, banking platforms, ERP with full access
- **Requirements**: SOC 2 Type 2 or ISO 27001, SecurityScorecard grade B+
- **Auto-Escalation**: Sensitive data for 1000+ users

#### **High Risk** 🟠  
- **Data Types**: Customer PII, employee data, proprietary business information
- **Examples**: CRM systems, email platforms, document storage
- **Requirements**: Security attestation, regular reviews, grade C+
- **Auto-Escalation**: Sensitive data for 50+ users

#### **Medium Risk** 🟡
- **Data Types**: Limited business data, contact information
- **Examples**: Project management, analytics platforms, marketing tools
- **Requirements**: Basic security documentation, periodic reviews
- **Threshold**: 10-49 users typically

#### **Low Risk** 🟢
- **Data Types**: Public information, general business tools
- **Examples**: Website monitoring, research tools, public APIs
- **Requirements**: Standard security checks, basic questionnaire
- **Threshold**: <10 users, minimal data access

### Advanced Assessment Criteria

- **Security Posture Analysis** - Multi-factor scoring with detailed breakdowns
- **Compliance Verification** - Framework mapping (SOC 2, ISO 27001, NIST, HIPAA)
- **Public Security Intelligence** - Breach history, vulnerability tracking
- **Risk Escalation Logic** - Automatic threshold-based adjustments
- **Mitigation Factor Recognition** - Credit for strong security controls

## Enhanced Assessment Flow

### Example: CRM System Assessment
1. **Input**: "Assess Salesforce for customer management (High risk, 500 users, customer PII)"
2. **Real-Time Guidance**: System suggests High risk appropriate, warns about user scale
3. **Advanced Analysis**: 
   - Base Risk Score: 30 (High classification)
   - Data Exposure Risk: +20 (customer PII at scale)
   - Security Posture: +2 (Grade B SecurityScorecard)
   - Compliance Credit: -8 (SOC 2 Type 2 verified)
   - **Total Risk Score: 44/100**
4. **Detailed Result**: "APPROVED with monitoring - Strong security posture confirmed"
5. **Comprehensive Explanation**:
   - ✅ SOC 2 Type 2 certification verified
   - ✅ SecurityScorecard grade B indicates strong controls  
   - ⚠️ Large user base requires enhanced access controls
   - 📋 Next Steps: Include security terms in contract, implement monitoring

### Example: High-Risk Rejection
1. **Input**: "Assess StartupTool for payroll (Critical risk, 1000+ users, SSNs)"
2. **Auto-Escalation**: System escalates to Critical due to SSN + user scale
3. **Analysis Results**:
   - Missing required SOC 2/ISO 27001 certification
   - SecurityScorecard grade D indicates security gaps
   - Recent data breach identified in public records
4. **Decision**: "REJECTED - Critical security deficiencies identified"
5. **Alternatives Provided**: ADP, Workday, Gusto (pre-approved options)

## Supported Documentation

Upload these file types to improve assessment accuracy:
- SOC 2 Type 2 reports
- ISO 27001 certificates
- Penetration testing reports
- Security scorecards
- Compliance attestations

## Data Sources

The tool analyzes publicly available information:
- Company security pages and trust centers
- Certificate transparency logs
- Public breach databases
- Security vulnerability disclosures
- Domain and website security indicators

## Privacy & Security

- **No data storage** - All assessments are session-based only
- **Client-side processing** - No sensitive data sent to external servers
- **Secure file handling** - Uploaded documents processed locally
- **No tracking** - No user analytics or data collection

## Use Cases

- **Procurement Teams** - Rapid vendor security assessment
- **IT Security** - Standardized risk evaluation process
- **Business Units** - Self-service vendor vetting
- **Compliance** - Documented assessment records
- **Risk Management** - Consistent decision framework

## Technical Details

- **Platform**: Web-based (works in any modern browser)
- **Requirements**: No installation or setup required
- **Compatibility**: Desktop and mobile responsive design
- **Performance**: 3-5 minute assessment time
- **Export**: PDF generation for record keeping

## Getting Started

Simply visit [https://joshuamtm.github.io/tprm-helper/](https://joshuamtm.github.io/tprm-helper/) and start your first vendor assessment.

**No registration, downloads, or setup required.**

### Quick Start Guide
1. **Click "Need Help Classifying?"** for interactive guidance on risk levels
2. **Enter vendor details** with real-time feedback and suggestions
3. **Upload security documents** (optional) to improve assessment accuracy
4. **Review detailed analysis** with risk breakdowns and explanations
5. **Download PDF report** for documentation and approval workflows

### Pro Tips
- 💡 Use the sensitive data guide to properly classify your vendor
- 🔍 Upload SOC 2 or ISO 27001 reports for better assessment outcomes
- ⚡ Watch for auto-escalation warnings when entering user counts
- 📊 Review the risk score breakdown to understand decision factors

### Current Status
✅ **Enhanced Risk Assessment Engine** - Advanced multi-component scoring system  
✅ **Interactive User Guidance** - Real-time help and decision tree assistance  
✅ **Detailed Decision Explanations** - Comprehensive risk breakdowns and justifications  
✅ **Professional Web Interface** - Form validation, visual indicators, help system  
✅ **Enterprise-Grade Analysis** - Automatic escalation, confidence scoring  
✅ **PDF Export & Reporting** - Professional assessment documentation  
✅ **File Upload Support** - Security report processing for enhanced accuracy  
✅ **Session-Based Privacy** - No data storage, client-side processing  

🎯 **Latest Updates**: Comprehensive enhancement of risk scoring algorithms, user guidance system, and decision explanations for enterprise-grade TPRM capabilities

## Support

- 📖 [Live Application](https://joshuamtm.github.io/tprm-helper/)
- 🐛 [Report Issues](https://github.com/joshuamtm/tprm-helper/issues)
- 💬 [Feature Requests](https://github.com/joshuamtm/tprm-helper/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Enterprise-grade third-party risk management with intelligent guidance and detailed analysis.**