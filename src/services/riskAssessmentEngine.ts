import { 
  VendorInput, 
  VendorAssessment, 
  RiskLevel, 
  ApprovalStatus,
  SecurityScorecard,
  SecurityDocumentation,
  PublicSecurityIssues
} from '../types';
import { 
  RISK_THRESHOLDS, 
  RISK_CRITERIA
} from '../utils/constants';

interface RiskScoreComponents {
  baseRisk: number;
  dataExposureRisk: number;
  userScaleRisk: number;
  securityPostureRisk: number;
  complianceRisk: number;
  publicIssueRisk: number;
  mitigationCredit: number;
}

interface DetailedRiskAssessment {
  totalScore: number;
  components: RiskScoreComponents;
  finalRiskLevel: RiskLevel;
  escalationReasons: string[];
  mitigationFactors: string[];
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export class RiskAssessmentEngine {
  // Public method to get risk classification guidance
  public static getRiskClassificationGuidance() {
    return {
      riskCriteria: RISK_CRITERIA,
      riskThresholds: RISK_THRESHOLDS
    };
  }
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
    const detailedAssessment = this.performDetailedRiskScoring(assessment);
    
    // Update assessment with detailed scoring results
    assessment.riskDetermination.finalRiskLevel = detailedAssessment.finalRiskLevel;
    assessment.riskDetermination.justification = this.generateDetailedJustification(assessment, detailedAssessment);
  }

  private performDetailedRiskScoring(assessment: VendorAssessment): DetailedRiskAssessment {
    const { vendor, securityScorecard, documentation, publicIssues } = assessment;
    
    // Initialize risk score components
    const components: RiskScoreComponents = {
      baseRisk: this.calculateBaseRisk(vendor.riskClassification),
      dataExposureRisk: this.calculateDataExposureRisk(vendor),
      userScaleRisk: this.calculateUserScaleRisk(vendor.numberOfUsers, vendor.sharesSensitiveData),
      securityPostureRisk: this.calculateSecurityPostureRisk(securityScorecard || null),
      complianceRisk: this.calculateComplianceRisk(documentation, vendor.riskClassification),
      publicIssueRisk: this.calculatePublicIssueRisk(publicIssues),
      mitigationCredit: this.calculateMitigationCredit(documentation, securityScorecard || null)
    };

    // Calculate total risk score (0-100, higher = more risk)
    const totalScore = Math.min(100, Math.max(0, 
      components.baseRisk + 
      components.dataExposureRisk + 
      components.userScaleRisk + 
      components.securityPostureRisk + 
      components.complianceRisk + 
      components.publicIssueRisk - 
      components.mitigationCredit
    ));

    // Determine final risk level based on total score and escalation factors
    const { finalRiskLevel, escalationReasons } = this.determineFinalRiskLevel(
      vendor.riskClassification, 
      totalScore, 
      assessment
    );

    // Identify mitigation factors
    const mitigationFactors = this.identifyMitigationFactors(documentation, securityScorecard || null);

    // Assess confidence level
    const confidenceLevel = this.assessConfidenceLevel(securityScorecard || null, documentation, publicIssues);

    return {
      totalScore,
      components,
      finalRiskLevel,
      escalationReasons,
      mitigationFactors,
      confidenceLevel
    };
  }

  private calculateBaseRisk(classification: RiskLevel): number {
    switch (classification) {
      case RiskLevel.CRITICAL: return 40;
      case RiskLevel.HIGH: return 30;
      case RiskLevel.MEDIUM: return 20;
      case RiskLevel.LOW: return 10;
      default: return 20;
    }
  }

  private calculateDataExposureRisk(vendor: VendorInput): number {
    if (!vendor.sharesSensitiveData) return 0;
    
    // Analyze use case for data sensitivity indicators
    const useCase = vendor.useCase.toLowerCase();
    let riskScore = 15; // Base sensitive data risk
    
    // High-risk data processing keywords
    const highRiskKeywords = ['pii', 'personal', 'financial', 'payment', 'healthcare', 'medical', 'phi', 'hipaa', 'ssn', 'credit card'];
    const mediumRiskKeywords = ['employee', 'customer', 'contact', 'email', 'phone', 'address', 'billing'];
    const criticalKeywords = ['database', 'backup', 'integration', 'api', 'sync', 'export', 'import'];
    
    if (highRiskKeywords.some(keyword => useCase.includes(keyword))) {
      riskScore += 10;
    }
    if (mediumRiskKeywords.some(keyword => useCase.includes(keyword))) {
      riskScore += 5;
    }
    if (criticalKeywords.some(keyword => useCase.includes(keyword))) {
      riskScore += 8;
    }
    
    return Math.min(25, riskScore);
  }

