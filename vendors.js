// Vendor Knowledge Base
const knowledgeBase = {
    projectManagement: [
        {
            name: "Asana",
            status: "approved",
            description: "Cloud-based project management platform for team collaboration",
            features: ["Task Management", "Timeline View", "Team Collaboration", "Integrations"],
            nonprofitPricing: "50% discount available",
            bestFor: "Teams of 5-50, multiple project tracking",
            integrations: ["Google Workspace", "Slack", "Zoom"]
        },
        {
            name: "Monday.com",
            status: "approved",
            description: "Visual project management platform with customizable workflows",
            features: ["Custom Workflows", "Automation", "Visual Boards", "Time Tracking"],
            nonprofitPricing: "Nonprofit discount through TechSoup",
            bestFor: "Visual teams, complex workflows",
            integrations: ["Microsoft 365", "Slack", "Gmail"]
        },
        {
            name: "Trello",
            status: "supported",
            description: "Kanban-based project management tool for simple task tracking",
            features: ["Kanban Boards", "Cards & Lists", "Power-Ups", "Mobile Apps"],
            nonprofitPricing: "Free tier available, discounts for paid plans",
            bestFor: "Small teams, simple projects",
            integrations: ["Google Drive", "Slack", "Jira"]
        },
        {
            name: "Jira",
            status: "approved",
            description: "Advanced project tracking for agile teams",
            features: ["Scrum Boards", "Sprint Planning", "Reporting", "Roadmaps"],
            nonprofitPricing: "Community license available for nonprofits",
            bestFor: "Technical teams, agile development",
            integrations: ["Confluence", "Bitbucket", "Slack"]
        },
        {
            name: "Basecamp",
            status: "supported",
            description: "Simple, organized project management",
            features: ["To-do Lists", "Message Boards", "Schedules", "Group Chat"],
            nonprofitPricing: "10% nonprofit discount",
            bestFor: "Remote teams, client projects",
            integrations: ["Email", "Calendar apps", "Zapier"]
        }
    ],
    dataAnalysis: [
        {
            name: "Tableau",
            status: "approved",
            description: "Business intelligence and data visualization platform",
            features: ["Interactive Dashboards", "Data Blending", "Real-time Analytics", "Sharing"],
            nonprofitPricing: "Available through TechSoup",
            bestFor: "Complex data analysis, interactive dashboards",
            integrations: ["Multiple data sources", "Salesforce", "Google Analytics"]
        },
        {
            name: "Power BI",
            status: "supported",
            description: "Microsoft's business analytics solution",
            features: ["Data Modeling", "Custom Visuals", "AI Insights", "Mobile Apps"],
            nonprofitPricing: "Included in Microsoft 365 nonprofit plans",
            bestFor: "Organizations using Microsoft ecosystem",
            integrations: ["Excel", "SharePoint", "SQL Server"]
        },
        {
            name: "SPSS",
            status: "approved",
            description: "Statistical analysis software for research",
            features: ["Statistical Tests", "Predictive Analytics", "Data Preparation", "Reporting"],
            nonprofitPricing: "Academic pricing available",
            bestFor: "Research teams, statistical analysis",
            integrations: ["Excel", "R", "Python"]
        },
        {
            name: "Google Data Studio",
            status: "supported",
            description: "Free data visualization and reporting",
            features: ["Custom Reports", "Real-time Data", "Collaboration", "Templates"],
            nonprofitPricing: "Free for all users",
            bestFor: "Marketing analytics, web data",
            integrations: ["Google Analytics", "Google Ads", "BigQuery"]
        },
        {
            name: "Looker",
            status: "approved",
            description: "Modern BI and data platform",
            features: ["Data Modeling", "Embedded Analytics", "APIs", "Governance"],
            nonprofitPricing: "Contact for nonprofit pricing",
            bestFor: "Enterprise data teams",
            integrations: ["Multiple databases", "Cloud platforms", "APIs"]
        }
    ],
    communication: [
        {
            name: "Slack",
            status: "supported",
            description: "Team communication and collaboration platform",
            features: ["Channels", "Direct Messages", "File Sharing", "App Integrations"],
            nonprofitPricing: "85% discount for nonprofits",
            bestFor: "Real-time team communication",
            integrations: ["Google Drive", "Zoom", "Asana"]
        },
        {
            name: "Microsoft Teams",
            status: "supported",
            description: "Unified communication and collaboration platform",
            features: ["Video Calls", "Chat", "File Storage", "Office Integration"],
            nonprofitPricing: "Included in Microsoft 365 nonprofit plans",
            bestFor: "Organizations using Microsoft 365",
            integrations: ["Office 365", "SharePoint", "OneNote"]
        },
        {
            name: "Zoom",
            status: "supported",
            description: "Video conferencing and webinar platform",
            features: ["HD Video", "Screen Sharing", "Recording", "Breakout Rooms"],
            nonprofitPricing: "Discount available for nonprofits",
            bestFor: "Virtual meetings and webinars",
            integrations: ["Calendar apps", "Slack", "Salesforce"]
        },
        {
            name: "Discord",
            status: "supported",
            description: "Voice, video, and text communication",
            features: ["Voice Channels", "Screen Share", "Communities", "Bots"],
            nonprofitPricing: "Free for basic use",
            bestFor: "Community building, informal teams",
            integrations: ["YouTube", "Spotify", "Twitter"]
        },
        {
            name: "Google Meet",
            status: "supported",
            description: "Simple, secure video meetings",
            features: ["HD Video", "Live Captions", "Screen Sharing", "Recording"],
            nonprofitPricing: "Included with Google Workspace for Nonprofits",
            bestFor: "Organizations using Google Workspace",
            integrations: ["Google Calendar", "Gmail", "Google Drive"]
        }
    ],
    businessIntelligence: [
        {
            name: "Salesforce Nonprofit Cloud",
            status: "approved",
            description: "CRM platform designed for nonprofits",
            features: ["Donor Management", "Program Tracking", "Reporting", "Automation"],
            nonprofitPricing: "10 free licenses through Power of Us program",
            bestFor: "Comprehensive nonprofit management",
            integrations: ["Email platforms", "Payment processors", "Marketing tools"]
        },
        {
            name: "Google Analytics",
            status: "supported",
            description: "Web analytics service for tracking website performance",
            features: ["Traffic Analysis", "User Behavior", "Conversion Tracking", "Custom Reports"],
            nonprofitPricing: "Free for most use cases",
            bestFor: "Website and digital marketing analytics",
            integrations: ["Google Ads", "Search Console", "Data Studio"]
        },
        {
            name: "HubSpot",
            status: "supported",
            description: "Inbound marketing and CRM platform",
            features: ["Contact Management", "Email Marketing", "Landing Pages", "Analytics"],
            nonprofitPricing: "40% nonprofit discount",
            bestFor: "Marketing and sales alignment",
            integrations: ["Gmail", "Outlook", "WordPress"]
        },
        {
            name: "QuickBooks",
            status: "approved",
            description: "Accounting and financial management",
            features: ["Invoicing", "Expense Tracking", "Reporting", "Payroll"],
            nonprofitPricing: "Nonprofit pricing available",
            bestFor: "Financial management, bookkeeping",
            integrations: ["Banks", "Payment processors", "Time tracking apps"]
        },
        {
            name: "Airtable",
            status: "supported",
            description: "Flexible database and project management",
            features: ["Custom Databases", "Views", "Automation", "Forms"],
            nonprofitPricing: "50% nonprofit discount",
            bestFor: "Custom workflows, data organization",
            integrations: ["Slack", "Google Drive", "Zapier"]
        }
    ],
    hardware: [
        {
            name: "Dell OptiPlex Series",
            status: "approved",
            description: "Business desktop computers",
            features: ["Reliable Performance", "Security Features", "Energy Efficient", "Manageable"],
            nonprofitPricing: "Available through TechSoup",
            bestFor: "Office workstations",
            integrations: ["Windows", "Linux compatible"]
        },
        {
            name: "HP EliteBook",
            status: "approved",
            description: "Business-class laptops",
            features: ["Durable Build", "Security", "Long Battery", "Performance"],
            nonprofitPricing: "Nonprofit discounts available",
            bestFor: "Mobile professionals",
            integrations: ["Windows", "Docking stations"]
        },
        {
            name: "Surface Pro",
            status: "supported",
            description: "2-in-1 tablet and laptop",
            features: ["Touchscreen", "Portable", "Pen Support", "Versatile"],
            nonprofitPricing: "Microsoft nonprofit pricing",
            bestFor: "Field work, presentations",
            integrations: ["Windows", "Microsoft 365"]
        }
    ],
    security: [
        {
            name: "BitDefender",
            status: "approved",
            description: "Comprehensive antivirus and security",
            features: ["Anti-malware", "Firewall", "VPN", "Password Manager"],
            nonprofitPricing: "50% nonprofit discount",
            bestFor: "Endpoint protection",
            integrations: ["Windows", "Mac", "Mobile"]
        },
        {
            name: "LastPass",
            status: "supported",
            description: "Password management solution",
            features: ["Secure Vault", "Sharing", "2FA", "Audit"],
            nonprofitPricing: "Teams pricing available",
            bestFor: "Password security",
            integrations: ["Browsers", "Mobile apps", "SSO"]
        },
        {
            name: "Cloudflare",
            status: "supported",
            description: "Web security and performance",
            features: ["DDoS Protection", "CDN", "SSL", "Firewall"],
            nonprofitPricing: "Project Galileo for nonprofits",
            bestFor: "Website protection",
            integrations: ["All web platforms"]
        }
    ]
};

