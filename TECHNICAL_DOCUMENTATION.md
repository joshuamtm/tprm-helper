# TPRM Helper - Technical Documentation

## Architecture Overview

The TPRM Helper employs a sophisticated client-side architecture with enhanced risk assessment algorithms, comprehensive user guidance systems, and detailed decision explanations.

### Core Components

#### 1. Enhanced Risk Assessment Engine (`src/services/riskAssessmentEngine.ts`)

**Multi-Component Risk Scoring System:**

```typescript
interface RiskScoreComponents {
  baseRisk: number;           // 10-40 points based on risk classification
  dataExposureRisk: number;   // 0-25 points based on data sensitivity
  userScaleRisk: number;      // 0-20 points based on user count and data
  securityPostureRisk: number; // 0-20 points based on SecurityScorecard
  complianceRisk: number;     // 0-25 points for missing certifications
  publicIssueRisk: number;    // 0-40 points for breaches/vulnerabilities
  mitigationCredit: number;   // 0-15 points credit for good practices
}
```

**Automatic Risk Escalation Logic:**
- Sensitive data + 1000+ users → Automatic Critical escalation
- Sensitive data + 50+ users → Consider High escalation  
- SecurityScorecard grade F → Automatic escalation
- Recent data breaches → Risk level increase

**Confidence Level Assessment:**
- **High**: 3+ data points (scorecard, certifications, security docs, public data)
- **Medium**: 2 data points available
- **Low**: 1 or fewer data points

#### 2. User Guidance System

**Interactive Risk Classification Decision Tree:**

```javascript
const CLASSIFICATION_DECISION_TREE = {
  step1: {
    question: 'What type of data will the vendor access?',
    options: {
      'SSNs, payment cards, PHI, or other regulated data': 'CRITICAL',
      'Customer PII, employee data, or proprietary business information': 'HIGH', 
      'Business operational data, limited contact information': 'MEDIUM',
      'Public information, general business tools': 'LOW'
    }
  }
  // Additional steps for user count and business impact
}
```

**Sensitive Data Classification:**

| Category | Risk Level | Examples |
|----------|------------|----------|
| **Regulated Data** | Critical | SSNs, Payment cards, PHI, Financial accounts |
| **Personal Information** | High | Customer PII, Employee data, Contact information |
| **Business Data** | Medium | Operational data, Limited business information |
| **Public Information** | Low | General tools, Public content, Anonymous analytics |

**Real-Time Risk Feedback:**
- Automatic escalation warnings
- Use case pattern recognition
- Threshold notifications
- Smart form validation

#### 3. Enhanced Decision Explanations

**Comprehensive Decision Context:**

```typescript
interface DetailedDecisionExplanation {
  riskScoreBreakdown: RiskScoreComponents;
  escalationReasons: string[];
  blockingIssues: string[];
  riskFactors: string[];
  mitigatingFactors: string[];
  complianceRequirements: string[];
  nextSteps: string[];
}
```

**Decision Outcome Explanations:**

- **APPROVED**: Meets all requirements, ready for onboarding
- **CONDITIONALLY APPROVED**: Acceptable with specific conditions
- **REJECTED**: Unacceptable risk, alternatives recommended

## Risk Assessment Algorithm

### 1. Base Risk Calculation

```typescript
private calculateBaseRisk(classification: RiskLevel): number {
  switch (classification) {
    case RiskLevel.CRITICAL: return 40;
    case RiskLevel.HIGH: return 30; 
    case RiskLevel.MEDIUM: return 20;
    case RiskLevel.LOW: return 10;
  }
}
```

### 2. Data Exposure Risk Analysis

```typescript
private calculateDataExposureRisk(vendor: VendorInput): number {
  if (!vendor.sharesSensitiveData) return 0;
  
  let riskScore = 15; // Base sensitive data risk
  
  // Keyword analysis for risk amplification
  const highRiskKeywords = ['pii', 'financial', 'payment', 'healthcare', 'ssn'];
  const criticalKeywords = ['database', 'backup', 'integration', 'api'];
  
  // Risk amplification based on use case
  if (highRiskKeywords.some(keyword => useCase.includes(keyword))) riskScore += 10;
  if (criticalKeywords.some(keyword => useCase.includes(keyword))) riskScore += 8;
  
  return Math.min(25, riskScore);
}
```