  private calculateUserScaleRisk(numberOfUsers: number, hasSensitiveData: boolean): number {
    let riskScore = 0;
    
    if (numberOfUsers >= RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD) {
      riskScore = hasSensitiveData ? 20 : 15;
    } else if (numberOfUsers >= RISK_THRESHOLDS.HIGH_USER_THRESHOLD) {
      riskScore = hasSensitiveData ? 15 : 10;
    } else if (numberOfUsers >= RISK_THRESHOLDS.MEDIUM_USER_THRESHOLD) {
      riskScore = hasSensitiveData ? 10 : 5;
    } else {
      riskScore = hasSensitiveData ? 5 : 2;
    }
    
    return riskScore;
  }

  private calculateSecurityPostureRisk(scorecard: SecurityScorecard | null): number {
    if (!scorecard) return 15; // Unknown security posture adds risk
    
    const gradeRisk = {
      'A': 0,
      'B': 2,
      'C': 5,
      'D': 12,
      'F': 20
    };
    
    return gradeRisk[scorecard.letterGrade as keyof typeof gradeRisk] || 15;
  }

  private calculateComplianceRisk(documentation: SecurityDocumentation, riskLevel: RiskLevel): number {
    let riskScore = 0;
    
    // Critical and High risk vendors need strong compliance
    if (riskLevel === RiskLevel.CRITICAL) {
      if (!documentation.soc2Type2Available && !documentation.iso27001Available) {
        riskScore += 25;
      }
    } else if (riskLevel === RiskLevel.HIGH) {
      if (!documentation.soc2Type2Available && !documentation.trustCenterUrl) {
        riskScore += 15;
      }
    }
    
    // Additional risk for lack of basic security documentation
    if (!documentation.privacyPolicyUrl && !documentation.securityPageUrl) {
      riskScore += 5;
    }
    
    return riskScore;
  }

