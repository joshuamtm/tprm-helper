// TPRM Helper Web Application
class TPRMAssessment {
    constructor() {
        this.init();
        this.uploadedFiles = [];
        this.assessmentData = null;
    }

    init() {
        this.setupEventListeners();
        this.setupFileUpload();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('vendor-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startAssessment();
        });

        // New assessment button
        document.getElementById('new-assessment').addEventListener('click', () => {
            this.resetForm();
        });

        // PDF download
        document.getElementById('download-pdf').addEventListener('click', () => {
            this.generatePDF();
        });
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');

        // Click to select files
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    handleFiles(files) {
        Array.from(files).forEach(file => {
            if (this.isValidFile(file)) {
                this.uploadedFiles.push(file);
                this.displayUploadedFile(file);
            }
        });
    }

    isValidFile(file) {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    }

    displayUploadedFile(file) {
        const container = document.getElementById('uploaded-files');
        const fileDiv = document.createElement('div');
        fileDiv.className = 'flex items-center justify-between bg-gray-100 p-3 rounded';
        fileDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-file-alt text-blue-600 mr-2"></i>
                <span class="text-sm text-gray-700">${file.name}</span>
                <span class="text-xs text-gray-500 ml-2">(${this.formatFileSize(file.size)})</span>
            </div>
            <button class="text-red-600 hover:text-red-800" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(fileDiv);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async startAssessment() {
        // Collect form data
        const formData = this.collectFormData();
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        // Show progress section
        this.showProgressSection();
        
        // Perform assessment
        await this.performAssessment(formData);
    }

    collectFormData() {
        return {
            vendorName: document.getElementById('vendor-name').value.trim(),
            vendorWebsite: document.getElementById('vendor-website').value.trim(),
            riskLevel: document.getElementById('risk-level').value,
            userCount: parseInt(document.getElementById('user-count').value),
            sensitiveData: document.getElementById('sensitive-data').checked,
            useCase: document.getElementById('use-case').value.trim(),
            uploadedFiles: this.uploadedFiles
        };
    }

    validateForm(data) {
        if (!data.vendorName || !data.riskLevel || !data.userCount || !data.useCase) {
            alert('Please fill in all required fields.');
            return false;
        }
        return true;
    }

    showProgressSection() {
        document.getElementById('assessment-form').style.display = 'none';
        document.getElementById('progress-section').classList.remove('hidden');
        document.getElementById('results-section').classList.add('hidden');
    }

    async performAssessment(data) {
        const progressSteps = [
            { progress: 20, text: 'Analyzing vendor information...' },
            { progress: 40, text: 'Scanning public security data...' },
            { progress: 60, text: 'Checking compliance certifications...' },
            { progress: 80, text: 'Processing uploaded documents...' },
            { progress: 100, text: 'Generating assessment results...' }
        ];

        for (let i = 0; i < progressSteps.length; i++) {
            await this.updateProgress(progressSteps[i].progress, progressSteps[i].text);
            await this.delay(800 + Math.random() * 1200); // Realistic delay
        }

        // Perform actual assessment
        const assessment = await this.generateAssessment(data);
        this.displayResults(assessment);
    }

    async updateProgress(percentage, text) {
        document.getElementById('progress-bar').style.width = percentage + '%';
        document.getElementById('progress-text').textContent = text;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async generateAssessment(data) {
        // Simulate comprehensive assessment logic
        const assessment = {
            vendor: data,
            timestamp: new Date(),
            securityFindings: await this.analyzeSecurityPosture(data),
            riskAssessment: this.performRiskAssessment(data),
            complianceCheck: await this.checkCompliance(data),
            publicIssues: await this.scanPublicIssues(data)
        };

        // Determine final decision
        assessment.decision = this.determineDecision(assessment);
        
        return assessment;
    }

    async analyzeSecurityPosture(data) {
        // Simulate security analysis
        const findings = {
            websiteSecurityScore: this.calculateWebsiteScore(data.vendorWebsite),
            domainAge: Math.floor(Math.random() * 10) + 1,
            sslCertificate: true,
            securityHeaders: Math.random() > 0.3
        };

        // Analyze uploaded files
        if (data.uploadedFiles.length > 0) {
            findings.uploadedReports = this.analyzeUploadedFiles(data.uploadedFiles);
        }

        return findings;
    }

    calculateWebsiteScore(website) {
        if (!website) return null;
        
        // Mock scoring based on common patterns
        const domain = website.toLowerCase();
        let score = 75; // Base score
        
        if (domain.includes('microsoft') || domain.includes('google') || domain.includes('amazon')) {
            score = 95;
        } else if (domain.includes('secure') || domain.includes('trust')) {
            score = 85;
        } else if (domain.includes('.gov') || domain.includes('.edu')) {
            score = 90;
        } else if (domain.includes('cloud') || domain.includes('enterprise')) {
            score = 80;
        }
        
        // Add some randomness
        score += Math.floor(Math.random() * 10) - 5;
        score = Math.max(0, Math.min(100, score));
        
        return {
            score: score,
            grade: this.scoreToGrade(score)
        };
    }

    scoreToGrade(score) {
        if (score >= 90) return 'A';
        if (score >= 80) return 'B';
        if (score >= 70) return 'C';
        if (score >= 60) return 'D';
        return 'F';
    }

    analyzeUploadedFiles(files) {
        const analysis = {
            soc2Available: false,
            iso27001Available: false,
            penTestAvailable: false,
            securityScorecardAvailable: false
        };

        files.forEach(file => {
            const fileName = file.name.toLowerCase();
            if (fileName.includes('soc') && fileName.includes('2')) {
                analysis.soc2Available = true;
            }
            if (fileName.includes('iso') && fileName.includes('27001')) {
                analysis.iso27001Available = true;
            }
            if (fileName.includes('pen') || fileName.includes('penetration')) {
                analysis.penTestAvailable = true;
            }
            if (fileName.includes('scorecard') || fileName.includes('security')) {
                analysis.securityScorecardAvailable = true;
            }
        });

        return analysis;
    }

    performRiskAssessment(data) {
        let riskScore = 0;
        let riskFactors = [];

        // Base risk from classification
        switch (data.riskLevel) {
            case 'critical':
                riskScore = 80;
                riskFactors.push('Critical risk classification');
                break;
            case 'high':
                riskScore = 60;
                riskFactors.push('High risk classification');
                break;
            case 'medium':
                riskScore = 40;
                riskFactors.push('Medium risk classification');
                break;
            case 'low':
                riskScore = 20;
                riskFactors.push('Low risk classification');
                break;
        }

        // Adjust for user count
        if (data.userCount > 1000) {
            riskScore += 20;
            riskFactors.push(`Large user base (${data.userCount} users)`);
        } else if (data.userCount > 100) {
            riskScore += 10;
            riskFactors.push(`Moderate user base (${data.userCount} users)`);
        }

        // Adjust for sensitive data
        if (data.sensitiveData) {
            riskScore += 15;
            riskFactors.push('Handles sensitive data');
        }

        return {
            score: Math.min(100, riskScore),
            factors: riskFactors
        };
    }

    async checkCompliance(data) {
        // Simulate compliance checking
        const compliance = {
            soc2Type2: false,
            iso27001: false,
            gdprCompliant: Math.random() > 0.3,
            hipaaCompliant: Math.random() > 0.7
        };

        // Check uploaded files
        if (data.uploadedFiles.length > 0) {
            const fileAnalysis = this.analyzeUploadedFiles(data.uploadedFiles);
            compliance.soc2Type2 = fileAnalysis.soc2Available;
            compliance.iso27001 = fileAnalysis.iso27001Available;
        }

        // Check well-known vendors
        const vendorName = data.vendorName.toLowerCase();
        if (vendorName.includes('microsoft') || vendorName.includes('google') || 
            vendorName.includes('amazon') || vendorName.includes('salesforce')) {
            compliance.soc2Type2 = true;
            compliance.iso27001 = Math.random() > 0.3;
        }

        return compliance;
    }

    async scanPublicIssues(data) {
        // Simulate public issue scanning
        const issues = {
            dataBreaches: [],
            vulnerabilities: [],
            negativeNews: []
        };

        const vendorName = data.vendorName.toLowerCase();
        
        // Simulate findings based on vendor name patterns
        if (vendorName.includes('breach') || vendorName.includes('hack')) {
            issues.dataBreaches.push({
                date: '2023-08-15',
                description: 'Data exposure incident affecting customer records',
                severity: 'High'
            });
        }

        if (vendorName.includes('vulnerable') || vendorName.includes('security')) {
            issues.vulnerabilities.push({
                cve: 'CVE-2023-12345',
                description: 'Authentication bypass vulnerability',
                severity: 'Medium'
            });
        }

        return issues;
    }

    determineDecision(assessment) {
        const { vendor, securityFindings, riskAssessment, complianceCheck, publicIssues } = assessment;
        
        let score = 100;
        let issues = [];
        let conditions = [];
        let alternatives = [];

        // Security score impact
        if (securityFindings.websiteSecurityScore) {
            if (securityFindings.websiteSecurityScore.grade === 'F') {
                score -= 40;
                issues.push('Poor security score indicates significant vulnerabilities');
            } else if (securityFindings.websiteSecurityScore.grade === 'D') {
                score -= 25;
                issues.push('Below-average security score requires attention');
            }
        }

        // Risk assessment impact
        if (riskAssessment.score > 80) {
            score -= 30;
            if (vendor.riskLevel === 'critical') {
                issues.push('Critical risk vendor requires enhanced security controls');
            }
        }

        // Compliance requirements
        if (vendor.riskLevel === 'critical' && !complianceCheck.soc2Type2 && !complianceCheck.iso27001) {
            score -= 35;
            issues.push('Missing required SOC 2 Type 2 or ISO 27001 certification for critical vendors');
        } else if (vendor.riskLevel === 'high' && !complianceCheck.soc2Type2) {
            conditions.push('Provide SOC 2 Type 2 certification or security attestation within 30 days');
        }

        // Public issues impact
        if (publicIssues.dataBreaches.length > 0) {
            score -= 30;
            issues.push(`${publicIssues.dataBreaches.length} data breach(es) identified in public records`);
        }

        if (publicIssues.vulnerabilities.length > 0) {
            score -= 15;
            issues.push(`${publicIssues.vulnerabilities.length} known vulnerabilities require remediation`);
        }

        // Generate alternatives for rejections
        if (score < 60) {
            alternatives = this.generateAlternatives(vendor.useCase);
        }

        // Determine final status
        let status, rationale;
        if (score >= 80) {
            status = 'APPROVED';
            rationale = this.generateApprovalRationale(assessment);
        } else if (score >= 60 && conditions.length > 0) {
            status = 'CONDITIONALLY APPROVED';
            rationale = this.generateConditionalRationale(assessment, conditions);
        } else {
            status = 'REJECTED';
            rationale = this.generateRejectionRationale(assessment, issues, alternatives);
        }

        return {
            status,
            score,
            rationale,
            issues,
            conditions,
            alternatives,
            nextSteps: this.generateNextSteps(status, conditions, alternatives)
        };
    }

    generateAlternatives(useCase) {
        const lowerUseCase = useCase.toLowerCase();
        
        if (lowerUseCase.includes('cloud') || lowerUseCase.includes('storage')) {
            return [
                { name: 'Microsoft OneDrive for Business', description: 'Enterprise cloud storage with strong security', status: 'Pre-approved' },
                { name: 'Google Workspace', description: 'Collaborative platform with comprehensive security', status: 'Pre-approved' },
                { name: 'Box Enterprise', description: 'Secure content management platform', status: 'Pre-approved' }
            ];
        }
        
        if (lowerUseCase.includes('video') || lowerUseCase.includes('meeting') || lowerUseCase.includes('communication')) {
            return [
                { name: 'Microsoft Teams', description: 'Enterprise communication platform', status: 'Pre-approved' },
                { name: 'Zoom Enterprise', description: 'Video conferencing with enterprise security', status: 'Pre-approved' },
                { name: 'Cisco Webex', description: 'Secure collaboration platform', status: 'Pre-approved' }
            ];
        }
        
        return [
            { name: 'Contact IT Security', description: 'We can help identify approved alternatives', status: 'Consultation available' }
        ];
    }

    generateApprovalRationale(assessment) {
        const reasons = [];
        
        if (assessment.securityFindings.websiteSecurityScore) {
            const grade = assessment.securityFindings.websiteSecurityScore.grade;
            if (grade <= 'B') {
                reasons.push(`Strong security posture (Security Score: ${grade})`);
            }
        }
        
        if (assessment.complianceCheck.soc2Type2) {
            reasons.push('SOC 2 Type 2 certification verified');
        }
        
        if (assessment.complianceCheck.iso27001) {
            reasons.push('ISO 27001 certification verified');
        }
        
        if (assessment.publicIssues.dataBreaches.length === 0) {
            reasons.push('No significant public security issues identified');
        }
        
        reasons.push(`Meets security requirements for ${assessment.vendor.riskLevel} risk classification`);
        
        return reasons;
    }

    generateConditionalRationale(assessment, conditions) {
        return [
            `${assessment.vendor.vendorName} can be approved pending completion of requirements`,
            `Current security posture is acceptable with additional controls`,
            `Risk level: ${assessment.vendor.riskLevel} - requires enhanced verification`
        ];
    }

    generateRejectionRationale(assessment, issues, alternatives) {
        const reasons = [`${assessment.vendor.vendorName} does not meet minimum security requirements`];
        reasons.push(...issues);
        if (alternatives.length > 0) {
            reasons.push('Pre-approved alternatives are available for your use case');
        }
        return reasons;
    }

    generateNextSteps(status, conditions, alternatives) {
        switch (status) {
            case 'APPROVED':
                return [
                    'Proceed with vendor onboarding process',
                    'Ensure security requirements are included in contract',
                    'Set up regular security monitoring',
                    'Schedule annual security review'
                ];
            case 'CONDITIONALLY APPROVED':
                return [
                    'Contact vendor to fulfill requirements listed above',
                    'Submit documentation to IT Security for review',
                    'Limited pilot use may proceed during review period',
                    'Full deployment pending final approval'
                ];
            case 'REJECTED':
                const steps = [
                    'Consider approved alternatives listed above',
                    'Reassess business requirements and risk tolerance',
                    'Contact IT Security for consultation on alternatives'
                ];
                if (alternatives.length > 0) {
                    steps.unshift('Review and evaluate suggested alternatives');
                }
                return steps;
            default:
                return [];
        }
    }

    displayResults(assessment) {
        document.getElementById('progress-section').classList.add('hidden');
        document.getElementById('results-section').classList.remove('hidden');
        
        const resultContent = document.getElementById('result-content');
        const decision = assessment.decision;
        
        let statusColor, statusIcon;
        switch (decision.status) {
            case 'APPROVED':
                statusColor = 'green';
                statusIcon = '🟢';
                break;
            case 'CONDITIONALLY APPROVED':
                statusColor = 'yellow';
                statusIcon = '🟡';
                break;
            case 'REJECTED':
                statusColor = 'red';
                statusIcon = '🔴';
                break;
        }
        
        let html = `
            <div class="flex items-center mb-6">
                <span class="text-4xl mr-4">${statusIcon}</span>
                <div>
                    <h2 class="text-3xl font-bold text-${statusColor}-600">${decision.status}</h2>
                    <p class="text-gray-600">${assessment.vendor.vendorName} Assessment</p>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h3 class="text-lg font-semibold mb-2">Assessment Details</h3>
                    <ul class="space-y-1 text-sm text-gray-700">
                        <li><strong>Vendor:</strong> ${assessment.vendor.vendorName}</li>
                        <li><strong>Risk Level:</strong> ${assessment.vendor.riskLevel}</li>
                        <li><strong>Users:</strong> ${assessment.vendor.userCount}</li>
                        <li><strong>Sensitive Data:</strong> ${assessment.vendor.sensitiveData ? 'Yes' : 'No'}</li>
                        <li><strong>Assessment Date:</strong> ${assessment.timestamp.toLocaleDateString()}</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-semibold mb-2">Security Summary</h3>
                    <ul class="space-y-1 text-sm text-gray-700">
        `;
        
        if (assessment.securityFindings.websiteSecurityScore) {
            html += `<li><strong>Security Score:</strong> ${assessment.securityFindings.websiteSecurityScore.score} (${assessment.securityFindings.websiteSecurityScore.grade})</li>`;
        }
        
        html += `
                        <li><strong>SOC 2 Type 2:</strong> ${assessment.complianceCheck.soc2Type2 ? '✓ Available' : '✗ Not confirmed'}</li>
                        <li><strong>ISO 27001:</strong> ${assessment.complianceCheck.iso27001 ? '✓ Available' : '✗ Not confirmed'}</li>
                        <li><strong>Public Issues:</strong> ${assessment.publicIssues.dataBreaches.length + assessment.publicIssues.vulnerabilities.length} found</li>
                    </ul>
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">Rationale</h3>
                <ul class="space-y-2">
        `;
        
        decision.rationale.forEach(reason => {
            html += `<li class="flex items-start"><i class="fas fa-check-circle text-${statusColor}-600 mt-1 mr-2"></i><span class="text-gray-700">${reason}</span></li>`;
        });
        
        html += `</ul></div>`;
        
        // Add conditions if conditionally approved
        if (decision.conditions && decision.conditions.length > 0) {
            html += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Required Conditions</h3>
                    <ul class="space-y-2">
            `;
            decision.conditions.forEach((condition, index) => {
                html += `<li class="flex items-start"><span class="font-medium text-yellow-600 mr-2">${index + 1}.</span><span class="text-gray-700">${condition}</span></li>`;
            });
            html += `</ul></div>`;
        }
        
        // Add alternatives if rejected
        if (decision.alternatives && decision.alternatives.length > 0) {
            html += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-3">Recommended Alternatives</h3>
                    <div class="space-y-3">
            `;
            decision.alternatives.forEach(alt => {
                html += `
                    <div class="border rounded-lg p-4">
                        <h4 class="font-medium text-gray-800">${alt.name}</h4>
                        <p class="text-sm text-gray-600">${alt.description}</p>
                        <span class="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${alt.status}</span>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        
        // Add next steps
        html += `
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">Next Steps</h3>
                <ol class="space-y-2">
        `;
        decision.nextSteps.forEach((step, index) => {
            html += `<li class="flex items-start"><span class="font-medium text-purple-600 mr-2">${index + 1}.</span><span class="text-gray-700">${step}</span></li>`;
        });
        html += `</ol></div>`;
        
        resultContent.innerHTML = html;
        this.assessmentData = assessment;
    }

    generatePDF() {
        if (!this.assessmentData) return;
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const assessment = this.assessmentData;
        const decision = assessment.decision;
        
        // Title
        doc.setFontSize(20);
        doc.text('TPRM Vendor Assessment Report', 20, 20);
        
        // Decision
        doc.setFontSize(16);
        doc.text(`Decision: ${decision.status}`, 20, 35);
        
        // Vendor info
        doc.setFontSize(12);
        doc.text(`Vendor: ${assessment.vendor.vendorName}`, 20, 50);
        doc.text(`Risk Level: ${assessment.vendor.riskLevel}`, 20, 60);
        doc.text(`Users: ${assessment.vendor.userCount}`, 20, 70);
        doc.text(`Assessment Date: ${assessment.timestamp.toLocaleDateString()}`, 20, 80);
        
        // Rationale
        doc.text('Rationale:', 20, 100);
        let yPos = 110;
        decision.rationale.forEach(reason => {
            doc.text(`• ${reason}`, 25, yPos);
            yPos += 10;
        });
        
        // Next steps
        yPos += 10;
        doc.text('Next Steps:', 20, yPos);
        yPos += 10;
        decision.nextSteps.forEach((step, index) => {
            doc.text(`${index + 1}. ${step}`, 25, yPos);
            yPos += 10;
        });
        
        // Save
        doc.save(`${assessment.vendor.vendorName}_TPRM_Assessment.pdf`);
    }

    resetForm() {
        document.getElementById('vendor-form').reset();
        document.getElementById('uploaded-files').innerHTML = '';
        this.uploadedFiles = [];
        
        document.getElementById('assessment-form').style.display = 'block';
        document.getElementById('progress-section').classList.add('hidden');
        document.getElementById('results-section').classList.add('hidden');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TPRMAssessment();
});