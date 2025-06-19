import { VendorAssessment, ApprovalStatus, RiskLevel } from '../types';
import { TEMPLATE_MESSAGES } from '../utils/constants';

export class ResponseTemplateGenerator {
  generateResponse(assessment: VendorAssessment): string {
    const { approvalStatus } = assessment.riskDetermination;
    
    switch (approvalStatus) {
      case ApprovalStatus.APPROVED:
        return this.generateApprovalTemplate(assessment);
      case ApprovalStatus.CONDITIONALLY_APPROVED:
        return this.generateConditionalTemplate(assessment);
      case ApprovalStatus.REJECTED:
        return this.generateRejectionTemplate(assessment);
      default:
        return this.generateRejectionTemplate(assessment);
    }
  }

  private generateApprovalTemplate(assessment: VendorAssessment): string {
    const { vendor, securityScorecard, documentation } = assessment;
    const template = TEMPLATE_MESSAGES.approval;
    
    let message = `**Subject:** ${template.subject.replace('{vendorName}', vendor.vendorName)}\n\n`;
    message += `${template.opening.replace('{vendorName}', vendor.vendorName)}\n\n`;
    
    message += `**Assessment Summary:**\n`;
    message += `- **Vendor:** ${vendor.vendorName}\n`;
    message += `- **Risk Classification:** ${vendor.riskClassification}\n`;
    message += `- **Number of Users:** ${vendor.numberOfUsers}\n`;
    message += `- **Use Case:** ${vendor.useCase}\n`;
    message += `- **Sensitive Data Access:** ${vendor.sharesSensitiveData ? 'Yes' : 'No'}\n\n`;
    
    message += `**Security Findings:**\n`;
    if (securityScorecard) {
      message += `- **SecurityScorecard Rating:** ${securityScorecard.score} (${securityScorecard.letterGrade}) - [View Report](${securityScorecard.url})\n`;
    }
    
    if (documentation.soc2Type2Available) {
      message += `- **SOC 2 Type 2:** ✓ Available${documentation.soc2Type2Url ? ` - [View](${documentation.soc2Type2Url})` : ''}\n`;
    }
    
    if (documentation.iso27001Available) {
      message += `- **ISO 27001:** ✓ Available${documentation.iso27001Url ? ` - [View](${documentation.iso27001Url})` : ''}\n`;
    }
    
    if (documentation.trustCenterUrl) {
      message += `- **Trust Center:** [${documentation.trustCenterUrl}](${documentation.trustCenterUrl})\n`;
    }
    
    message += `\n**Next Steps:**\n`;
    message += `1. Proceed with vendor onboarding process\n`;
    message += `2. Ensure contractual security requirements are included\n`;
    message += `3. Schedule annual security review\n`;
    
    if (vendor.riskClassification === RiskLevel.CRITICAL && documentation.complementaryUserEntityControls) {
      message += `\n**Required Complementary User Entity Controls:**\n`;
      documentation.complementaryUserEntityControls.forEach((control, index) => {
        message += `${index + 1}. ${control}\n`;
      });
    }
    
    message += `\n**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n`;
    message += `\nPlease contact the Security team if you have any questions.\n`;
    
    return message;
  }

