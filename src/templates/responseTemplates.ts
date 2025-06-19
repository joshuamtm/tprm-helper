import { VendorAssessment, ApprovalStatus, RiskLevel } from '../types';
import { TEMPLATE_MESSAGES } from '../utils/constants';

export class ResponseTemplateGenerator {
  generateResponse(assessment: VendorAssessment): string {
    const { approvalStatus } = assessment.riskDetermination;
    
    switch (approvalStatus) {
      case ApprovalStatus.APPROVED:
        return this.generateBusinessApprovalResponse(assessment);
      case ApprovalStatus.CONDITIONALLY_APPROVED:
        return this.generateBusinessConditionalResponse(assessment);
      case ApprovalStatus.REJECTED:
        return this.generateBusinessRejectionResponse(assessment);
      default:
        return this.generateBusinessRejectionResponse(assessment);
    }
  }


  generateCriticalVendorRequest(assessment: VendorAssessment): string {
    const { vendor } = assessment;
    const template = TEMPLATE_MESSAGES.critical;
    
    let message = `**Subject:** ${template.subject.replace('{vendorName}', vendor.vendorName)}\n\n`;
    message += `${template.opening.replace('{vendorName}', vendor.vendorName)}\n\n`;
    
    message += `**Critical Vendor Requirements:**\n`;
    message += `Due to the critical nature of this vendor relationship, the following enhanced security documentation is required:\n\n`;
    
    message += `1. **SOC 2 Type 2 Report** (required)\n`;
    message += `2. **ISO 27001 Certification** (preferred)\n`;
    message += `3. **Penetration Testing Report** (last 12 months)\n`;
    message += `4. **Security Architecture Documentation**\n`;
    message += `5. **Incident Response Plan**\n`;
    message += `6. **Business Continuity/Disaster Recovery Plan**\n`;
    message += `7. **Data Processing Agreement (DPA)**\n`;
    message += `8. **Complementary User Entity Controls Documentation**\n\n`;
    
    message += `**Additional Requirements:**\n`;
    message += `- Executive sponsor approval required\n`;
    message += `- Quarterly security reviews\n`;
    message += `- Right to audit clause in contract\n`;
    message += `- Cyber insurance verification\n`;
    message += `- Security incident notification within 24 hours\n\n`;
    
    message += `**Timeline:** All documentation must be provided within 14 days\n`;
    message += `\nPlease coordinate with the Security team to schedule the enhanced review.\n`;
    
    return message;
  }

  private countIssues(issues: any): number {
    return (issues.dataBreaches?.length || 0) + 
           (issues.vulnerabilities?.length || 0) + 
           (issues.negativeNews?.length || 0);
  }

  // Business-focused response methods
  private generateBusinessApprovalResponse(assessment: VendorAssessment): string {
    const { vendor, securityScorecard } = assessment;
    
    let response = `# VENDOR ASSESSMENT RESULT\n\n`;
    response += `## 🟢 APPROVED\n\n`;
    response += `**Vendor:** ${vendor.vendorName}\n`;
    response += `**Decision:** Approved for use\n`;
    response += `**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n\n`;
    
    response += `### Rationale\n`;
    response += `${vendor.vendorName} has been approved based on the following factors:\n\n`;
    
    if (securityScorecard && securityScorecard.letterGrade <= 'B') {
      response += `✓ Strong security posture (SecurityScorecard: ${securityScorecard.letterGrade})\n`;
    }
    
    if (assessment.documentation.soc2Type2Available) {
      response += `✓ SOC 2 Type 2 certification verified\n`;
    }
    
    if (assessment.documentation.iso27001Available) {
      response += `✓ ISO 27001 certification verified\n`;
    }
    
    if (this.countIssues(assessment.publicIssues) === 0) {
      response += `✓ No significant public security issues identified\n`;
    }
    
    response += `✓ Meets security requirements for ${vendor.riskClassification.toLowerCase()} risk classification\n\n`;
    
    response += `### Next Steps\n`;
    response += `1. **Proceed with vendor onboarding** - You may begin using this vendor\n`;
    response += `2. **Contract review** - Ensure security requirements are included in the vendor agreement\n`;
    response += `3. **Implementation planning** - Work with IT to set up secure integration\n`;
    
    if (vendor.riskClassification === RiskLevel.CRITICAL) {
      response += `4. **Implement user entity controls** - Critical vendors require additional oversight\n`;
      response += `5. **Schedule quarterly reviews** - Ongoing monitoring required\n`;
    } else {
      response += `4. **Schedule annual review** - Set reminder for next year's assessment\n`;
    }
    
    response += `\n### Contact\n`;
    response += `For implementation support, contact the IT Security team.\n`;
    
    return response;
  }

