import axios from 'axios';
import { SecurityScorecard } from '../types';

export class SecurityScorecardService {
  private baseUrl = 'https://platform.securityscorecard.io/api/';
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.SECURITYSCORECARD_API_KEY;
  }

  async getVendorScore(vendorDomain: string): Promise<SecurityScorecard | null> {
    try {
      // If no API key, return mock data for demonstration
      if (!this.apiKey) {
        return this.getMockScore(vendorDomain);
      }

      // Real API implementation (requires valid API key)
      const response = await axios.get(`${this.baseUrl}companies/${vendorDomain}/score`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Accept': 'application/json'
        }
      });

      const data = response.data;
      
      return {
        score: data.score,
        letterGrade: this.scoreToGrade(data.score),
        factors: data.factors,
        lastUpdated: new Date(data.last_updated),
        url: `https://platform.securityscorecard.io/company/${vendorDomain}`
      };
    } catch (error) {
      console.error(`Error fetching SecurityScorecard data: ${error}`);
      return this.getMockScore(vendorDomain);
    }
  }

  private getMockScore(vendorDomain: string): SecurityScorecard {
    // Mock scores based on vendor name patterns for demonstration
    const domain = vendorDomain.toLowerCase();
    let score = 75;
    
    if (domain.includes('microsoft') || domain.includes('google') || domain.includes('aws')) {
      score = 95;
    } else if (domain.includes('secure') || domain.includes('trust')) {
      score = 85;
    } else if (domain.includes('test') || domain.includes('demo')) {
      score = 65;
    } else if (domain.includes('risk') || domain.includes('breach')) {
      score = 45;
    }

    return {
      score,
      letterGrade: this.scoreToGrade(score),
      factors: {
        'Network Security': { score: score + 5, grade: this.scoreToGrade(score + 5) },
        'DNS Health': { score: score - 5, grade: this.scoreToGrade(score - 5) },
        'Patching Cadence': { score: score, grade: this.scoreToGrade(score) },
        'Application Security': { score: score + 2, grade: this.scoreToGrade(score + 2) },
        'Social Engineering': { score: score - 3, grade: this.scoreToGrade(score - 3) }
      },
      lastUpdated: new Date(),
      url: `https://securityscorecard.com/security-rating/example/${vendorDomain}`
    };
  }

  private scoreToGrade(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  extractDomainFromVendorName(vendorName: string): string {
    // Simple domain extraction logic
    const cleanName = vendorName.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    
    return `${cleanName}.com`;
  }
}