  private calculatePublicIssueRisk(issues: PublicSecurityIssues): number {
    let riskScore = 0;
    
    // Data breaches are high risk
    issues.dataBreaches.forEach(breach => {
      const breachDate = new Date(breach.date);
      const monthsAgo = (Date.now() - breachDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      
      if (monthsAgo <= 12) {
        riskScore += 20; // Recent breach
      } else if (monthsAgo <= 24) {
        riskScore += 10; // Breach within 2 years
      } else {
        riskScore += 5; // Older breach
      }
    });
    
    // Vulnerabilities by severity
    issues.vulnerabilities.forEach(vuln => {
      switch (vuln.severity.toLowerCase()) {
        case 'critical':
          riskScore += 8;
          break;
        case 'high':
          riskScore += 5;
          break;
        case 'medium':
          riskScore += 2;
          break;
        case 'low':
          riskScore += 1;
          break;
      }
    });
    
    // Negative news items
    riskScore += issues.negativeNews.length * 2;
    
    return Math.min(40, riskScore);
  }

  private calculateMitigationCredit(documentation: SecurityDocumentation, scorecard: SecurityScorecard | null): number {
    let credit = 0;
    
    // Strong certifications provide credit
    if (documentation.soc2Type2Available) credit += 8;
    if (documentation.iso27001Available) credit += 6;
    
    // Good security posture
    if (scorecard && ['A', 'B'].includes(scorecard.letterGrade)) {
      credit += 5;
    }
    
    // Comprehensive documentation
    if (documentation.trustCenterUrl && documentation.privacyPolicyUrl && documentation.securityPageUrl) {
      credit += 3;
    }
    
    // Complementary controls
    if (documentation.complementaryUserEntityControls && documentation.complementaryUserEntityControls.length > 0) {
      credit += 4;
    }
    
    return credit;
  }

  private determineFinalRiskLevel(originalLevel: RiskLevel, totalScore: number, assessment: VendorAssessment): { finalRiskLevel: RiskLevel, escalationReasons: string[] } {
    const escalationReasons: string[] = [];
    let finalLevel = originalLevel;
    
    // Score-based escalation thresholds
    if (totalScore >= 70) {
      if (finalLevel !== RiskLevel.CRITICAL) {
        finalLevel = RiskLevel.CRITICAL;
        escalationReasons.push(`Total risk score ${totalScore}/100 requires Critical classification`);
      }
    } else if (totalScore >= 50) {
      if (finalLevel === RiskLevel.LOW || finalLevel === RiskLevel.MEDIUM) {
        finalLevel = RiskLevel.HIGH;
        escalationReasons.push(`Total risk score ${totalScore}/100 requires High classification`);
      }
    } else if (totalScore >= 30) {
      if (finalLevel === RiskLevel.LOW) {
        finalLevel = RiskLevel.MEDIUM;
        escalationReasons.push(`Total risk score ${totalScore}/100 requires Medium classification`);
      }
    }
    
    // Specific escalation conditions
    const { vendor, publicIssues, securityScorecard } = assessment;
    
    // Automatic Critical escalation conditions
    if (vendor.sharesSensitiveData && vendor.numberOfUsers >= RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD) {
      if (finalLevel !== RiskLevel.CRITICAL) {
        finalLevel = RiskLevel.CRITICAL;
        escalationReasons.push(`Sensitive data for ${vendor.numberOfUsers}+ users requires Critical classification`);
      }
    }
    
    // Recent data breach escalation
    const recentBreaches = publicIssues.dataBreaches.filter(breach => {
      const breachDate = new Date(breach.date);
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      return breachDate > yearAgo;
    });
    
    if (recentBreaches.length > 0 && finalLevel === RiskLevel.LOW) {
      finalLevel = RiskLevel.MEDIUM;
      escalationReasons.push('Recent data breach within past 12 months');
    }
    
    // Poor security score escalation
    if (securityScorecard && securityScorecard.letterGrade === 'F') {
      if (finalLevel === RiskLevel.LOW || finalLevel === RiskLevel.MEDIUM) {
        finalLevel = RiskLevel.HIGH;
        escalationReasons.push('SecurityScorecard grade F indicates critical security deficiencies');
      }
    }
    
    return { finalRiskLevel: finalLevel, escalationReasons };
  }

  private identifyMitigationFactors(documentation: SecurityDocumentation, scorecard: SecurityScorecard | null): string[] {
    const factors: string[] = [];
    
    if (documentation.soc2Type2Available) {
      factors.push('SOC 2 Type 2 certification demonstrates strong internal controls');
    }
    
    if (documentation.iso27001Available) {
      factors.push('ISO 27001 certification shows comprehensive security management');
    }
    
    if (scorecard && ['A', 'B'].includes(scorecard.letterGrade)) {
      factors.push(`Strong security posture (SecurityScorecard grade ${scorecard.letterGrade})`);
    }
    
    if (documentation.trustCenterUrl) {
      factors.push('Dedicated security transparency through trust center');
    }
    
    if (documentation.complementaryUserEntityControls && documentation.complementaryUserEntityControls.length > 0) {
      factors.push('Documented complementary user entity controls available');
    }
    
    return factors;
  }

  private assessConfidenceLevel(scorecard: SecurityScorecard | null, documentation: SecurityDocumentation, issues: PublicSecurityIssues): 'High' | 'Medium' | 'Low' {
    let dataPoints = 0;
    
    if (scorecard) dataPoints++;
    if (documentation.soc2Type2Available || documentation.iso27001Available) dataPoints++;
    if (documentation.trustCenterUrl || documentation.securityPageUrl) dataPoints++;
    if (issues.dataBreaches.length > 0 || issues.vulnerabilities.length > 0) dataPoints++;
    
    if (dataPoints >= 3) return 'High';
    if (dataPoints >= 2) return 'Medium';
    return 'Low';
  }

  private generateDetailedJustification(assessment: VendorAssessment, detailedAssessment: DetailedRiskAssessment): string[] {
    const justification: string[] = [];
    const { vendor, securityScorecard, documentation, publicIssues } = assessment;
    const { components, totalScore, escalationReasons, mitigationFactors, confidenceLevel } = detailedAssessment;
    
    // Risk classification summary
    justification.push(`Final Risk Classification: ${detailedAssessment.finalRiskLevel} (Original: ${vendor.riskClassification})`);
    justification.push(`Total Risk Score: ${Math.round(totalScore)}/100 (Confidence: ${confidenceLevel})`);
    
    // Risk score breakdown
    if (components.baseRisk > 0) {
      justification.push(`• Base Risk (${vendor.riskClassification}): +${components.baseRisk} points`);
    }
    
    if (components.dataExposureRisk > 0) {
      const dataType = this.categorizeDataSensitivity(vendor.useCase);
      justification.push(`• Data Exposure Risk (${dataType}): +${components.dataExposureRisk} points`);
    }
    
    if (components.userScaleRisk > 0) {
      const userCategory = this.categorizeUserScale(vendor.numberOfUsers);
      justification.push(`• User Scale Risk (${userCategory}): +${components.userScaleRisk} points`);
    }
    
    if (components.securityPostureRisk > 0) {
      if (securityScorecard) {
        justification.push(`• Security Posture Risk (Grade ${securityScorecard.letterGrade}): +${components.securityPostureRisk} points`);
      } else {
        justification.push(`• Security Posture Risk (Unknown): +${components.securityPostureRisk} points`);
      }
    }
    
    if (components.complianceRisk > 0) {
      justification.push(`• Compliance Risk (Missing certifications): +${components.complianceRisk} points`);
    }
    
    if (components.publicIssueRisk > 0) {
      const issueCount = this.countPublicIssues(publicIssues);
      justification.push(`• Public Security Issues (${issueCount} identified): +${components.publicIssueRisk} points`);
    }
    
    if (components.mitigationCredit > 0) {
      justification.push(`• Risk Mitigation Credit: -${components.mitigationCredit} points`);
    }
    
    // Escalation reasons
    if (escalationReasons.length > 0) {
      justification.push('\nRisk Escalation Factors:');
      escalationReasons.forEach(reason => justification.push(`• ${reason}`));
    }
    
    // Mitigation factors
    if (mitigationFactors.length > 0) {
      justification.push('\nRisk Mitigation Factors:');
      mitigationFactors.forEach(factor => justification.push(`• ${factor}`));
    }
    
    // Detailed findings
    justification.push('\nDetailed Security Assessment:');
    
    if (securityScorecard) {
      justification.push(`• SecurityScorecard: ${securityScorecard.score}/100 (Grade ${securityScorecard.letterGrade})`);
    } else {
      justification.push('• SecurityScorecard: Not available - increases assessment uncertainty');
    }
    
    // Compliance status
    const complianceItems: string[] = [];
    if (documentation.soc2Type2Available) complianceItems.push('SOC 2 Type 2');
    if (documentation.iso27001Available) complianceItems.push('ISO 27001');
    
    if (complianceItems.length > 0) {
      justification.push(`• Compliance Certifications: ${complianceItems.join(', ')}`);
    } else {
      justification.push('• Compliance Certifications: None verified');
    }
    
    // Public issues summary
    if (publicIssues.dataBreaches.length > 0) {
      justification.push(`• Data Breaches: ${publicIssues.dataBreaches.length} identified`);
    }
    
    if (publicIssues.vulnerabilities.length > 0) {
      const criticalVulns = publicIssues.vulnerabilities.filter(v => v.severity.toLowerCase() === 'critical').length;
      const highVulns = publicIssues.vulnerabilities.filter(v => v.severity.toLowerCase() === 'high').length;
      justification.push(`• Vulnerabilities: ${publicIssues.vulnerabilities.length} total (${criticalVulns} Critical, ${highVulns} High)`);
    }
    
    return justification;
  }

  private categorizeDataSensitivity(useCase: string): string {
    const lowerCase = useCase.toLowerCase();
    
    if (['pii', 'personal', 'financial', 'payment', 'healthcare', 'medical', 'phi', 'hipaa'].some(keyword => lowerCase.includes(keyword))) {
      return 'Highly Sensitive';
    }
    
    if (['employee', 'customer', 'contact', 'email', 'phone', 'address'].some(keyword => lowerCase.includes(keyword))) {
      return 'Moderately Sensitive';
    }
    
    return 'General Business Data';
  }

  private categorizeUserScale(userCount: number): string {
    if (userCount >= RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD) return 'Enterprise Scale (1000+ users)';
    if (userCount >= RISK_THRESHOLDS.HIGH_USER_THRESHOLD) return 'Departmental Scale (50-999 users)';
    if (userCount >= RISK_THRESHOLDS.MEDIUM_USER_THRESHOLD) return 'Team Scale (10-49 users)';
    return 'Individual/Small Team (<10 users)';
  }

  private determineApprovalStatus(assessment: VendorAssessment): void {
    const determination = assessment.riskDetermination;

    // Perform comprehensive approval analysis
    const approvalAnalysis = this.performApprovalAnalysis(assessment);
    
    // Set approval status and detailed explanations
    determination.approvalStatus = approvalAnalysis.status;
    determination.conditions = approvalAnalysis.conditions;
    determination.remediationRequired = approvalAnalysis.remediationRequired;
    
    // Add detailed contextual explanations
    determination.justification.push(...this.generateApprovalContextExplanation(assessment, approvalAnalysis));
  }

  private performApprovalAnalysis(assessment: VendorAssessment): {
    status: ApprovalStatus;
    conditions: string[];
    remediationRequired: string[];
    blockingIssues: string[];
    riskFactors: string[];
    mitigatingFactors: string[];
  } {
    const { vendor, securityScorecard, documentation, publicIssues } = assessment;
    const { finalRiskLevel } = assessment.riskDetermination;

    const analysis = {
      status: ApprovalStatus.APPROVED,
      conditions: [] as string[],
      remediationRequired: [] as string[],
      blockingIssues: [] as string[],
      riskFactors: [] as string[],
      mitigatingFactors: [] as string[]
    };

    // Analyze compliance requirements by risk level
    this.analyzeComplianceRequirements(finalRiskLevel, documentation, analysis);
    
    // Analyze security posture requirements
    this.analyzeSecurityPostureRequirements(finalRiskLevel, securityScorecard || null, analysis);
    
    // Analyze public security issues
    this.analyzePublicSecurityIssues(publicIssues, analysis);
    
    // Check for additional risk factors
    this.analyzeAdditionalRiskFactors(vendor, analysis);
    
    // Identify mitigation factors
    this.identifyMitigatingFactors(documentation, securityScorecard || null, analysis);
    
    // Determine final status based on analysis
    if (analysis.blockingIssues.length > 0 || analysis.remediationRequired.length > 0) {
      analysis.status = ApprovalStatus.REJECTED;
    } else if (analysis.conditions.length > 0) {
      analysis.status = ApprovalStatus.CONDITIONALLY_APPROVED;
    } else {
      analysis.status = ApprovalStatus.APPROVED;
    }

    return analysis;
  }

  private analyzeComplianceRequirements(
    riskLevel: RiskLevel, 
    documentation: SecurityDocumentation, 
    analysis: any
  ): void {
    
    switch (riskLevel) {
      case RiskLevel.CRITICAL:
        if (!documentation.soc2Type2Available && !documentation.iso27001Available) {
          analysis.remediationRequired.push(
            'Critical vendors require SOC 2 Type 2 or ISO 27001 certification to demonstrate comprehensive security controls'
          );
          analysis.blockingIssues.push('Missing mandatory compliance certification for Critical risk level');
        }
        
        if (!documentation.complementaryUserEntityControls || documentation.complementaryUserEntityControls.length === 0) {
          analysis.conditions.push(
            'Provide documented Complementary User Entity Controls (CUECs) that define security responsibilities for both parties'
          );
        }
        break;
        
      case RiskLevel.HIGH:
        if (!documentation.soc2Type2Available && !documentation.trustCenterUrl && !documentation.securityPageUrl) {
          analysis.conditions.push(
            'Provide SOC 2 Type 2 certification, security attestation, or comprehensive security documentation within 30 days'
          );
        }
        
        if (!documentation.privacyPolicyUrl) {
          analysis.conditions.push('Provide privacy policy demonstrating commitment to data protection');
        }
        break;
        
      case RiskLevel.MEDIUM:
        if (!documentation.trustCenterUrl && !documentation.securityPageUrl && !documentation.privacyPolicyUrl) {
          analysis.conditions.push('Provide basic security documentation or privacy policy');
        }
        break;
        
      case RiskLevel.LOW:
        // Low risk vendors have minimal documentation requirements
        break;
    }
  }

  private analyzeSecurityPostureRequirements(
    riskLevel: RiskLevel, 
    scorecard: SecurityScorecard | null, 
    analysis: any
  ): void {
    if (!scorecard) {
      analysis.riskFactors.push('SecurityScorecard not available - limits visibility into security posture');
      
      if (riskLevel === RiskLevel.CRITICAL || riskLevel === RiskLevel.HIGH) {
        analysis.conditions.push('Provide alternative security assessment or scorecard due to high risk classification');
      }
      return;
    }

    const grade = scorecard.letterGrade;
    
    switch (riskLevel) {
      case RiskLevel.CRITICAL:
        if (grade > 'B') {
          analysis.remediationRequired.push(
            `Critical vendors require SecurityScorecard grade B or higher (current: ${grade}). This grade indicates security control deficiencies that pose unacceptable risk for critical use cases.`
          );
          analysis.blockingIssues.push(`SecurityScorecard grade ${grade} below required B for Critical vendors`);
        } else {
          analysis.mitigatingFactors.push(`Strong security posture confirmed (SecurityScorecard grade ${grade})`);
        }
        break;
        
      case RiskLevel.HIGH:
        if (grade >= 'D') {
          analysis.conditions.push(
            `Improve SecurityScorecard rating to C or higher (current: ${grade}) within 90 days, or provide remediation plan for identified security gaps`
          );
          analysis.riskFactors.push(`Below-average security score (${grade}) requires monitoring and improvement`);
        } else {
          analysis.mitigatingFactors.push(`Acceptable security posture (SecurityScorecard grade ${grade})`);
        }
        break;
        
      case RiskLevel.MEDIUM:
        if (grade === 'F') {
          analysis.conditions.push(`Very poor security score (${grade}) requires improvement plan despite medium risk level`);
        }
        break;
        
      case RiskLevel.LOW:
        if (grade === 'F') {
          analysis.riskFactors.push(`Poor security score (${grade}) noted for monitoring`);
        }
        break;
    }
    
    // Special handling for F grade
    if (grade === 'F') {
      analysis.remediationRequired.push(
        'SecurityScorecard grade F indicates critical security deficiencies that require immediate attention regardless of risk level'
      );
      analysis.blockingIssues.push('Grade F security score indicates unacceptable risk');
    }
  }

  private analyzePublicSecurityIssues(issues: PublicSecurityIssues, analysis: any): void {
    // Analyze data breaches
    if (issues.dataBreaches.length > 0) {
      const recentBreaches = issues.dataBreaches.filter(breach => {
        const breachDate = new Date(breach.date);
        const yearAgo = new Date();
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        return breachDate > yearAgo;
      });
      
      if (recentBreaches.length > 0) {
        analysis.remediationRequired.push(
          `Recent data breach within past 12 months demonstrates active security risks. Vendor must provide incident response report and remediation evidence.`
        );
        analysis.blockingIssues.push('Recent data breach indicates active security risks');
      } else {
        analysis.riskFactors.push(
          `Historical data breaches identified (${issues.dataBreaches.length} total) - requires ongoing monitoring`
        );
      }
    }
    
    // Analyze vulnerabilities
    const criticalVulns = issues.vulnerabilities.filter(v => v.severity.toLowerCase() === 'critical').length;
    const highVulns = issues.vulnerabilities.filter(v => v.severity.toLowerCase() === 'high').length;
    
    if (criticalVulns > 0) {
      analysis.remediationRequired.push(
        `${criticalVulns} critical vulnerabilities identified. Vendor must provide evidence of patching and vulnerability management processes.`
      );
      analysis.blockingIssues.push('Unaddressed critical vulnerabilities present significant risk');
    }
    
    if (highVulns > 0) {
      analysis.conditions.push(
        `Address ${highVulns} high-severity vulnerabilities and provide vulnerability management plan within 60 days`
      );
    }
    
    // Analyze negative news
    if (issues.negativeNews.length > 0) {
      analysis.riskFactors.push(
        `${issues.negativeNews.length} negative security-related news items identified - indicates potential security culture issues`
      );
    }
  }

  private analyzeAdditionalRiskFactors(vendor: VendorInput, analysis: any): void {
    // Large user scale with sensitive data
    if (vendor.sharesSensitiveData && vendor.numberOfUsers >= RISK_THRESHOLDS.CRITICAL_DATA_THRESHOLD) {
      analysis.riskFactors.push(
        `Large-scale sensitive data exposure (${vendor.numberOfUsers} users) requires enhanced monitoring and controls`
      );
    }
    
    // High-risk use cases
    const useCase = vendor.useCase.toLowerCase();
    const highRiskKeywords = ['integration', 'api', 'database', 'backup', 'admin', 'privileged'];
    
    if (highRiskKeywords.some(keyword => useCase.includes(keyword))) {
      analysis.riskFactors.push(
        'Use case involves privileged access or deep integration - requires enhanced access controls'
      );
    }
  }

  private identifyMitigatingFactors(
    documentation: SecurityDocumentation, 
    scorecard: SecurityScorecard | null, 
    analysis: any
  ): void {
    if (documentation.soc2Type2Available) {
      analysis.mitigatingFactors.push(
        'SOC 2 Type 2 certification demonstrates audited security controls and processes'
      );
    }
    
    if (documentation.iso27001Available) {
      analysis.mitigatingFactors.push(
        'ISO 27001 certification shows comprehensive information security management system'
      );
    }
    
    if (scorecard && ['A', 'B'].includes(scorecard.letterGrade)) {
      analysis.mitigatingFactors.push(
        `Strong security posture confirmed by independent assessment (SecurityScorecard grade ${scorecard.letterGrade})`
      );
    }
    
    if (documentation.trustCenterUrl) {
      analysis.mitigatingFactors.push(
        'Dedicated security transparency center demonstrates commitment to security communication'
      );
    }
    
    if (documentation.complementaryUserEntityControls && documentation.complementaryUserEntityControls.length > 0) {
      analysis.mitigatingFactors.push(
        'Documented complementary controls provide clear guidance for shared security responsibilities'
      );
    }
  }

  private generateApprovalContextExplanation(
    assessment: VendorAssessment, 
    analysis: any
  ): string[] {
    const explanations: string[] = [];
    const { vendor } = assessment;
    const approvalContexts = {
      [ApprovalStatus.APPROVED]: {
        meaning: 'The vendor meets all security requirements for the specified risk level and can be onboarded immediately.',
        nextSteps: [
          'Proceed with contract negotiation including security terms',
          'Ensure security requirements are included in service agreement',
          'Implement access controls and monitoring',
          'Schedule periodic security reviews'
        ]
      },
      [ApprovalStatus.CONDITIONALLY_APPROVED]: {
        meaning: 'The vendor shows acceptable security posture but requires specific conditions to be met before full approval.',
        nextSteps: [
          'Contact vendor to fulfill specified requirements',
          'Obtain missing security documentation or attestations',
          'Implement additional monitoring during conditional period',
          'Review compliance with conditions before full deployment'
        ]
      },
      [ApprovalStatus.REJECTED]: {
        meaning: 'The vendor does not meet minimum security requirements and poses unacceptable risk to the organization.',
        nextSteps: [
          'Consider approved alternatives that meet security requirements',
          'Re-evaluate business requirements and risk tolerance',
          'Engage with IT Security for consultation on alternatives',
          'If vendor is still preferred, work with them on security improvements'
        ]
      }
    };
    const context = approvalContexts[analysis.status as keyof typeof approvalContexts];

    // Add decision context
    explanations.push(`\nAPPROVAL DECISION: ${analysis.status}`);
    explanations.push(`Decision Rationale: ${context.meaning}`);
    
    // Add risk level context
    const riskCriteria = RISK_CRITERIA[assessment.riskDetermination.finalRiskLevel];
    explanations.push(`\nRisk Level Analysis:`);
    explanations.push(`• ${assessment.riskDetermination.finalRiskLevel} Risk: ${riskCriteria.description}`);
    
    // Add use case analysis
    const dataCategory = this.categorizeDataSensitivity(vendor.useCase);
    const userScale = this.categorizeUserScale(vendor.numberOfUsers);
    explanations.push(`• Data Sensitivity: ${dataCategory}`);
    explanations.push(`• User Scale: ${userScale}`);
    
    // Add blocking issues if any
    if (analysis.blockingIssues.length > 0) {
      explanations.push(`\nBlocking Issues:`);
      analysis.blockingIssues.forEach((issue: string) => {
        explanations.push(`• ${issue}`);
      });
    }
    
    // Add risk factors
    if (analysis.riskFactors.length > 0) {
      explanations.push(`\nKey Risk Factors:`);
      analysis.riskFactors.forEach((factor: string) => {
        explanations.push(`• ${factor}`);
      });
    }
    
    // Add mitigating factors
    if (analysis.mitigatingFactors.length > 0) {
      explanations.push(`\nMitigating Factors:`);
      analysis.mitigatingFactors.forEach((factor: string) => {
        explanations.push(`• ${factor}`);
      });
    }
    
    // Add specific guidance based on decision
    explanations.push(`\nNext Steps:`);
    context.nextSteps.forEach((step: string) => {
      explanations.push(`• ${step}`);
    });
    
    // Add compliance framework guidance
    explanations.push(`\nCompliance Requirements for ${assessment.riskDetermination.finalRiskLevel} Risk Level:`);
    riskCriteria.requirements.forEach(req => {
      explanations.push(`• ${req}`);
    });
    
    return explanations;
  }

  private countPublicIssues(issues: PublicSecurityIssues): number {
    return issues.dataBreaches.length + 
           issues.vulnerabilities.length + 
           issues.negativeNews.length;
  }

  // Additional method to provide detailed vendor assessment summary
  public generateAssessmentSummary(assessment: VendorAssessment): {
    riskScore: number;
    confidenceLevel: string;
    keyFindings: string[];
    recommendations: string[];
  } {
    const detailedAssessment = this.performDetailedRiskScoring(assessment);
    
    const keyFindings: string[] = [];
    const recommendations: string[] = [];
    
    // Generate key findings
    if (assessment.securityScorecard) {
      keyFindings.push(`Security posture grade: ${assessment.securityScorecard.letterGrade}`);
    }
    
    if (assessment.documentation.soc2Type2Available || assessment.documentation.iso27001Available) {
      const certs = [];
      if (assessment.documentation.soc2Type2Available) certs.push('SOC 2 Type 2');
      if (assessment.documentation.iso27001Available) certs.push('ISO 27001');
      keyFindings.push(`Compliance certifications: ${certs.join(', ')}`);
    }
    
    const publicIssueCount = this.countPublicIssues(assessment.publicIssues);
    if (publicIssueCount > 0) {
      keyFindings.push(`Public security issues identified: ${publicIssueCount}`);
    }
    
    // Generate recommendations
    switch (assessment.riskDetermination.approvalStatus) {
      case ApprovalStatus.APPROVED:
        recommendations.push('Proceed with onboarding and implement standard monitoring');
        recommendations.push('Include security requirements in contract terms');
        break;
      case ApprovalStatus.CONDITIONALLY_APPROVED:
        recommendations.push('Complete conditional requirements before full deployment');
        recommendations.push('Implement enhanced monitoring during conditional period');
        break;
      case ApprovalStatus.REJECTED:
        recommendations.push('Consider approved alternatives or work with vendor on security improvements');
        recommendations.push('Re-assess after vendor addresses identified security gaps');
        break;
    }
    
    return {
      riskScore: Math.round(detailedAssessment.totalScore),
      confidenceLevel: detailedAssessment.confidenceLevel,
      keyFindings,
      recommendations
    };
  }
}