  private generateBusinessConditionalResponse(assessment: VendorAssessment): string {
    const { vendor, riskDetermination } = assessment;
    
    let response = `# VENDOR ASSESSMENT RESULT\n\n`;
    response += `## 🟡 CONDITIONALLY APPROVED\n\n`;
    response += `**Vendor:** ${vendor.vendorName}\n`;
    response += `**Decision:** Conditionally approved with requirements\n`;
    response += `**Timeline:** 30 days to complete requirements\n`;
    response += `**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n\n`;
    
    response += `### Rationale\n`;
    response += `${vendor.vendorName} can be approved, but the following requirements must be completed first:\n\n`;
    
    if (riskDetermination.conditions && riskDetermination.conditions.length > 0) {
      riskDetermination.conditions.forEach((condition, index) => {
        response += `${index + 1}. ${condition}\n`;
      });
    }
    
    response += `\n### What This Means\n`;
    response += `• **Limited use permitted** - You may begin limited testing/evaluation\n`;
    response += `• **Full deployment restricted** - Wait for final approval before full rollout\n`;
    response += `• **30-day deadline** - All requirements must be met within 30 days\n\n`;
    
    response += `### Next Steps\n`;
    response += `1. **Contact the vendor** - Share the requirements listed above\n`;
    response += `2. **Obtain required documentation** - Work with vendor to provide missing items\n`;
    response += `3. **Submit for final review** - Send completed documentation to IT Security\n`;
    response += `4. **Await final approval** - Full approval will be granted once requirements are met\n\n`;
    
    response += `### Support\n`;
    response += `The IT Security team will assist with vendor communication and requirement verification.\n`;
    
    return response;
  }

  private generateBusinessRejectionResponse(assessment: VendorAssessment): string {
    const { vendor, riskDetermination } = assessment;
    
    let response = `# VENDOR ASSESSMENT RESULT\n\n`;
    response += `## 🔴 NOT APPROVED\n\n`;
    response += `**Vendor:** ${vendor.vendorName}\n`;
    response += `**Decision:** Rejected - Does not meet security requirements\n`;
    response += `**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n\n`;
    
    response += `### Rationale\n`;
    response += `${vendor.vendorName} cannot be approved for the following reasons:\n\n`;
    
    if (riskDetermination.remediationRequired && riskDetermination.remediationRequired.length > 0) {
      riskDetermination.remediationRequired.forEach((issue, index) => {
        response += `${index + 1}. ${issue}\n`;
      });
    }
    
    response += `\n### Alternative Solutions\n`;
    response += `Consider these approved alternatives:\n\n`;
    
    // Suggest alternatives based on use case
    const alternatives = this.suggestAlternatives(vendor.useCase, vendor.riskClassification);
    alternatives.forEach((alt, index) => {
      response += `**Option ${index + 1}: ${alt.name}**\n`;
      response += `- ${alt.description}\n`;
      response += `- Status: ${alt.status}\n\n`;
    });
    
    response += `### Next Steps\n`;
    response += `1. **Review alternatives** - Evaluate the suggested solutions above\n`;
    response += `2. **Business requirements review** - Consider if requirements can be modified\n`;
    response += `3. **Vendor improvement path** - The vendor may reapply after addressing security issues\n`;
    response += `4. **Escalation available** - Contact IT Security leadership if critical business need exists\n\n`;
    
    response += `### Support\n`;
    response += `The IT Security team can provide detailed vendor comparison and implementation guidance.\n`;
    
    return response;
  }

  private suggestAlternatives(useCase: string, _riskLevel: RiskLevel): Array<{name: string, description: string, status: string}> {
    const lowerUseCase = useCase.toLowerCase();
    
    // Common alternatives based on use case patterns
    if (lowerUseCase.includes('cloud') || lowerUseCase.includes('storage')) {
      return [
        {
          name: 'Microsoft OneDrive for Business',
          description: 'Enterprise cloud storage with strong security controls',
          status: 'Pre-approved for all risk levels'
        },
        {
          name: 'Google Workspace',
          description: 'Collaborative cloud platform with comprehensive security',
          status: 'Pre-approved for high/medium/low risk'
        },
        {
          name: 'Box Enterprise',
          description: 'Secure content management platform',
          status: 'Pre-approved with SOC 2 Type 2'
        }
      ];
    }
    
    if (lowerUseCase.includes('communication') || lowerUseCase.includes('video') || lowerUseCase.includes('meeting')) {
      return [
        {
          name: 'Microsoft Teams',
          description: 'Enterprise communication and collaboration platform',
          status: 'Pre-approved for all risk levels'
        },
        {
          name: 'Zoom Enterprise',
          description: 'Video conferencing with enterprise security features',
          status: 'Pre-approved for medium/low risk'
        },
        {
          name: 'Cisco Webex',
          description: 'Secure video conferencing and collaboration',
          status: 'Pre-approved for high/medium/low risk'
        }
      ];
    }
    
    if (lowerUseCase.includes('analytics') || lowerUseCase.includes('data') || lowerUseCase.includes('reporting')) {
      return [
        {
          name: 'Microsoft Power BI',
          description: 'Business analytics platform with enterprise security',
          status: 'Pre-approved for all risk levels'
        },
        {
          name: 'Tableau Enterprise',
          description: 'Data visualization with strong governance controls',
          status: 'Pre-approved for high/medium/low risk'
        },
        {
          name: 'AWS QuickSight',
          description: 'Cloud-native business intelligence service',
          status: 'Pre-approved with proper configuration'
        }
      ];
    }
    
    // Default alternatives for unknown use cases
    return [
      {
        name: 'Contact IT Security',
        description: 'We can help identify pre-approved alternatives for your specific needs',
        status: 'Consultation available'
      },
      {
        name: 'Internal Solution',
        description: 'Consider if this functionality can be provided through existing tools',
        status: 'Assessment available'
      },
      {
        name: 'Delayed Implementation',
        description: 'Wait for vendor to improve security posture and reapply',
        status: '90-day reassessment available'
      }
    ];
  }
}