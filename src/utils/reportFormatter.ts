import { VendorAssessment } from '../types';
import chalk from 'chalk';

export class ReportFormatter {
  formatAssessmentReport(assessment: VendorAssessment, includeTemplate: boolean = true): string {
    let report = '';
    
    // Risk Determination Summary
    report += this.formatRiskSummary(assessment);
    report += '\n\n';
    
    // Response Message
    if (includeTemplate) {
      report += this.formatResponseSection(assessment);
    }
    
    return report;
  }

  private formatRiskSummary(assessment: VendorAssessment): string {
    const { securityScorecard, documentation, publicIssues, riskDetermination } = assessment;
    
    let summary = '## Risk Determination Summary\n\n';
    
    // SecurityScorecard Rating
    if (securityScorecard) {
      summary += `- **SecurityScorecard rating:** ${securityScorecard.score} (${securityScorecard.letterGrade}) - [View Report](${securityScorecard.url})\n`;
    } else {
      summary += `- **SecurityScorecard rating:** INSUFFICIENT DATA - Unable to retrieve rating\n`;
    }
    
    // Certifications
    summary += `- **SOC 2 Type 2:** ${documentation.soc2Type2Available ? '✓ Available' : '✗ Not confirmed'}`;
    if (documentation.soc2Type2Url) {
      summary += ` - [View](${documentation.soc2Type2Url})`;
    }
    summary += '\n';
    
    summary += `- **ISO 27001:** ${documentation.iso27001Available ? '✓ Available' : '✗ Not confirmed'}`;
    if (documentation.iso27001Url) {
      summary += ` - [View](${documentation.iso27001Url})`;
    }
    summary += '\n';
    
    // Trust Center
    if (documentation.trustCenterUrl) {
      summary += `- **Trust Center:** [${documentation.trustCenterUrl}](${documentation.trustCenterUrl})\n`;
    } else {
      summary += `- **Trust Center:** Not found\n`;
    }
    
    // Public Security Issues
    const issueCount = this.countTotalIssues(publicIssues);
    if (issueCount > 0) {
      summary += `- **Public security issues:** ${issueCount} concern(s) identified\n`;
      
      if (publicIssues.dataBreaches.length > 0) {
        summary += `  - ${publicIssues.dataBreaches.length} data breach(es)\n`;
      }
      if (publicIssues.vulnerabilities.length > 0) {
        const critical = publicIssues.vulnerabilities.filter(v => v.severity === 'Critical' || v.severity === 'High').length;
        summary += `  - ${publicIssues.vulnerabilities.length} vulnerabilities (${critical} high/critical)\n`;
      }
      if (publicIssues.negativeNews.length > 0) {
        summary += `  - ${publicIssues.negativeNews.length} negative news article(s)\n`;
      }
    } else {
      summary += `- **Public security issues:** None identified\n`;
    }
    
    // Risk Classification
    summary += `- **Risk classification:** ${riskDetermination.finalRiskLevel} with justification:\n`;
    riskDetermination.justification.forEach(item => {
      summary += `  - ${item}\n`;
    });
    
    // Approval Status
    summary += `- **Approval status:** ${riskDetermination.approvalStatus}\n`;
    
    if (riskDetermination.remediationRequired && riskDetermination.remediationRequired.length > 0) {
      summary += `  - Remediation required:\n`;
      riskDetermination.remediationRequired.forEach(item => {
        summary += `    - ${item}\n`;
      });
    }
    
    if (riskDetermination.conditions && riskDetermination.conditions.length > 0) {
      summary += `  - Conditions for approval:\n`;
      riskDetermination.conditions.forEach(item => {
        summary += `    - ${item}\n`;
      });
    }
    
    return summary;
  }

  private formatResponseSection(_assessment: VendorAssessment): string {
    return '## Response Message\n\n[See template below]\n';
  }

  formatConsoleOutput(assessment: VendorAssessment): void {
    const { vendor, riskDetermination, securityScorecard } = assessment;
    
    console.log('\n' + chalk.bold.underline('TPRM Assessment Complete'));
    console.log(chalk.gray('─'.repeat(50)));
    
    // Vendor Info
    console.log(chalk.bold('Vendor:') + ` ${vendor.vendorName}`);
    console.log(chalk.bold('Risk Level:') + ` ${this.colorizeRiskLevel(riskDetermination.finalRiskLevel)}`);
    console.log(chalk.bold('Approval Status:') + ` ${this.colorizeApprovalStatus(riskDetermination.approvalStatus)}`);
    
    // Security Score
    if (securityScorecard) {
      console.log(chalk.bold('SecurityScorecard:') + ` ${securityScorecard.score} (${this.colorizeGrade(securityScorecard.letterGrade)})`);
    }
    
    console.log(chalk.gray('─'.repeat(50)));
  }

  private colorizeRiskLevel(level: string): string {
    switch (level) {
      case 'Critical':
        return chalk.red.bold(level);
      case 'High':
        return chalk.red(level);
      case 'Medium':
        return chalk.yellow(level);
      case 'Low':
        return chalk.green(level);
      default:
        return level;
    }
  }

  private colorizeApprovalStatus(status: string): string {
    switch (status) {
      case 'Approved':
        return chalk.green.bold(status);
      case 'Conditionally Approved':
        return chalk.yellow(status);
      case 'Rejected':
        return chalk.red.bold(status);
      default:
        return status;
    }
  }

  private colorizeGrade(grade: string): string {
    switch (grade) {
      case 'A':
        return chalk.green.bold(grade);
      case 'B':
        return chalk.green(grade);
      case 'C':
        return chalk.yellow(grade);
      case 'D':
        return chalk.red(grade);
      case 'F':
        return chalk.red.bold(grade);
      default:
        return grade;
    }
  }

  private countTotalIssues(issues: any): number {
    return (issues.dataBreaches?.length || 0) + 
           (issues.vulnerabilities?.length || 0) + 
           (issues.negativeNews?.length || 0);
  }
}