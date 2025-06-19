// TPRM Helper Web Application
// Enhanced TPRM Assessment Application with Comprehensive Guidance
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
        
        // Risk guidance toggle
        document.getElementById('risk-guidance-btn').addEventListener('click', () => {
            this.toggleRiskGuidance();
        });
        
        // Dynamic risk assessment feedback
        this.setupDynamicRiskFeedback();
    }
    
    toggleRiskGuidance() {
        const guidance = document.getElementById('risk-guidance');
        const btn = document.getElementById('risk-guidance-btn');
        
        if (guidance.classList.contains('hidden')) {
            guidance.classList.remove('hidden');
            btn.innerHTML = '<i class="fas fa-times mr-1"></i>Hide Guidance';
        } else {
            guidance.classList.add('hidden');
            btn.innerHTML = '<i class="fas fa-question-circle mr-1"></i>Need Help Classifying?';
        }
    }
    
    setupDynamicRiskFeedback() {
        const riskLevelSelect = document.getElementById('risk-level');
        const userCountInput = document.getElementById('user-count');
        const sensitiveDataCheckbox = document.getElementById('sensitive-data');
        const useCaseTextarea = document.getElementById('use-case');
        
        const updateRiskFeedback = () => {
            this.updateRiskFeedback();
        };
        
        riskLevelSelect.addEventListener('change', updateRiskFeedback);
        userCountInput.addEventListener('input', updateRiskFeedback);
        sensitiveDataCheckbox.addEventListener('change', updateRiskFeedback);
        useCaseTextarea.addEventListener('input', updateRiskFeedback);
    }
    
    updateRiskFeedback() {
        const riskLevel = document.getElementById('risk-level').value;
        const userCount = parseInt(document.getElementById('user-count').value) || 0;
        const sensitiveData = document.getElementById('sensitive-data').checked;
        const useCase = document.getElementById('use-case').value.toLowerCase();
        
        const feedback = document.getElementById('risk-feedback');
        const title = document.getElementById('risk-feedback-title');
        const text = document.getElementById('risk-feedback-text');
        
        let message = '';
        let alertType = 'info';
        
        // Check for automatic escalation conditions
        if (sensitiveData && userCount >= 1000) {
            message = 'Will be automatically escalated to CRITICAL due to sensitive data for 1000+ users';
            alertType = 'warning';
        } else if (sensitiveData && userCount >= 50 && riskLevel !== 'critical') {
            message = 'May be escalated to HIGH risk due to sensitive data and user scale';
            alertType = 'info';
        } else if (userCount >= 1000) {
            message = 'Large user base may increase risk level depending on data sensitivity';
            alertType = 'info';
        }
        
        // Check use case for high-risk keywords
        const highRiskKeywords = ['payment', 'financial', 'ssn', 'healthcare', 'medical', 'phi', 'admin', 'database'];
        const criticalKeywords = ['payroll', 'banking', 'credit card', 'social security'];
        
        if (criticalKeywords.some(keyword => useCase.includes(keyword))) {
            message = 'Use case contains critical data types - recommend CRITICAL risk classification';
            alertType = 'error';
        } else if (highRiskKeywords.some(keyword => useCase.includes(keyword))) {
            if (!message) {
                message = 'Use case involves sensitive data - ensure appropriate risk classification';
                alertType = 'warning';
            }
        }
        
        // Show risk level guidance
        if (riskLevel && !message) {
            const guidance = this.getRiskLevelGuidance(riskLevel, userCount, sensitiveData);
            if (guidance) {
                message = guidance;
                alertType = 'info';
            }
        }
        
        if (message) {
            feedback.classList.remove('hidden', 'bg-blue-50', 'bg-yellow-50', 'bg-red-50', 'text-blue-800', 'text-yellow-800', 'text-red-800');
            
            switch (alertType) {
                case 'error':
                    feedback.classList.add('bg-red-50', 'text-red-800');
                    title.textContent = 'Risk Classification Alert';
                    break;
                case 'warning':
                    feedback.classList.add('bg-yellow-50', 'text-yellow-800');
                    title.textContent = 'Risk Assessment Notice';
                    break;
                default:
                    feedback.classList.add('bg-blue-50', 'text-blue-800');
                    title.textContent = 'Risk Classification Guidance';
            }
            
            text.textContent = message;
        } else {
            feedback.classList.add('hidden');
        }
    }
    
    getRiskLevelGuidance(riskLevel, userCount, sensitiveData) {
        const guidance = {
            'critical': 'Critical vendors require SOC 2 Type 2 or ISO 27001 certification and SecurityScorecard grade B or higher',
            'high': 'High-risk vendors need security attestation and regular security reviews',
            'medium': 'Medium-risk vendors require basic security documentation and monitoring',
            'low': 'Low-risk vendors need standard security checks and vendor questionnaire'
        };
        
        let message = guidance[riskLevel] || '';
        
        if (riskLevel === 'critical' && (!sensitiveData || userCount < 50)) {
            message += '. Consider if Critical classification is necessary for this use case.';
        }
        
        if (riskLevel === 'low' && (sensitiveData || userCount > 100)) {
            message += '. Consider higher risk classification due to data sensitivity or user scale.';
        }
        
        return message;
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
        const errors = [];
        
        if (!data.vendorName || data.vendorName.trim().length < 2) {
            errors.push('Please enter a valid vendor name (at least 2 characters)');
        }
        
        if (!data.riskLevel) {
            errors.push('Please select a risk classification level');
        }
        
        if (!data.userCount || data.userCount < 1) {
            errors.push('Please enter the number of users (must be at least 1)');
        }
        
        if (!data.useCase || data.useCase.trim().length < 10) {
            errors.push('Please provide a detailed use case description (at least 10 characters)');
        }
        
        // Validate use case detail for sensitive data
        if (data.sensitiveData && data.useCase.trim().length < 20) {
            errors.push('For vendors handling sensitive data, please provide a more detailed use case description');
        }
        
        // Risk level validation based on inputs
        if (data.sensitiveData && data.userCount >= 1000 && data.riskLevel !== 'critical') {
            errors.push('Vendors handling sensitive data for 1000+ users should typically be classified as Critical risk');
        }
        
        if (errors.length > 0) {
            const errorMessage = 'Please address the following issues:\n\n' + errors.join('\n');
            alert(errorMessage);
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
        
        // Enhanced approval rationale with detailed explanations
        reasons.push(`\nAPPROVAL DECISION: ${assessment.decision.status}`);
        
        if (assessment.decision.status === 'APPROVED') {
            reasons.push('\nThis vendor demonstrates adequate security controls and meets all requirements for the specified risk level.');
        } else if (assessment.decision.status === 'CONDITIONALLY APPROVED') {
            reasons.push('\nThis vendor shows acceptable security posture but requires specific conditions to be met before full approval.');
        } else {
            reasons.push('\nThis vendor does not meet minimum security requirements and poses unacceptable risk.');
        }
        
        // Security posture analysis
        if (assessment.securityFindings.websiteSecurityScore) {
            const grade = assessment.securityFindings.websiteSecurityScore.grade;
            const score = assessment.securityFindings.websiteSecurityScore.score;
            
            reasons.push(`\nSecurity Posture Analysis:`);
            reasons.push(`• SecurityScorecard Grade: ${grade} (${score}/100)`);
            
            if (grade <= 'B') {
                reasons.push(`• Strong security controls demonstrated`);
            } else if (grade === 'C') {
                reasons.push(`• Adequate security controls with some improvement areas`);
            } else if (grade === 'D') {
                reasons.push(`• Below-average security controls requiring attention`);
            } else {
                reasons.push(`• Poor security controls indicating significant risks`);
            }
        } else {
            reasons.push(`\nSecurity Posture Analysis:`);
            reasons.push(`• SecurityScorecard not available - limits assessment confidence`);
        }
        
        // Compliance status
        reasons.push(`\nCompliance Assessment:`);
        if (assessment.complianceCheck.soc2Type2) {
            reasons.push('• SOC 2 Type 2 certification verified - demonstrates audited security controls');
        }
        
        if (assessment.complianceCheck.iso27001) {
            reasons.push('• ISO 27001 certification verified - shows comprehensive security management');
        }
        
        if (!assessment.complianceCheck.soc2Type2 && !assessment.complianceCheck.iso27001) {
            reasons.push('• No major security certifications verified');
        }
        
        // Risk level context
        reasons.push(`\nRisk Level Assessment:`);
        reasons.push(`• Classified as ${assessment.vendor.riskLevel} risk based on data sensitivity and user scale`);
        
        const userScale = this.getUserScaleCategory(assessment.vendor.userCount);
        reasons.push(`• User Scale: ${userScale} (${assessment.vendor.userCount} users)`);
        
        if (assessment.vendor.sensitiveData) {
            const dataType = this.getDataSensitivityCategory(assessment.vendor.useCase);
            reasons.push(`• Data Sensitivity: ${dataType} data handling confirmed`);
        }
        
        // Public security issues
        reasons.push(`\nPublic Security Assessment:`);
        if (assessment.publicIssues.dataBreaches.length === 0) {
            reasons.push('• No data breaches identified in public records');
        } else {
            reasons.push(`• ${assessment.publicIssues.dataBreaches.length} data breach(es) identified - requires evaluation`);
        }
        
        if (assessment.publicIssues.vulnerabilities.length === 0) {
            reasons.push('• No critical vulnerabilities identified');
        } else {
            const critical = assessment.publicIssues.vulnerabilities.filter(v => v.severity === 'Critical').length;
            const high = assessment.publicIssues.vulnerabilities.filter(v => v.severity === 'High').length;
            reasons.push(`• ${assessment.publicIssues.vulnerabilities.length} vulnerabilities found (${critical} Critical, ${high} High)`);
        }
        
        return reasons;
    }
    
    getUserScaleCategory(userCount) {
        if (userCount >= 1000) return 'Enterprise Scale (1000+ users)';
        if (userCount >= 50) return 'Departmental Scale (50-999 users)';
        if (userCount >= 10) return 'Team Scale (10-49 users)';
        return 'Individual/Small Team (<10 users)';
    }
    
    getDataSensitivityCategory(useCase) {
        const lowerCase = useCase.toLowerCase();
        
        if (['pii', 'personal', 'financial', 'payment', 'healthcare', 'medical', 'phi', 'ssn'].some(keyword => lowerCase.includes(keyword))) {
            return 'Highly Sensitive';
        }
        
        if (['employee', 'customer', 'contact', 'email', 'phone', 'address'].some(keyword => lowerCase.includes(keyword))) {
            return 'Moderately Sensitive';
        }
        
        return 'General Business';
    }

    generateConditionalRationale(assessment, conditions) {
        const reasons = [
            `\nCONDITIONAL APPROVAL: ${assessment.vendor.vendorName}`,
            `\nThis vendor demonstrates acceptable security posture but requires specific conditions to be met:`,
            ''
        ];
        
        conditions.forEach((condition, index) => {
            reasons.push(`${index + 1}. ${condition}`);
        });
        
        reasons.push('');
        reasons.push('Rationale for Conditional Approval:');
        reasons.push('• Overall security framework is adequate for intended use');
        reasons.push('• Identified gaps can be addressed through vendor cooperation');
        reasons.push('• Risk level is manageable with additional controls');
        reasons.push(`• ${assessment.vendor.riskLevel} risk classification supports conditional approach`);
        
        reasons.push('');
        reasons.push('Next Steps:');
        reasons.push('• Contact vendor to fulfill specified requirements');
        reasons.push('• Limited pilot use may proceed during review period');
        reasons.push('• Full deployment pending completion of conditions');
        reasons.push('• Enhanced monitoring during conditional period');
        
        return reasons;
    }

    generateRejectionRationale(assessment, issues, alternatives) {
        const reasons = [
            `\nREJECTION DECISION: ${assessment.vendor.vendorName}`,
            `\nThis vendor does not meet minimum security requirements and poses unacceptable risk.`,
            ''
        ];
        
        reasons.push('Critical Issues Identified:');
        issues.forEach(issue => {
            reasons.push(`• ${issue}`);
        });
        
        reasons.push('');
        reasons.push('Risk Assessment Summary:');
        reasons.push(`• Risk Level: ${assessment.vendor.riskLevel}`);
        
        if (assessment.securityFindings.websiteSecurityScore) {
            const grade = assessment.securityFindings.websiteSecurityScore.grade;
            reasons.push(`• Security Score: ${grade} (below acceptable threshold)`);
        }
        
        if (assessment.publicIssues.dataBreaches.length > 0) {
            reasons.push(`• Data Breaches: ${assessment.publicIssues.dataBreaches.length} incidents on record`);
        }
        
        if (!assessment.complianceCheck.soc2Type2 && !assessment.complianceCheck.iso27001) {
            reasons.push('• Compliance: Missing required security certifications');
        }
        
        reasons.push('');
        reasons.push('Business Impact Considerations:');
        reasons.push('• Proceeding with this vendor could expose organization to significant security risks');
        reasons.push('• Potential for data breaches, compliance violations, or operational disruption');
        reasons.push('• Risk level exceeds organizational risk tolerance');
        
        if (alternatives.length > 0) {
            reasons.push('');
            reasons.push('Recommended Actions:');
            reasons.push('• Review pre-approved alternatives listed below');
            reasons.push('• Consider working with vendor on security improvements');
            reasons.push('• Re-evaluate business requirements and risk tolerance');
            reasons.push('• Consult with IT Security for alternative solutions');
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
        
        // Add assessment guidance based on decision
        this.showAssessmentGuidance(assessment.decision.status);
    }
    
    showAssessmentGuidance(status) {
        const guidanceMap = {
            'APPROVED': {
                icon: '🔒',
                title: 'Security Approved',
                message: 'This vendor has passed all security requirements and can be onboarded immediately.'
            },
            'CONDITIONALLY APPROVED': {
                icon: '⚠️',
                title: 'Conditional Approval',
                message: 'This vendor can be used with specific conditions. Complete requirements before full deployment.'
            },
            'REJECTED': {
                icon: '⛔',
                title: 'Security Risk Too High',
                message: 'This vendor poses unacceptable security risks. Consider approved alternatives or security improvements.'
            }
        };
        
        const guidance = guidanceMap[status];
        if (guidance) {
            console.log(`${guidance.icon} ${guidance.title}: ${guidance.message}`);
        }
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

// Risk classification utilities
const RiskClassificationHelper = {
    getDataSensitivityExamples() {
        return {
            'Critical': ['SSN', 'Payment card data', 'PHI/Medical records', 'Financial account numbers'],
            'High': ['Customer PII', 'Employee data', 'Business contracts', 'Proprietary information'],
            'Medium': ['Contact information', 'Business operational data', 'Marketing data'],
            'Low': ['Public information', 'General business tools', 'Non-sensitive analytics']
        };
    },
    
    getVendorTypeExamples() {
        return {
            'HR/Payroll': 'Critical - Handles employee SSNs, salary, bank accounts',
            'CRM/Sales': 'High - Customer data, sales pipeline, business relationships', 
            'Cloud Storage': 'High - May contain sensitive documents and files',
            'Communication': 'Medium/High - Business communications, may include sensitive info',
            'Analytics': 'Low/Medium - Aggregated data, website metrics',
            'Marketing': 'Medium - Customer contact data, marketing lists'
        };
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new TPRMAssessment();
    
    // Add risk classification helper to global scope for debugging
    window.RiskHelper = RiskClassificationHelper;
    window.TPRMApp = app;
});