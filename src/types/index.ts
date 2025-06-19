export enum RiskLevel {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum ApprovalStatus {
  APPROVED = 'Approved',
  CONDITIONALLY_APPROVED = 'Conditionally Approved',
  REJECTED = 'Rejected'
}

export interface VendorInput {
  vendorName: string;
  riskClassification: RiskLevel;
  numberOfUsers: number;
  sharesSensitiveData: boolean;
  useCase: string;
}

export interface SecurityScorecard {
  score: number;
  letterGrade: string;
  factors?: {
    [key: string]: {
      score: number;
      grade: string;
    };
  };
  lastUpdated?: Date;
  url?: string;
}

export interface SecurityDocumentation {
  soc2Type2Available: boolean;
  soc2Type2Url?: string;
  iso27001Available: boolean;
  iso27001Url?: string;
  trustCenterUrl?: string;
  privacyPolicyUrl?: string;
  securityPageUrl?: string;
  complementaryUserEntityControls?: string[];
}

export interface PublicSecurityIssues {
  dataBreaches: Array<{
    date: string;
    description: string;
    source: string;
  }>;
  vulnerabilities: Array<{
    cve?: string;
    description: string;
    severity: string;
    source: string;
  }>;
  negativeNews: Array<{
    date: string;
    headline: string;
    source: string;
    url: string;
  }>;
}

export interface VendorAssessment {
  vendor: VendorInput;
  securityScorecard?: SecurityScorecard;
  documentation: SecurityDocumentation;
  publicIssues: PublicSecurityIssues;
  riskDetermination: {
    finalRiskLevel: RiskLevel;
    approvalStatus: ApprovalStatus;
    justification: string[];
    remediationRequired?: string[];
    conditions?: string[];
  };
  assessmentDate: Date;
}

export interface AssessmentSummary {
  vendorName: string;
  riskLevel: RiskLevel;
  approvalStatus: ApprovalStatus;
  scorecard?: {
    score: number;
    grade: string;
  };
  certifications: {
    soc2: boolean;
    iso27001: boolean;
  };
  publicIssues: number;
  assessmentDate: Date;
}

export type TemplateType = 'approval' | 'conditional' | 'rejection' | 'critical';

export interface TemplateData {
  vendorName: string;
  riskLevel: RiskLevel;
  approvalStatus: ApprovalStatus;
  assessmentDate: string;
  numberOfUsers: number;
  useCase: string;
  securityScore?: string;
  certifications: string[];
  issues?: string[];
  conditions?: string[];
  remediations?: string[];
  complementaryControls?: string[];
}