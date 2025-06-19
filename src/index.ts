#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

import { VendorInput, RiskLevel, VendorAssessment } from './types';
import { SecurityScorecardService } from './services/securityScorecard';
import { DocumentationScraperService } from './services/documentationScraper';
import { PublicIssuesScannerService } from './services/publicIssuesScanner';
import { RiskAssessmentEngine } from './services/riskAssessmentEngine';
import { ResponseTemplateGenerator } from './templates/responseTemplates';
import { ReportFormatter } from './utils/reportFormatter';

// Load environment variables
config();

// Initialize services
const scorecardService = new SecurityScorecardService();
const docScraperService = new DocumentationScraperService();
const issuesScannerService = new PublicIssuesScannerService();
const assessmentEngine = new RiskAssessmentEngine();
const templateGenerator = new ResponseTemplateGenerator();
const reportFormatter = new ReportFormatter();

async function promptForVendorDetails(): Promise<VendorInput> {
  console.log(chalk.bold.blue('\n🔒 TPRM Vendor Assessment Tool\n'));
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'vendorName',
      message: 'Enter vendor name:',
      validate: (input) => input.trim() !== '' || 'Vendor name is required'
    },
    {
      type: 'list',
      name: 'riskClassification',
      message: 'Select initial risk classification:',
      choices: [
        { name: 'Critical - Handles highly sensitive data or critical functions', value: RiskLevel.CRITICAL },
        { name: 'High - Processes sensitive data or important functions', value: RiskLevel.HIGH },
        { name: 'Medium - Limited data access or moderate impact', value: RiskLevel.MEDIUM },
        { name: 'Low - Minimal data access and low impact', value: RiskLevel.LOW }
      ]
    },
    {
      type: 'number',
      name: 'numberOfUsers',
      message: 'Number of users who will access this vendor:',
      default: 1,
      validate: (input) => (input && input > 0) || 'Number must be greater than 0'
    },
    {
      type: 'confirm',
      name: 'sharesSensitiveData',
      message: 'Will sensitive data be shared with this vendor?',
      default: false
    },
    {
      type: 'input',
      name: 'useCase',
      message: 'Describe the intended use case:',
      validate: (input) => input.trim() !== '' || 'Use case description is required'
    }
  ]);

  return answers as VendorInput;
}

async function performAssessment(vendor: VendorInput): Promise<VendorAssessment> {
  console.log(chalk.yellow('\n📊 Performing security assessment...\n'));
  
  // Extract domain from vendor name
  const vendorDomain = scorecardService.extractDomainFromVendorName(vendor.vendorName);
  
  // Parallel data gathering
  console.log(chalk.gray('• Fetching SecurityScorecard rating...'));
  const scorecardPromise = scorecardService.getVendorScore(vendorDomain);
  
  console.log(chalk.gray('• Searching for security documentation...'));
  const documentationPromise = docScraperService.findSecurityDocumentation(vendor.vendorName, vendorDomain);
  
  console.log(chalk.gray('• Scanning for public security issues...'));
  const issuesPromise = issuesScannerService.scanForPublicIssues(vendor.vendorName);
  
  // Wait for all promises
  const [scorecard, documentation, publicIssues] = await Promise.all([
    scorecardPromise,
    documentationPromise,
    issuesPromise
  ]);
  
  // Perform risk assessment
  console.log(chalk.gray('• Analyzing risk factors...\n'));
  const assessment = assessmentEngine.assessVendor(vendor, scorecard, documentation, publicIssues);
  
  return assessment;
}

async function saveResults(assessment: VendorAssessment, businessResponse: string): Promise<void> {
  const saveChoice = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'save',
      message: 'Save assessment results to file?',
      default: true
    }
  ]);
  
  if (saveChoice.save) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${assessment.vendor.vendorName.replace(/[^a-z0-9]/gi, '_')}_assessment_${timestamp}.md`;
    const filepath = path.join(process.cwd(), filename);
    
    fs.writeFileSync(filepath, businessResponse);
    console.log(chalk.green(`\n✅ Assessment saved to: ${filename}`));
  }
}

async function runInteractiveMode() {
  try {
    // Get vendor details
    const vendor = await promptForVendorDetails();
    
    // Perform assessment
    const assessment = await performAssessment(vendor);
    
    // Generate business response
    const businessResponse = templateGenerator.generateResponse(assessment);
    
    // Display results
    console.log(chalk.bold.underline('\n📋 Vendor Assessment Complete\n'));
    console.log(businessResponse);
    
    // Format console summary
    reportFormatter.formatConsoleOutput(assessment);
    
    // Save results
    await saveResults(assessment, businessResponse);
    
  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error}`));
    process.exit(1);
  }
}

// CLI setup
program
  .name('tprm-helper')
  .description('Third-Party Risk Management (TPRM) vendor assessment tool')
  .version('1.0.0');

program
  .command('assess', { isDefault: true })
  .description('Perform interactive vendor security assessment')
  .action(runInteractiveMode);

program
  .command('quick')
  .description('Quick assessment with command-line arguments')
  .requiredOption('-n, --name <vendor>', 'Vendor name')
  .requiredOption('-r, --risk <level>', 'Risk level (critical/high/medium/low)')
  .requiredOption('-u, --users <number>', 'Number of users', parseInt)
  .option('-s, --sensitive', 'Handles sensitive data')
  .requiredOption('-c, --case <description>', 'Use case description')
  .action(async (options) => {
    const riskMap: { [key: string]: RiskLevel } = {
      'critical': RiskLevel.CRITICAL,
      'high': RiskLevel.HIGH,
      'medium': RiskLevel.MEDIUM,
      'low': RiskLevel.LOW
    };
    
    const vendor: VendorInput = {
      vendorName: options.name,
      riskClassification: riskMap[options.risk.toLowerCase()] || RiskLevel.MEDIUM,
      numberOfUsers: options.users,
      sharesSensitiveData: options.sensitive || false,
      useCase: options.case
    };
    
    const assessment = await performAssessment(vendor);
    const businessResponse = templateGenerator.generateResponse(assessment);
    
    console.log(businessResponse);
    reportFormatter.formatConsoleOutput(assessment);
  });

program
  .command('config')
  .description('Configure API keys and settings')
  .action(async () => {
    console.log(chalk.yellow('\n⚙️  Configuration'));
    console.log(chalk.gray('To use real SecurityScorecard data, set the following environment variable:'));
    console.log(chalk.gray('SECURITYSCORECARD_API_KEY=your_api_key_here'));
    console.log(chalk.gray('\nCreate a .env file in the project root with your API key.'));
    console.log(chalk.gray('Without an API key, the tool will use mock data for demonstration.\n'));
  });

// Parse arguments and run
program.parse(process.argv);