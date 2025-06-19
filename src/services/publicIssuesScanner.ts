import { PublicSecurityIssues } from '../types';

export class PublicIssuesScannerService {
  async scanForPublicIssues(vendorName: string): Promise<PublicSecurityIssues> {
    const issues: PublicSecurityIssues = {
      dataBreaches: [],
      vulnerabilities: [],
      negativeNews: []
    };

    try {
      // In a production environment, this would integrate with:
      // - CVE databases
      // - Breach notification databases
      // - News aggregation APIs
      // - Threat intelligence feeds
      
      // For demonstration, we'll use mock data based on vendor patterns
      issues.dataBreaches = await this.searchDataBreaches(vendorName);
      issues.vulnerabilities = await this.searchVulnerabilities(vendorName);
      issues.negativeNews = await this.searchNegativeNews(vendorName);
      
    } catch (error) {
      console.error(`Error scanning public issues for ${vendorName}: ${error}`);
    }

    return issues;
  }

  private async searchDataBreaches(vendorName: string): Promise<PublicSecurityIssues['dataBreaches']> {
    // Mock implementation - in production would query breach databases
    const breaches = [];
    
    // Simulate finding breaches for certain vendor name patterns
    if (vendorName.toLowerCase().includes('breach') || 
        vendorName.toLowerCase().includes('compromised')) {
      breaches.push({
        date: '2023-06-15',
        description: 'Unauthorized access to customer database affecting 10,000 users',
        source: 'HaveIBeenPwned Database'
      });
    }

    return breaches;
  }

  private async searchVulnerabilities(vendorName: string): Promise<PublicSecurityIssues['vulnerabilities']> {
    // Mock implementation - in production would query CVE databases
    const vulnerabilities = [];
    
    // Simulate finding vulnerabilities
    if (vendorName.toLowerCase().includes('vulnerable') || 
        vendorName.toLowerCase().includes('risk')) {
      vulnerabilities.push({
        cve: 'CVE-2023-12345',
        description: 'SQL injection vulnerability in login module',
        severity: 'High',
        source: 'National Vulnerability Database'
      });
    }

    return vulnerabilities;
  }

  private async searchNegativeNews(vendorName: string): Promise<PublicSecurityIssues['negativeNews']> {
    // Mock implementation - in production would use news APIs
    const news = [];
    
    // Simulate finding negative news
    if (vendorName.toLowerCase().includes('incident') || 
        vendorName.toLowerCase().includes('hack')) {
      news.push({
        date: '2023-09-20',
        headline: `${vendorName} Faces Security Concerns After Recent Incident`,
        source: 'Tech Security News',
        url: 'https://example.com/security-news/vendor-incident'
      });
    }

    return news;
  }

  calculateIssueCount(issues: PublicSecurityIssues): number {
    return issues.dataBreaches.length + 
           issues.vulnerabilities.length + 
           issues.negativeNews.length;
  }

  formatIssuesForReport(issues: PublicSecurityIssues): string[] {
    const formatted: string[] = [];

    if (issues.dataBreaches.length > 0) {
      formatted.push(`${issues.dataBreaches.length} data breach(es) reported`);
    }

    if (issues.vulnerabilities.length > 0) {
      const highSeverity = issues.vulnerabilities.filter(v => v.severity === 'High' || v.severity === 'Critical').length;
      if (highSeverity > 0) {
        formatted.push(`${highSeverity} high/critical vulnerabilities identified`);
      }
    }

    if (issues.negativeNews.length > 0) {
      formatted.push(`${issues.negativeNews.length} negative security-related news article(s)`);
    }

    return formatted;
  }
}