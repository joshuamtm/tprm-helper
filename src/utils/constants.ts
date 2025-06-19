import { RiskLevel } from '../types';

export const RISK_THRESHOLDS = {
  SCORECARD_AUTO_APPROVE: 'B',
  SCORECARD_WARNING: 'C',
  SCORECARD_HIGH_RISK: 'D',
  CRITICAL_DATA_THRESHOLD: 1000,
  HIGH_USER_THRESHOLD: 50,
  MEDIUM_USER_THRESHOLD: 10
};

export const RISK_CRITERIA = {
  [RiskLevel.CRITICAL]: {
    description: 'Handles highly sensitive data, critical business functions, or has broad system access',
    requirements: [
      'SOC 2 Type 2 or ISO 27001 certification required',
      'SecurityScorecard grade B or higher',
      'Documented Complementary User Entity Controls',
      'Annual security reviews',
      'Incident response plan'
    ]
  },
  [RiskLevel.HIGH]: {
    description: 'Processes sensitive data or supports important business functions',
    requirements: [
      'SOC 2 Type 2 or equivalent security attestation',
      'SecurityScorecard grade C or higher',
      'Annual security reviews',
      'Remediation plan for identified gaps'
    ]
  },
  [RiskLevel.MEDIUM]: {
    description: 'Limited data access or moderate business impact',
    requirements: [
      'Basic security documentation',
      'SecurityScorecard monitoring',
      'Periodic security reviews'
    ]
  },
  [RiskLevel.LOW]: {
    description: 'Minimal data access and low business impact',
    requirements: [
      'Standard security checks',
      'Basic vendor questionnaire'
    ]
  }
};

export const TEMPLATE_MESSAGES = {
  approval: {
    subject: 'Vendor Security Assessment - APPROVED: {vendorName}',
    opening: 'I am pleased to inform you that {vendorName} has been approved for use following our security assessment.'
  },
  conditional: {
    subject: 'Vendor Security Assessment - CONDITIONALLY APPROVED: {vendorName}',
    opening: '{vendorName} has been conditionally approved pending the completion of the following requirements:'
  },
  rejection: {
    subject: 'Vendor Security Assessment - NOT APPROVED: {vendorName}',
    opening: 'Following our security assessment, {vendorName} does not meet our current security requirements for approval.'
  },
  critical: {
    subject: 'Critical Vendor Security Assessment Required: {vendorName}',
    opening: '{vendorName} has been identified as a Critical vendor requiring enhanced security review and documentation.'
  }
};

export const SECURITY_FRAMEWORKS = {
  SOC2: 'SOC 2 Type 2',
  ISO27001: 'ISO 27001',
  NIST: 'NIST Cybersecurity Framework',
  HIPAA: 'HIPAA Compliance',
  GDPR: 'GDPR Compliance',
  PCIDSS: 'PCI DSS'
};