// Response templates
const responses = {
    clarifyingQuestions: {
        projectManagement: [
            "I can help you find project management tools! To give you the best recommendations, could you tell me:",
            "• How many team members will use it?",
            "• Do you need integration with other tools?",
            "• What's your approximate budget?",
            "• What type of projects will you manage?"
        ],
        dataAnalysis: [
            "I'll help you find data analysis software. To narrow down the options:",
            "• What type of data will you be analyzing?",
            "• Do you need statistical analysis or data visualization?",
            "• What's your team's technical expertise level?",
            "• Any specific file formats or data sources?"
        ],
        communication: [
            "Let me help you find the right communication platform:",
            "• How many people need to communicate?",
            "• Do you need video conferencing?",
            "• Is mobile access important?",
            "• Any integration requirements?"
        ],
        businessIntelligence: [
            "I'll help you find business intelligence solutions:",
            "• What metrics do you need to track?",
            "• How many users will need access?",
            "• Do you need CRM capabilities?",
            "• What's your current tech stack?"
        ],
        hardware: [
            "I can recommend hardware solutions. Please tell me:",
            "• Desktop or laptop computers?",
            "• How many devices do you need?",
            "• What will they be used for?",
            "• Any specific performance requirements?"
        ],
        security: [
            "Let's find the right security solutions:",
            "• What are your main security concerns?",
            "• How many devices/users to protect?",
            "• Do you need compliance features?",
            "• Current security measures in place?"
        ],
        general: [
            "I'd be happy to help! Could you tell me more about:",
            "• What specific tasks or challenges you're trying to solve?",
            "• How many people will be using this solution?",
            "• Any must-have features or integrations?",
            "• Your timeline for implementation?"
        ]
    },
    errors: {
        tooLong: "Your message is too long. Please keep it under 500 characters.",
        empty: "Please type a message before sending.",
        generic: "I apologize, but I encountered an error. Please try again."
    }
};