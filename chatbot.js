// Chatbot module
const chatbot = (function() {
    // Configuration
    const CONFIG = {
        maxMessageLength: 500,
        typingDelay: { min: 800, max: 1500 },
        scrollDelay: 100,
        sessionStorageKey: 'phi-chatbot-session',
        maxHistorySize: 50
    };

    // State management
    let conversationContext = {
        category: null,
        teamSize: null,
        budget: null,
        features: [],
        messageCount: 0,
        currentStep: 'initial',
        pendingQuestion: null,
        collectedData: {},
        finalRecommendations: null
    };

    let conversationHistory = [];
    let isProcessing = false;

    // Utility functions
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function sanitizeInput(input) {
        return input.trim().substring(0, CONFIG.maxMessageLength);
    }

    function loadConversationHistory() {
        try {
            const saved = sessionStorage.getItem(CONFIG.sessionStorageKey);
            if (saved) {
                const data = JSON.parse(saved);
                conversationHistory = data.history || [];
                conversationContext = data.context || conversationContext;
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
        }
    }

    function saveConversationHistory() {
        try {
            const data = {
                history: conversationHistory.slice(-CONFIG.maxHistorySize),
                context: conversationContext
            };
            sessionStorage.setItem(CONFIG.sessionStorageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving conversation history:', error);
        }
    }

    // Message handling
    function sendQuickAction(action) {
        const input = document.getElementById('userInput');
        input.value = action;
        input.focus();
        sendMessage();
    }

    function sendMessage() {
        if (isProcessing) return;

        const input = document.getElementById('userInput');
        const message = sanitizeInput(input.value);
        
        if (!message) {
            showError(responses.errors.empty);
            return;
        }
        
        if (message.length >= CONFIG.maxMessageLength) {
            showError(responses.errors.tooLong);
            return;
        }

        isProcessing = true;
        document.getElementById('sendButton').disabled = true;
        
        // Add user message
        addMessage(message, 'user');
        conversationHistory.push({ type: 'user', content: message, timestamp: Date.now() });
        
        // Clear input
        input.value = '';
        input.focus();
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and generate response
        const delay = CONFIG.typingDelay.min + Math.random() * (CONFIG.typingDelay.max - CONFIG.typingDelay.min);
        setTimeout(() => {
            try {
                const response = processUserMessage(message);
                hideTypingIndicator();
                
                if (typeof response === 'string') {
                    addMessage(response, 'bot');
                    conversationHistory.push({ type: 'bot', content: response, timestamp: Date.now() });
                } else {
                    // Handle DOM elements
                    const container = document.createElement('div');
                    container.appendChild(response);
                    addMessage(container, 'bot');
                    conversationHistory.push({ type: 'bot', content: container.innerHTML, timestamp: Date.now() });
                }
                
                saveConversationHistory();
            } catch (error) {
                console.error('Error processing message:', error);
                hideTypingIndicator();
                showError(responses.errors.generic);
            } finally {
                isProcessing = false;
                document.getElementById('sendButton').disabled = false;
            }
        }, delay);
    }

    function processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        conversationContext.messageCount++;
        
        // Handle help requests
        if (lowerMessage.includes('help') || lowerMessage.includes('not sure') || lowerMessage.includes('don\'t know')) {
            return generateHelpResponse();
        }
        
        // Handle conversation flow based on current step
        switch (conversationContext.currentStep) {
            case 'initial':
                return handleInitialMessage(message);
            case 'category_selected':
                return handleTeamSizeQuestion(message);
            case 'team_size_collected':
                return handleBudgetQuestion(message);
            case 'budget_collected':
                return handleSpecialRequirements(message);
            case 'requirements_collected':
                return generateFinalRecommendations();
            default:
                return generateDefaultResponse();
        }
    }
    
    function handleInitialMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for category keywords
        const categories = [
            { key: 'projectManagement', keywords: ['project', 'task', 'manage', 'planning', 'tracking'], display: 'Project Management' },
            { key: 'dataAnalysis', keywords: ['data', 'analys', 'visual', 'statistic', 'report'], display: 'Data Analysis' },
            { key: 'communication', keywords: ['communicat', 'chat', 'video', 'meeting', 'collaborat'], display: 'Communication' },
            { key: 'businessIntelligence', keywords: ['business intelligence', 'bi', 'crm', 'customer', 'sales'], display: 'Business Intelligence' },
            { key: 'hardware', keywords: ['computer', 'laptop', 'desktop', 'hardware', 'device'], display: 'Hardware' },
            { key: 'security', keywords: ['security', 'antivirus', 'password', 'protect', 'firewall'], display: 'Security' }
        ];

        for (const category of categories) {
            if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
                conversationContext.category = category.key;
                conversationContext.collectedData.category = category.display;
                conversationContext.currentStep = 'category_selected';
                return `Great! I'll help you find ${category.display.toLowerCase()} solutions.\n\nHow many people will be using this solution? (For example: "5 people" or "Our team of 15")`;
            }
        }
        
        // If no category detected, ask for clarification
        return generateDefaultResponse();
    }
    
    function handleTeamSizeQuestion(message) {
        const teamSizeMatch = message.match(/(\d+)\s*(people|users|members|team|person|employee)?/i);
        if (teamSizeMatch) {
            const teamSize = parseInt(teamSizeMatch[1]);
            conversationContext.teamSize = teamSize;
            conversationContext.collectedData.teamSize = teamSize;
            conversationContext.currentStep = 'team_size_collected';
            return `Perfect! So this is for ${teamSize} ${teamSize === 1 ? 'person' : 'people'}.\n\nWhat's your approximate monthly budget for this solution? (For example: "$500 per month" or "Under $1000" or "Budget is flexible")`;
        }
        
        return "I didn't catch the team size. Could you tell me how many people will use this? For example, you could say \"5 people\" or \"15 team members\".\n\nType \"help\" if you need assistance with your answer.";
    }
    
    function handleBudgetQuestion(message) {
        const lowerMessage = message.toLowerCase();
        
        // Extract budget information
        let budget = 'Not specified';
        if (lowerMessage.includes('flexible') || lowerMessage.includes('no limit')) {
            budget = 'Flexible';
        } else if (lowerMessage.includes('free') || lowerMessage.includes('$0')) {
            budget = 'Free solutions only';
        } else {
            const budgetMatch = message.match(/\$?(\d+k?|\d+,?\d+)/i);
            if (budgetMatch) {
                budget = `$${budgetMatch[1]} per month`;
            } else if (lowerMessage.includes('under') || lowerMessage.includes('below')) {
                const underMatch = message.match(/under|below.*?(\d+)/i);
                if (underMatch) {
                    budget = `Under $${underMatch[1]}`;
                }
            }
        }
        
        conversationContext.budget = budget;
        conversationContext.collectedData.budget = budget;
        conversationContext.currentStep = 'budget_collected';
        
        return `Thanks! Budget noted as: ${budget}\n\nDo you have any specific requirements? For example:\n• Must integrate with existing tools\n• Needs mobile access\n• Security/compliance requirements\n• Specific features you need\n\nOr just say \"no special requirements\" if you're good to proceed.`;
    }
    
    function handleSpecialRequirements(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('no') && (lowerMessage.includes('special') || lowerMessage.includes('requirement'))) {
            conversationContext.collectedData.requirements = 'No special requirements';
        } else {
            conversationContext.collectedData.requirements = message;
        }
        
        conversationContext.currentStep = 'requirements_collected';
        return generateFinalRecommendations();
    }
    
    function generateHelpResponse() {
        switch (conversationContext.currentStep) {
            case 'initial':
                return `I'm here to help you find the right technology solutions for your PHI program!\n\nJust tell me what you're looking for. You can say things like:\n• \"Project management tools\"\n• \"Communication software\"\n• \"Data analysis\"\n• \"Security solutions\"\n\nWhat type of solution do you need?`;
            case 'category_selected':
                return `I need to know how many people will use this solution to give you the best recommendations.\n\nYou can answer like:\n• \"5 people\"\n• \"Team of 15\"\n• \"Just me\" (for 1 person)\n• \"About 30 users\"\n\nHow many people will be using this?`;
            case 'team_size_collected':
                return `I need to understand your budget to recommend appropriate solutions.\n\nYou can answer like:\n• \"$500 per month\"\n• \"Under $1000\"\n• \"Budget is flexible\"\n• \"Looking for free options\"\n• \"Not sure about budget\"\n\nWhat's your budget range?`;
            case 'budget_collected':
                return `I'm asking about any special needs for your solution.\n\nYou can mention things like:\n• \"Must work with Salesforce\"\n• \"Need mobile app\"\n• \"HIPAA compliance required\"\n• \"No special requirements\"\n\nAny specific requirements?`;
            default:
                return `I'm here to help! What would you like assistance with?`;
        }
    }

    function generateFinalRecommendations() {
        const vendors = knowledgeBase[conversationContext.category] || [];
        
        if (vendors.length === 0) {
            return "I couldn't find specific recommendations for that category. Could you tell me more about what you're looking for?";
        }
        
        // Filter and sort vendors based on context
        let recommendedVendors = [...vendors];
        
        // Filter by team size if applicable
        if (conversationContext.teamSize) {
            if (conversationContext.teamSize < 10) {
                recommendedVendors.sort((a, b) => {
                    const aSmall = a.bestFor.toLowerCase().includes('small');
                    const bSmall = b.bestFor.toLowerCase().includes('small');
                    return bSmall - aSmall;
                });
            } else if (conversationContext.teamSize > 50) {
                recommendedVendors.sort((a, b) => {
                    const aEnterprise = a.bestFor.toLowerCase().includes('enterprise') || 
                                      a.bestFor.toLowerCase().includes('large');
                    const bEnterprise = b.bestFor.toLowerCase().includes('enterprise') || 
                                      b.bestFor.toLowerCase().includes('large');
                    return bEnterprise - aEnterprise;
                });
            }
        }
        
        // Take top 3-4 recommendations
        recommendedVendors = recommendedVendors.slice(0, Math.min(4, recommendedVendors.length));
        
        // Store final recommendations for PDF generation
        conversationContext.finalRecommendations = recommendedVendors;
        
        const container = document.createElement('div');
        const intro = document.createElement('div');
        intro.innerHTML = `<strong>Perfect! Based on your requirements, here are my top recommendations:</strong><br><br>`;
        container.appendChild(intro);
        
        recommendedVendors.forEach(vendor => {
            container.appendChild(createVendorCard(vendor));
        });
        
        // Add PDF download option
        const downloadSection = document.createElement('div');
        downloadSection.style.marginTop = '20px';
        downloadSection.style.padding = '15px';
        downloadSection.style.border = '2px solid #e0e0e0';
        downloadSection.style.borderRadius = '8px';
        downloadSection.style.backgroundColor = '#f9f9f9';
        
        const downloadText = document.createElement('p');
        downloadText.innerHTML = '<strong>📄 Want to save these recommendations?</strong>';
        downloadText.style.marginBottom = '10px';
        
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download PDF Report';
        downloadButton.className = 'download-btn';
        downloadButton.onclick = generatePDFReport;
        
        downloadSection.appendChild(downloadText);
        downloadSection.appendChild(downloadButton);
        container.appendChild(downloadSection);
        
        const followUp = document.createElement('div');
        followUp.style.marginTop = '16px';
        followUp.textContent = 'Would you like more details about any of these options, or would you like to start a new search?';
        container.appendChild(followUp);
        
        return container;
    }


    function createVendorCard(vendor) {
        const card = document.createElement('div');
        card.className = 'vendor-card';
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `Vendor: ${vendor.name}`);
        
        const statusClass = vendor.status === 'supported' ? 'status-supported' : 
                          vendor.status === 'approved' ? 'status-approved' : 'status-not-approved';
        const statusIcon = vendor.status === 'supported' ? '✅ Supported' : 
                         vendor.status === 'approved' ? '☑️ Approved' : '❌ Not Approved';
        
        // Create elements safely
        const header = document.createElement('div');
        header.className = 'vendor-header';
        
        const name = document.createElement('span');
        name.className = 'vendor-name';
        name.textContent = vendor.name;
        
        const badge = document.createElement('span');
        badge.className = `status-badge ${statusClass}`;
        badge.textContent = statusIcon;
        
        header.appendChild(name);
        header.appendChild(badge);
        
        const details = document.createElement('div');
        details.className = 'vendor-details';
        
        const desc = document.createElement('p');
        desc.textContent = vendor.description;
        
        const bestFor = document.createElement('p');
        bestFor.innerHTML = `<strong>Best for:</strong> ${escapeHtml(vendor.bestFor)}`;
        
        const pricing = document.createElement('p');
        pricing.innerHTML = `<strong>Nonprofit pricing:</strong> ${escapeHtml(vendor.nonprofitPricing)}`;
        
        details.appendChild(desc);
        details.appendChild(bestFor);
        details.appendChild(pricing);
        
        const features = document.createElement('div');
        features.className = 'vendor-features';
        features.setAttribute('role', 'list');
        features.setAttribute('aria-label', 'Features');
        
        vendor.features.forEach(f => {
            const tag = document.createElement('span');
            tag.className = 'feature-tag';
            tag.textContent = f;
            tag.setAttribute('role', 'listitem');
            features.appendChild(tag);
        });
        
        card.appendChild(header);
        card.appendChild(details);
        card.appendChild(features);
        
        return card;
    }

    function generateDefaultResponse() {
        return `I can help you find the right technology solutions for your PHI program!\n\nI specialize in:\n• **Project Management** - Task tracking and team collaboration\n• **Data Analysis** - Analytics and visualization tools\n• **Communication** - Team chat and video platforms\n• **Business Intelligence** - CRM and reporting solutions\n• **Hardware** - Computers and devices\n• **Security** - Protection and compliance tools\n\nWhat type of solution are you looking for? Just tell me in your own words!`;
    }
    
    function generatePDFReport() {
        if (!conversationContext.finalRecommendations) {
            alert('No recommendations available to download.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // PDF styling
        const margin = 20;
        let yPos = margin;
        
        // Title
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('PHI Vendor Recommendations Report', margin, yPos);
        yPos += 15;
        
        // Date
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
        yPos += 20;
        
        // Requirements Summary
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Your Requirements:', margin, yPos);
        yPos += 10;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Category: ${conversationContext.collectedData.category || 'Not specified'}`, margin, yPos);
        yPos += 6;
        doc.text(`Team Size: ${conversationContext.collectedData.teamSize || 'Not specified'}`, margin, yPos);
        yPos += 6;
        doc.text(`Budget: ${conversationContext.collectedData.budget || 'Not specified'}`, margin, yPos);
        yPos += 6;
        doc.text(`Special Requirements: ${conversationContext.collectedData.requirements || 'None'}`, margin, yPos);
        yPos += 20;
        
        // Recommendations
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Recommended Solutions:', margin, yPos);
        yPos += 15;
        
        conversationContext.finalRecommendations.forEach((vendor, index) => {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = margin;
            }
            
            // Vendor name and status
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${vendor.name}`, margin, yPos);
            
            // Status badge
            const statusText = vendor.status === 'supported' ? 'Supported' : 
                             vendor.status === 'approved' ? 'Approved' : 'Not Approved';
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(`[${statusText}]`, margin + 100, yPos);
            yPos += 8;
            
            // Description
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            const descLines = doc.splitTextToSize(vendor.description, 160);
            doc.text(descLines, margin, yPos);
            yPos += descLines.length * 5 + 3;
            
            // Best for
            doc.setFont(undefined, 'bold');
            doc.text('Best for: ', margin, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(vendor.bestFor, margin + 20, yPos);
            yPos += 6;
            
            // Pricing
            doc.setFont(undefined, 'bold');
            doc.text('Nonprofit pricing: ', margin, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(vendor.nonprofitPricing, margin + 35, yPos);
            yPos += 6;
            
            // Features
            doc.setFont(undefined, 'bold');
            doc.text('Key features: ', margin, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(vendor.features.join(', '), margin + 30, yPos);
            yPos += 10;
            
            // Separator line
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPos, 190, yPos);
            yPos += 10;
        });
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text(`PHI Vendor Recommendation Assistant - Page ${i} of ${pageCount}`, margin, 285);
        }
        
        // Download the PDF
        const filename = `PHI-Vendor-Recommendations-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
    }
    
    function showIntroduction() {
        const introMessage = `🏥 **Welcome to the PHI Vendor Recommendation Assistant!**\n\nI'm here to help you find the right technology solutions for your PHI program. Here's how this works:\n\n**What I do:**\n• Ask you a few simple questions about your needs\n• Provide personalized vendor recommendations\n• Give you a downloadable report with all the details\n\n**What you need to do:**\n• Answer my questions one at a time\n• Be as specific or general as you like\n• Ask for \"help\" if you're unsure about any question\n\n**Ready to get started?**\nJust tell me what type of solution you're looking for, or click one of the quick options below!`;
        
        addMessage(introMessage, 'bot');
        
        // Add quick action buttons
        setTimeout(() => {
            const quickActions = document.createElement('div');
            quickActions.className = 'quick-actions';
            quickActions.setAttribute('role', 'group');
            quickActions.setAttribute('aria-label', 'Quick action suggestions');
            
            const actions = [
                'Project Management Tools',
                'Data Analysis Software', 
                'Communication Platforms',
                'Business Intelligence'
            ];
            
            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = 'quick-action';
                button.textContent = action;
                button.onclick = () => chatbot.sendQuickAction(action);
                button.setAttribute('aria-label', `Search for ${action}`);
                quickActions.appendChild(button);
            });
            
            const messages = document.getElementById('messages');
            const lastMessage = messages.lastElementChild;
            if (lastMessage && lastMessage.classList.contains('bot-message')) {
                const contentWrapper = lastMessage.querySelector('.message-content').parentElement;
                contentWrapper.appendChild(quickActions);
            }
        }, 500);
    }

    function addMessage(content, sender) {
        const messages = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'bot') {
            const avatar = document.createElement('div');
            avatar.className = 'bot-avatar';
            avatar.setAttribute('role', 'img');
            avatar.setAttribute('aria-label', 'Assistant');
            
            const contentWrapper = document.createElement('div');
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (typeof content === 'string') {
                // Safely set content and convert line breaks
                contentDiv.textContent = content;
                contentDiv.innerHTML = contentDiv.innerHTML.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            } else if (content instanceof Element) {
                contentDiv.appendChild(content);
            }
            
            contentWrapper.appendChild(contentDiv);
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(contentWrapper);
        } else {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.textContent = content;
            messageDiv.appendChild(contentDiv);
        }
        
        messages.appendChild(messageDiv);
        
        // Smooth scroll to bottom
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, CONFIG.scrollDelay);
    }

    function showTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.add('active');
        indicator.setAttribute('aria-hidden', 'false');
        
        const messages = document.getElementById('messages');
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, CONFIG.scrollDelay);
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator.classList.remove('active');
        indicator.setAttribute('aria-hidden', 'true');
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        
        const messages = document.getElementById('messages');
        messages.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Initialize
    function init() {
        loadConversationHistory();
        
        // Show introduction if no conversation history
        if (conversationHistory.length === 0) {
            showIntroduction();
        }
        
        document.getElementById('userInput').focus();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.getElementById('userInput').focus();
            }
        });

        // Handle page visibility to save state
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                saveConversationHistory();
            }
        });

        // Handle before unload
        window.addEventListener('beforeunload', () => {
            saveConversationHistory();
        });
    }

    // Public API
    return {
        init,
        sendMessage,
        sendQuickAction
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', chatbot.init);
} else {
    chatbot.init();
}