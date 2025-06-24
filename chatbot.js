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
        messageCount: 0
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
        
        // Check for category keywords
        const categories = [
            { key: 'projectManagement', keywords: ['project', 'task', 'manage', 'planning', 'tracking'] },
            { key: 'dataAnalysis', keywords: ['data', 'analys', 'visual', 'statistic', 'report'] },
            { key: 'communication', keywords: ['communicat', 'chat', 'video', 'meeting', 'collaborat'] },
            { key: 'businessIntelligence', keywords: ['business intelligence', 'bi', 'crm', 'customer', 'sales'] },
            { key: 'hardware', keywords: ['computer', 'laptop', 'desktop', 'hardware', 'device'] },
            { key: 'security', keywords: ['security', 'antivirus', 'password', 'protect', 'firewall'] }
        ];

        for (const category of categories) {
            if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
                conversationContext.category = category.key;
                return generateCategoryResponse(category.key);
            }
        }
        
        // Check for team size
        const teamSizeMatch = message.match(/(\d+)\s*(people|users|members|team|person|employee)/i);
        if (teamSizeMatch) {
            conversationContext.teamSize = parseInt(teamSizeMatch[1]);
        }
        
        // Check for budget
        const budgetMatch = message.match(/\$?(\d+k?|\d+,?\d+)/i);
        if (budgetMatch && (lowerMessage.includes('budget') || lowerMessage.includes('cost'))) {
            conversationContext.budget = budgetMatch[0];
        }
        
        // If we have context, provide recommendations
        if (conversationContext.category) {
            return generateRecommendations();
        }
        
        // Default response
        return generateDefaultResponse();
    }

    function generateCategoryResponse(category) {
        const questions = responses.clarifyingQuestions[category] || responses.clarifyingQuestions.general;
        return questions.join('\n');
    }

    function generateRecommendations() {
        const vendors = knowledgeBase[conversationContext.category] || [];
        
        if (vendors.length === 0) {
            return "I couldn't find specific recommendations for that category. Could you tell me more about what you're looking for?";
        }
        
        const container = document.createElement('div');
        const intro = document.createElement('div');
        intro.textContent = 'Based on your needs, here are my top recommendations:';
        container.appendChild(intro);
        
        // Filter and sort vendors based on context
        let recommendedVendors = [...vendors];
        
        // Filter by team size if applicable
        if (conversationContext.teamSize) {
            if (conversationContext.teamSize < 10) {
                // Prioritize tools good for small teams
                recommendedVendors.sort((a, b) => {
                    const aSmall = a.bestFor.toLowerCase().includes('small');
                    const bSmall = b.bestFor.toLowerCase().includes('small');
                    return bSmall - aSmall;
                });
            } else if (conversationContext.teamSize > 50) {
                // Prioritize enterprise tools
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
        
        recommendedVendors.forEach(vendor => {
            container.appendChild(createVendorCard(vendor));
        });
        
        // Add follow-up question
        const followUp = document.createElement('div');
        followUp.style.marginTop = '16px';
        followUp.textContent = 'Would you like more details about any of these options, or shall I show you more alternatives?';
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
        return `I can help you find solutions in several categories:
        
• **Project Management** - Tools for managing tasks and team collaboration
• **Data Analysis** - Software for analyzing and visualizing data  
• **Communication** - Platforms for team chat and video conferencing
• **Business Intelligence** - CRM and analytics solutions
• **Hardware** - Computers and devices for your team
• **Security** - Protection for your data and systems

What type of solution are you looking for?`;
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