### 3. Security Posture Assessment

```typescript
private calculateSecurityPostureRisk(scorecard: SecurityScorecard | null): number {
  if (!scorecard) return 15; // Unknown security posture penalty
  
  const gradeRisk = {
    'A': 0,   // Excellent security
    'B': 2,   // Good security
    'C': 5,   // Fair security  
    'D': 12,  // Poor security
    'F': 20   // Very poor security
  };
  
  return gradeRisk[scorecard.letterGrade] || 15;
}
```

### 4. Compliance Risk Evaluation

Risk penalties for missing certifications:
- **Critical vendors**: +25 points if missing SOC 2/ISO 27001
- **High vendors**: +15 points if missing security attestation
- **All vendors**: +5 points if missing basic security documentation

### 5. Public Security Issues Analysis

```typescript
private calculatePublicIssueRisk(issues: PublicSecurityIssues): number {
  let riskScore = 0;
  
  // Data breach penalties (time-weighted)
  issues.dataBreaches.forEach(breach => {
    const monthsAgo = calculateMonthsAgo(breach.date);
    if (monthsAgo <= 12) riskScore += 20;      // Recent breach
    else if (monthsAgo <= 24) riskScore += 10; // Breach within 2 years
    else riskScore += 5;                       // Older breach
  });
  
  // Vulnerability penalties by severity
  issues.vulnerabilities.forEach(vuln => {
    switch (vuln.severity.toLowerCase()) {
      case 'critical': riskScore += 8; break;
      case 'high': riskScore += 5; break;
      case 'medium': riskScore += 2; break;
      case 'low': riskScore += 1; break;
    }
  });
  
  return Math.min(40, riskScore);
}
```

### 6. Mitigation Credit System

```typescript
private calculateMitigationCredit(
  documentation: SecurityDocumentation, 
  scorecard: SecurityScorecard | null
): number {
  let credit = 0;
  
  // Certification credits
  if (documentation.soc2Type2Available) credit += 8;
  if (documentation.iso27001Available) credit += 6;
  
  // Security posture credits
  if (scorecard && ['A', 'B'].includes(scorecard.letterGrade)) credit += 5;
  
  // Documentation completeness credit
  if (hasComprehensiveDocumentation(documentation)) credit += 3;
  
  // Complementary controls credit
  if (documentation.complementaryUserEntityControls?.length > 0) credit += 4;
  
  return credit;
}
```

## User Interface Enhancements

### 1. Interactive Guidance System

**Risk Classification Helper:**
- Expandable guidance panel with examples
- Real-time risk level suggestions
- Pattern recognition for common vendor types
- Automatic threshold warnings

**Dynamic Form Validation:**
```javascript
updateRiskFeedback() {
  const riskLevel = document.getElementById('risk-level').value;
  const userCount = parseInt(document.getElementById('user-count').value) || 0;
  const sensitiveData = document.getElementById('sensitive-data').checked;
  
  // Auto-escalation detection
  if (sensitiveData && userCount >= 1000) {
    showWarning('Will be automatically escalated to CRITICAL');
  }
  
  // Use case analysis
  const useCase = document.getElementById('use-case').value.toLowerCase();
  if (containsCriticalKeywords(useCase)) {
    showAlert('Use case contains critical data types');
  }
}
```

### 2. Enhanced Assessment Results

**Risk Score Visualization:**
- Component-by-component breakdown
- Visual progress indicators
- Color-coded risk levels
- Confidence level indicators

**Detailed Explanations:**
- Blocking issues identification
- Risk factor analysis
- Mitigation factor recognition
- Compliance requirement mapping
- Actionable next steps

## Compliance Framework Integration

### Certification Requirements by Risk Level

