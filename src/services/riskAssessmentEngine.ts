import { 
  VendorInput, 
  VendorAssessment, 
  RiskLevel, 
  ApprovalStatus,
  SecurityScorecard,
  SecurityDocumentation,
  PublicSecurityIssues
} from '../types';
import { RISK_THRESHOLDS } from '../utils/constants';

export class RiskAssessmentEngine {
  assessVendor(
    vendor: VendorInput,
    scorecard: SecurityScorecard | null,
    documentation: SecurityDocumentation,
    publicIssues: PublicSecurityIssues
  ): VendorAssessment {
    const assessment: VendorAssessment = {
      vendor,
      securityScorecard: scorecard || undefined,
      documentation,
      publicIssues,
      riskDetermination: {
        finalRiskLevel: vendor.riskClassification,
        approvalStatus: ApprovalStatus.REJECTED,
        justification: []
      },
      assessmentDate: new Date()
    };

    // Perform risk assessment
    this.evaluateRisk(assessment);
    this.determineApprovalStatus(assessment);

    return assessment;
  }

  private evaluateRisk(assessment: VendorAssessment): void {
    const { vendor, securityScorecard, documentation, publicIssues } = assessment;
    const justification = assessment.riskDetermination.justification;

    // Start with user-provided risk classification
    let riskLevel = vendor.riskClassification;
    
    // Adjust based on number of users and data sensitivity
    if (vendor.sharesSensitiveData) {
      if (vendor.numberOfUsers >= RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD) {
        riskLevel = RiskLevel.CRITICAL;
        justification.push(`Handles sensitive data for ${vendor.numberOfUsers} users (Critical threshold: ${RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD})`);
      } else if (vendor.numberOfUsers >= RISK_THRESHOLDS.HIGH_USER_THRESHOLD && riskLevel !== RiskLevel.CRITICAL) {
        riskLevel = RiskLevel.HIGH;
        justification.push(`Handles sensitive data for ${vendor.numberOfUsers} users (High threshold: ${RISK_THRESHOLDS.HIGH_USER_THRESHOLD})`);
      }
    }

    // Evaluate SecurityScorecard rating
    if (securityScorecard) {
      justification.push(`SecurityScorecard rating: ${securityScorecard.score} (${securityScorecard.letterGrade})`);
      
      if (securityScorecard.letterGrade >= RISK_THRESHOLDS.SCORECARD_HIGH_RISK) {
        if (riskLevel === RiskLevel.LOW || riskLevel === RiskLevel.MEDIUM) {
          riskLevel = RiskLevel.HIGH;
          justification.push(`Elevated to HIGH risk due to poor security score (${securityScorecard.letterGrade})`);
        }
      }
    } else {
      justification.push('INSUFFICIENT DATA: SecurityScorecard rating not available');
    }

    // Evaluate certifications
    if (documentation.soc2Type2Available) {
      justification.push('SOC 2 Type 2 certification available');
    } else {
      justification.push('INSUFFICIENT DATA: SOC 2 Type 2 certification not confirmed');
    }

    if (documentation.iso27001Available) {
      justification.push('ISO 27001 certification available');
    }

    // Evaluate public security issues
    const issueCount = this.countPublicIssues(publicIssues);
    if (issueCount > 0) {
      justification.push(`${issueCount} public security issue(s) identified`);
      
      if (publicIssues.dataBreaches.length > 0) {
        justification.push(`- ${publicIssues.dataBreaches.length} data breach(es) reported`);
        if (riskLevel === RiskLevel.LOW) {
          riskLevel = RiskLevel.MEDIUM;
        }
      }
      
      const criticalVulns = publicIssues.vulnerabilities.filter(v => 
        v.severity === 'Critical' || v.severity === 'High'
      ).length;
      
      if (criticalVulns > 0) {
        justification.push(`- ${criticalVulns} high/critical vulnerabilities`);
        if (riskLevel === RiskLevel.LOW || riskLevel === RiskLevel.MEDIUM) {
          riskLevel = RiskLevel.HIGH;
        }
      }
    } else {
      justification.push('No public security issues identified');
    }

    assessment.riskDetermination.finalRiskLevel = riskLevel;
  }

  private determineApprovalStatus(assessment: VendorAssessment): void {
    const { finalRiskLevel } = assessment.riskDetermination;
    const { securityScorecard, documentation, publicIssues } = assessment;
    const determination = assessment.riskDetermination;

    // Check if vendor meets requirements
    let meetsRequirements = true;
    const unmetRequirements: string[] = [];
    const conditions: string[] = [];

    // Critical vendors must have SOC2 or ISO27001
    if (finalRiskLevel === RiskLevel.CRITICAL) {
      if (!documentation.soc2Type2Available && !documentation.iso27001Available) {
        meetsRequirements = false;
        unmetRequirements.push('Missing required SOC 2 Type 2 or ISO 27001 certification');
      }
      
      // Must have grade B or higher
      if (securityScorecard && securityScorecard.letterGrade > RISK_THRESHOLDS.SCORECARD_AUTO_APPROVE) {
        meetsRequirements = false;
        unmetRequirements.push(`SecurityScorecard grade ${securityScorecard.letterGrade} is below required B`);
      }

      // Add complementary controls for critical vendors
      if (documentation.complementaryUserEntityControls && documentation.complementaryUserEntityControls.length > 0) {
        determination.justification.push('Complementary User Entity Controls identified for implementation');
      }
    }

    // High risk vendors
    if (finalRiskLevel === RiskLevel.HIGH) {
      if (!documentation.soc2Type2Available && !documentation.trustCenterUrl) {
        conditions.push('Provide security attestation or complete vendor security questionnaire within 30 days');
      }
      
      if (securityScorecard && securityScorecard.letterGrade >= RISK_THRESHOLDS.SCORECARD_HIGH_RISK) {
        conditions.push(`Improve SecurityScorecard rating to C or higher (current: ${securityScorecard.letterGrade})`);
      }
    }

    // Check for blocking issues
    if (publicIssues.dataBreaches.length > 0) {
      const recentBreaches = publicIssues.dataBreaches.filter(breach => {
        const breachDate = new Date(breach.date);
        const yearAgo = new Date();
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return breachDate > yearAgo;
      });

      if (recentBreaches.length > 0) {
        meetsRequirements = false;
        unmetRequirements.push(`Recent data breach within past 12 months`);
      }
    }

    // Determine final approval status
    if (meetsRequirements && conditions.length === 0) {
      determination.approvalStatus = ApprovalStatus.APPROVED;
      determination.justification.push('Vendor meets all security requirements for approval');
    } else if (!meetsRequirements || unmetRequirements.length > 0) {
      determination.approvalStatus = ApprovalStatus.REJECTED;
      determination.remediationRequired = unmetRequirements;
      determination.justification.push('Vendor does not meet minimum security requirements');
    } else if (conditions.length > 0) {
      determination.approvalStatus = ApprovalStatus.CONDITIONALLY_APPROVED;
      determination.conditions = conditions;
      determination.justification.push('Vendor conditionally approved pending completion of requirements');
    }

    // Special case: Poor security score always requires remediation
    if (securityScorecard && securityScorecard.letterGrade === 'F') {
      if (determination.approvalStatus !== ApprovalStatus.REJECTED) {
        determination.approvalStatus = ApprovalStatus.REJECTED;
        determination.remediationRequired = ['SecurityScorecard grade F indicates critical security issues'];
      }
    }
  }

  private countPublicIssues(issues: PublicSecurityIssues): number {
    return issues.dataBreaches.length + 
           issues.vulnerabilities.length + 
           issues.negativeNews.length;
  }
}