  private generateConditionalTemplate(assessment: VendorAssessment): string {
    const { vendor, securityScorecard, documentation, riskDetermination } = assessment;
    const template = TEMPLATE_MESSAGES.conditional;
    
    let message = `**Subject:** ${template.subject.replace('{vendorName}', vendor.vendorName)}\n\n`;
    message += `${template.opening.replace('{vendorName}', vendor.vendorName)}\n\n`;
    
    message += `**Assessment Summary:**\n`;
    message += `- **Vendor:** ${vendor.vendorName}\n`;
    message += `- **Risk Classification:** ${vendor.riskClassification}\n`;
    message += `- **Final Risk Level:** ${riskDetermination.finalRiskLevel}\n`;
    message += `- **Number of Users:** ${vendor.numberOfUsers}\n`;
    message += `- **Use Case:** ${vendor.useCase}\n\n`;
    
    message += `**Security Findings:**\n`;
    if (securityScorecard) {
      message += `- **SecurityScorecard Rating:** ${securityScorecard.score} (${securityScorecard.letterGrade})\n`;
    }
    
    message += `- **SOC 2 Type 2:** ${documentation.soc2Type2Available ? '✓ Available' : '✗ Not confirmed'}\n`;
    message += `- **ISO 27001:** ${documentation.iso27001Available ? '✓ Available' : '✗ Not confirmed'}\n`;
    
    const issueCount = this.countIssues(assessment.publicIssues);
    if (issueCount > 0) {
      message += `- **Public Security Issues:** ${issueCount} identified\n`;
    }
    
    message += `\n**Required Conditions for Full Approval:**\n`;
    if (riskDetermination.conditions && riskDetermination.conditions.length > 0) {
      riskDetermination.conditions.forEach((condition, index) => {
        message += `${index + 1}. ${condition}\n`;
      });
    }
    
    message += `\n**Timeline:** All conditions must be met within 30 days\n`;
    message += `\n**Next Steps:**\n`;
    message += `1. Vendor must address the conditions listed above\n`;
    message += `2. Submit evidence of compliance to the Security team\n`;
    message += `3. Security team will conduct final review\n`;
    message += `4. Full approval will be granted upon successful completion\n`;
    
    message += `\n**Important:** Limited use may proceed during the conditional period, but full implementation should wait until final approval.\n`;
    message += `\n**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n`;
    
    return message;
  }

  private generateRejectionTemplate(assessment: VendorAssessment): string {
    const { vendor, securityScorecard, documentation, riskDetermination, publicIssues } = assessment;
    const template = TEMPLATE_MESSAGES.rejection;
    
    let message = `**Subject:** ${template.subject.replace('{vendorName}', vendor.vendorName)}\n\n`;
    message += `${template.opening.replace('{vendorName}', vendor.vendorName)}\n\n`;
    
    message += `**Assessment Summary:**\n`;
    message += `- **Vendor:** ${vendor.vendorName}\n`;
    message += `- **Risk Classification:** ${vendor.riskClassification}\n`;
    message += `- **Final Risk Level:** ${riskDetermination.finalRiskLevel}\n`;
    message += `- **Number of Users:** ${vendor.numberOfUsers}\n`;
    message += `- **Use Case:** ${vendor.useCase}\n\n`;
    
    message += `**Security Concerns:**\n`;
    
    if (riskDetermination.remediationRequired && riskDetermination.remediationRequired.length > 0) {
      riskDetermination.remediationRequired.forEach(issue => {
        message += `- ${issue}\n`;
      });
    }
    
    if (securityScorecard && securityScorecard.letterGrade >= 'D') {
      message += `- SecurityScorecard rating of ${securityScorecard.letterGrade} indicates significant security risks\n`;
    }
    
    if (publicIssues.dataBreaches.length > 0) {
      message += `- ${publicIssues.dataBreaches.length} data breach(es) identified\n`;
    }
    
    if (publicIssues.vulnerabilities.filter(v => v.severity === 'Critical' || v.severity === 'High').length > 0) {
      message += `- Critical/High severity vulnerabilities present\n`;
    }
    
    message += `\n**Required Remediation:**\n`;
    message += `Before reconsideration, the vendor must:\n`;
    
    if (!documentation.soc2Type2Available && riskDetermination.finalRiskLevel === RiskLevel.CRITICAL) {
      message += `1. Obtain SOC 2 Type 2 or ISO 27001 certification\n`;
    }
    
    if (securityScorecard && securityScorecard.letterGrade >= 'D') {
      message += `2. Improve SecurityScorecard rating to C or higher\n`;
    }
    
    if (publicIssues.dataBreaches.length > 0) {
      message += `3. Demonstrate improved security controls post-breach\n`;
    }
    
    message += `4. Complete comprehensive security questionnaire\n`;
    message += `5. Provide detailed remediation plan with timelines\n`;
    
    message += `\n**Alternative Options:**\n`;
    message += `- Consider alternative vendors with stronger security postures\n`;
    message += `- Explore on-premises or self-hosted solutions if available\n`;
    message += `- Re-evaluate business requirements to reduce risk exposure\n`;
    
    message += `\n**Resubmission:** The vendor may be reconsidered after 90 days if all remediation requirements are met.\n`;
    message += `\n**Assessment Date:** ${assessment.assessmentDate.toLocaleDateString()}\n`;
    
    return message;
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
}