| Risk Level | Required Certifications | Optional Certifications |
|------------|------------------------|------------------------|
| **Critical** | SOC 2 Type 2 OR ISO 27001 | NIST, PCI-DSS, HIPAA |
| **High** | Security Attestation | SOC 2, ISO 27001 |
| **Medium** | Basic Security Documentation | Industry standards |
| **Low** | Standard Security Checks | None |

### Automated Compliance Checking

```typescript
private analyzeComplianceRequirements(
  riskLevel: RiskLevel,
  documentation: SecurityDocumentation,
  analysis: ApprovalAnalysis
): void {
  switch (riskLevel) {
    case RiskLevel.CRITICAL:
      if (!documentation.soc2Type2Available && !documentation.iso27001Available) {
        analysis.remediationRequired.push(
          'Critical vendors require SOC 2 Type 2 or ISO 27001 certification'
        );
        analysis.blockingIssues.push('Missing mandatory compliance certification');
      }
      break;
    // Additional risk level handling...
  }
}
```

## Advanced Features

### 1. Vendor Pattern Recognition

Common vendor type patterns with automatic suggestions:

```typescript
const COMMON_VENDOR_PATTERNS = {
  'hr-payroll': {
    examples: ['Workday', 'ADP', 'BambooHR'],
    typicalRisk: 'Critical',
    keyConsiderations: ['Employee PII', 'SSNs', 'Salary data']
  },
  'crm-sales': {
    examples: ['Salesforce', 'HubSpot', 'Pipedrive'], 
    typicalRisk: 'High',
    keyConsiderations: ['Customer data', 'Sales pipeline', 'Business relationships']
  }
  // Additional patterns...
};
```

### 2. Intelligent Risk Escalation

**Automatic Escalation Triggers:**
- Sensitive data handling for 1000+ users → Critical
- Payment/financial data → Critical consideration
- Healthcare data → HIPAA compliance required
- Recent security incidents → Risk increase

**Manual Override Protection:**
- Warns users about potential misclassification
- Provides detailed reasoning for suggested changes
- Allows override with acknowledgment

### 3. Confidence Scoring

Assessment confidence based on available data:

```typescript
private assessConfidenceLevel(
  scorecard: SecurityScorecard | null,
  documentation: SecurityDocumentation, 
  issues: PublicSecurityIssues
): 'High' | 'Medium' | 'Low' {
  let dataPoints = 0;
  
  if (scorecard) dataPoints++;
  if (hasSecurityCertifications(documentation)) dataPoints++;
  if (hasSecurityDocumentation(documentation)) dataPoints++;
  if (hasPublicSecurityData(issues)) dataPoints++;
  
  if (dataPoints >= 3) return 'High';
  if (dataPoints >= 2) return 'Medium';
  return 'Low';
}
```

## Testing and Validation

### Test Scenarios

1. **Critical Risk Escalation**
   - Input: Payroll system, 1500 users, handles SSNs
   - Expected: Auto-escalation to Critical, SOC 2 requirement

2. **Conditional Approval**
   - Input: CRM system, grade C security, no SOC 2
   - Expected: Conditional approval pending certification

3. **Security Score Override**
   - Input: Grade F vendor for any risk level
   - Expected: Automatic rejection regardless of other factors

### Validation Rules

- Risk scores must be within 0-100 range
- Escalation logic must be deterministic
- Decision explanations must be comprehensive
- All user inputs must be validated and sanitized

## Performance Considerations

- **Client-side processing**: No server dependencies
- **Efficient algorithms**: O(n) complexity for most operations
- **Lazy loading**: Guidance panels loaded on demand
- **Caching**: Risk calculations cached during session
- **Responsive design**: Works on desktop and mobile

## Security Considerations

- **No data persistence**: All processing client-side only
- **File upload security**: Documents processed locally
- **Input validation**: All user inputs sanitized
- **XSS protection**: Content security policies enforced
- **Privacy by design**: No tracking or data collection

This enhanced TPRM Helper provides enterprise-grade vendor risk assessment capabilities with sophisticated algorithms, comprehensive guidance, and detailed explanations suitable for organizations of all sizes.