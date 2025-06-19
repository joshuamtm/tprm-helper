import axios from 'axios';
import * as cheerio from 'cheerio';
import { SecurityDocumentation } from '../types';

export class DocumentationScraperService {
  private timeout = 10000;
  
  async findSecurityDocumentation(vendorName: string, vendorDomain?: string): Promise<SecurityDocumentation> {
    const domain = vendorDomain || this.guessDomain(vendorName);
    const documentation: SecurityDocumentation = {
      soc2Type2Available: false,
      iso27001Available: false,
      complementaryUserEntityControls: []
    };

    try {
      // Check common security/trust center URLs
      const trustUrls = [
        `https://${domain}/trust`,
        `https://${domain}/security`,
        `https://${domain}/trust-center`,
        `https://${domain}/security-center`,
        `https://trust.${domain}`,
        `https://security.${domain}`
      ];

      for (const url of trustUrls) {
        const pageContent = await this.fetchPage(url);
        if (pageContent) {
          documentation.trustCenterUrl = url;
          const certs = this.extractCertifications(pageContent);
          documentation.soc2Type2Available = certs.soc2;
          documentation.iso27001Available = certs.iso27001;
          
          if (certs.soc2) {
            documentation.soc2Type2Url = url;
          }
          if (certs.iso27001) {
            documentation.iso27001Url = url;
          }
          break;
        }
      }

      // Check privacy policy
      const privacyUrls = [
        `https://${domain}/privacy`,
        `https://${domain}/privacy-policy`,
        `https://${domain}/legal/privacy`
      ];

      for (const url of privacyUrls) {
        if (await this.urlExists(url)) {
          documentation.privacyPolicyUrl = url;
          break;
        }
      }

      // If vendor has SOC2 and is critical, extract complementary controls
      if (documentation.soc2Type2Available) {
        documentation.complementaryUserEntityControls = this.getCommonComplementaryControls();
      }

    } catch (error) {
      console.error(`Error scraping documentation for ${vendorName}: ${error}`);
    }

    return documentation;
  }

  private async fetchPage(url: string): Promise<string | null> {
    try {
      const response = await axios.get(url, {
        timeout: this.timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; TPRM-Helper/1.0)'
        }
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  private async urlExists(url: string): Promise<boolean> {
    try {
      await axios.head(url, {
        timeout: this.timeout,
        validateStatus: (status) => status < 400
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractCertifications(html: string): { soc2: boolean; iso27001: boolean } {
    const $ = cheerio.load(html);
    const text = $('body').text().toLowerCase();
    
    const soc2Patterns = [
      'soc 2 type 2',
      'soc2 type ii',
      'soc 2 type ii',
      'soc2 type 2',
      'service organization control 2'
    ];
    
    const iso27001Patterns = [
      'iso 27001',
      'iso27001',
      'iso/iec 27001',
      'iso-27001'
    ];

    const soc2 = soc2Patterns.some(pattern => text.includes(pattern));
    const iso27001 = iso27001Patterns.some(pattern => text.includes(pattern));

    return { soc2, iso27001 };
  }

  private guessDomain(vendorName: string): string {
    return vendorName.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '') + '.com';
  }

  private getCommonComplementaryControls(): string[] {
    return [
      'Implement multi-factor authentication (MFA) for all vendor access',
      'Regularly review and audit user access permissions',
      'Encrypt data in transit using TLS 1.2 or higher',
      'Maintain audit logs for all system access and changes',
      'Conduct periodic security awareness training for users',
      'Implement data loss prevention (DLP) controls',
      'Establish incident response procedures for vendor-related security events',
      'Perform regular vulnerability assessments of integration points',
      'Maintain inventory of all data shared with the vendor',
      'Review vendor security reports and certifications annually'
    ];
  }
}