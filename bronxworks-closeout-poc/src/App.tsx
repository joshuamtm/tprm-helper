import { useState, useRef, useEffect } from 'react';
import type { CloseoutDetails } from './types/closeout';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CloseoutPDF } from './components/CloseoutPDF';
import { Send, Download, Building2, RefreshCw, Bot, User, FileText } from 'lucide-react';
import './App.css';

type Message = {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  data?: unknown;
};

type ConversationStep = 
  | 'welcome'
  | 'program-name'
  | 'program-type'
  | 'staff-count'
  | 'last-operational-date'
  | 'closeout-date'
  | 'building-name'
  | 'building-address'
  | 'primary-contact-name'
  | 'primary-contact-title'
  | 'primary-contact-email'
  | 'primary-contact-phone'
  | 'equipment-count'
  | 'equipment-details'
  | 'furniture-count'
  | 'furniture-details'
  | 'accounts-count'
  | 'accounts-details'
  | 'final-vacate-date'
  | 'special-requirements'
  | 'review'
  | 'complete';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [closeoutData, setCloseoutData] = useState<Partial<CloseoutDetails>>({
    equipment: [],
    furniture: [],
    m365Accounts: [],
    networkingRequirements: {
      wifiAccessPoints: 0,
      networkPrinters: 0,
      sharedDrives: [],
    },
    physicalMoveRequirements: {
      packingRequired: false,
      elevatorRequired: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        "👋 Hi! I'm your BronxWorks Program Closeout Assistant. I'll help you gather all the information needed for a smooth program closure.\n\nThis usually takes about 15-20 minutes, and I'll generate a professional PDF report for your IT and Operations teams when we're done.\n\nReady to get started? Just type 'yes' or 'let's begin'!",
        'welcome'
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addBotMessage = (content: string, step?: ConversationStep) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
      if (step) setCurrentStep(step);
    }, 1000);
  };

  const addUserMessage = (content: string, data?: unknown) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      data
    }]);
  };

  const handleStartNew = () => {
    if (window.confirm('Are you sure you want to start a new closeout? This will clear all current progress.')) {
      setMessages([]);
      setCurrentStep('welcome');
      setCloseoutData({
        equipment: [],
        furniture: [],
        m365Accounts: [],
        networkingRequirements: {
          wifiAccessPoints: 0,
          networkPrinters: 0,
          sharedDrives: [],
        },
        physicalMoveRequirements: {
          packingRequired: false,
          elevatorRequired: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setUserInput('');
      localStorage.removeItem('closeoutDraft');
    }
  };

  const processUserInput = () => {
    if (!userInput.trim()) return;

    const input = userInput.trim();
    addUserMessage(input);
    setUserInput('');

    // Process based on current step
    switch (currentStep) {
      case 'welcome':
        if (input.toLowerCase().includes('yes') || input.toLowerCase().includes('start') || 
            input.toLowerCase().includes('begin') || input.toLowerCase().includes('ready')) {
          setCloseoutData(prev => ({ ...prev, createdAt: new Date() }));
          addBotMessage(
            "Perfect! Let's start with the basics.\n\n📋 **Program Information**\n\nWhat's the name of the program you're closing out?",
            'program-name'
          );
        } else {
          addBotMessage(
            "No problem! When you're ready to begin the closeout process, just let me know by typing 'yes' or 'start'."
          );
        }
        break;

      case 'program-name':
        setCloseoutData(prev => ({ ...prev, programName: input }));
        addBotMessage(
          `Got it! "${input}" is being closed out.\n\nWhat type of program is this? (e.g., Education, Social Services, Youth Development, etc.)`,
          'program-type'
        );
        break;

      case 'program-type':
        setCloseoutData(prev => ({ ...prev, programType: input }));
        addBotMessage(
          "Great! Now I need to know about your team size.\n\n👥 How many total staff members are currently working in this program?",
          'staff-count'
        );
        break;

      case 'staff-count':
        {
          const staffCount = parseInt(input);
        if (isNaN(staffCount) || staffCount < 1) {
          addBotMessage("Please enter a valid number of staff members (at least 1).");
          return;
        }
          setCloseoutData(prev => ({ ...prev, totalStaff: staffCount }));
          addBotMessage(
            "Perfect! Now let's establish the timeline.\n\n📅 **Important Dates**\n\nWhat's the last operational date? (When will the program stop serving clients?) Please use MM/DD/YYYY format.",
            'last-operational-date'
          );
        }
        break;

      case 'last-operational-date':
        {
          const datePattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(\d{4})$/;
          if (!datePattern.test(input)) {
            addBotMessage("Please enter the date in MM/DD/YYYY format (e.g., 12/31/2024).");
            return;
          }
          const lastOpDate = new Date(input);
          setCloseoutData(prev => ({ ...prev, lastOperationalDate: lastOpDate }));
          addBotMessage(
            "And what's your target complete closeout date? (When should everything be fully closed and vacated?) MM/DD/YYYY format.",
            'closeout-date'
          );
        }
        break;

      case 'closeout-date':
        {
          const datePattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(\d{4})$/;
          if (!datePattern.test(input)) {
            addBotMessage("Please enter the date in MM/DD/YYYY format (e.g., 01/15/2025).");
            return;
          }
          const closeoutDate = new Date(input);
          setCloseoutData(prev => ({ ...prev, closeoutDate }));
          addBotMessage(
            "Excellent! Now let's get the location details.\n\n🏢 **Location Information**\n\nWhat's the name of the building where this program is located?",
            'building-name'
          );
        }
        break;

      case 'building-name':
        setCloseoutData(prev => ({
          ...prev,
          location: { 
            building: input,
            address: prev.location?.address || '',
            floor: prev.location?.floor,
            roomNumbers: prev.location?.roomNumbers
          }
        }));
        addBotMessage(
          "Got it! Now I need the complete address for pickup coordination.\n\nWhat's the full address of this location? (Include street, city, state, ZIP)",
          'building-address'
        );
        break;

      case 'building-address':
        setCloseoutData(prev => ({
          ...prev,
          location: { 
            building: prev.location?.building || '',
            address: input,
            floor: prev.location?.floor,
            roomNumbers: prev.location?.roomNumbers
          }
        }));
        addBotMessage(
          "Perfect! Now let's get your contact information.\n\n📞 **Primary Contact**\n\nWho should be the primary contact for this closeout? Please provide their full name.",
          'primary-contact-name'
        );
        break;

      case 'primary-contact-name':
        setCloseoutData(prev => ({
          ...prev,
          primaryContact: { 
            name: input,
            title: prev.primaryContact?.title || '',
            email: prev.primaryContact?.email || '',
            phone: prev.primaryContact?.phone || '',
            department: prev.primaryContact?.department
          }
        }));
        addBotMessage(
          "What's their job title?",
          'primary-contact-title'
        );
        break;

      case 'primary-contact-title':
        setCloseoutData(prev => ({
          ...prev,
          primaryContact: { 
            name: prev.primaryContact?.name || '',
            title: input,
            email: prev.primaryContact?.email || '',
            phone: prev.primaryContact?.phone || '',
            department: prev.primaryContact?.department
          }
        }));
        addBotMessage(
          "What's their email address?",
          'primary-contact-email'
        );
        break;

      case 'primary-contact-email':
        {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input)) {
            addBotMessage("Please enter a valid email address (e.g., name@bronxworks.org).");
            return;
          }
          setCloseoutData(prev => ({
            ...prev,
            primaryContact: { 
              name: prev.primaryContact?.name || '',
              title: prev.primaryContact?.title || '',
              email: input,
              phone: prev.primaryContact?.phone || '',
              department: prev.primaryContact?.department
            }
          }));
        }
        addBotMessage(
          "And their phone number?",
          'primary-contact-phone'
        );
        break;

      case 'primary-contact-phone':
        setCloseoutData(prev => ({
          ...prev,
          primaryContact: { 
            name: prev.primaryContact?.name || '',
            title: prev.primaryContact?.title || '',
            email: prev.primaryContact?.email || '',
            phone: input,
            department: prev.primaryContact?.department
          }
        }));
        addBotMessage(
          "Great! Now let's inventory the equipment.\n\n💻 **IT Equipment**\n\nHow many pieces of IT equipment do you have? (computers, printers, phones, tablets, etc.) Just give me a rough count.",
          'equipment-count'
        );
        break;

      case 'equipment-count':
        {
          const equipmentCount = parseInt(input);
        if (isNaN(equipmentCount) || equipmentCount < 0) {
          addBotMessage("Please enter a valid number (0 or more).");
          return;
        }
        
        if (equipmentCount === 0) {
          addBotMessage(
            "No equipment to track - that makes things easier!\n\n🪑 **Furniture**\n\nHow many pieces of furniture do you have? (desks, chairs, tables, cabinets, etc.)",
            'furniture-count'
          );
        } else {
          addBotMessage(
            `${equipmentCount} pieces of equipment - got it!\n\nCan you list them for me? Please describe each item like this:\n"Desktop computer - Dell OptiPlex, Asset Tag: BW001234, Room 101"\n\nJust list them one per line, or describe them however works best for you.`,
            'equipment-details'
          );
        }
        }
        break;

      case 'equipment-details':
        {
          // Parse equipment details and create equipment objects
          const equipmentLines = input.split('\n').filter(line => line.trim());
          const equipment = equipmentLines.map((line, index) => ({
          id: (Date.now() + index).toString(),
          type: 'other' as const,
          description: line.trim(),
          quantity: 1,
          location: '',
          assetTag: '',
          specialInstructions: ''
        }));
        
          setCloseoutData(prev => ({ ...prev, equipment }));
          addBotMessage(
            "Perfect! I've catalogued all that equipment.\n\n🪑 **Furniture**\n\nHow many pieces of furniture do you have? (desks, chairs, tables, cabinets, etc.)",
            'furniture-count'
          );
        }
        break;

      case 'furniture-count':
        {
          const furnitureCount = parseInt(input);
        if (isNaN(furnitureCount) || furnitureCount < 0) {
          addBotMessage("Please enter a valid number (0 or more).");
          return;
        }
        
        if (furnitureCount === 0) {
          addBotMessage(
            "No furniture to track!\n\n👤 **Microsoft 365 Accounts**\n\nHow many staff email accounts need to be deactivated?",
            'accounts-count'
          );
        } else {
          addBotMessage(
            `${furnitureCount} pieces of furniture.\n\nCan you list the furniture items? Please include what they are and their condition:\n"3 desks - good condition"\n"6 office chairs - fair condition"\n"1 conference table - poor condition"\n\nList them however works for you.`,
            'furniture-details'
          );
        }
        }
        break;

      case 'furniture-details':
        {
          const furnitureLines = input.split('\n').filter(line => line.trim());
          const furniture = furnitureLines.map((line, index) => ({
          id: (Date.now() + index).toString(),
          type: 'other' as const,
          description: line.trim(),
          quantity: 1,
          condition: 'good' as const,
          disposition: 'transfer' as const,
          location: ''
        }));
        
          setCloseoutData(prev => ({ ...prev, furniture }));
          addBotMessage(
            "Great! I've noted all the furniture.\n\n👤 **Microsoft 365 Accounts**\n\nHow many staff email accounts need to be deactivated?",
            'accounts-count'
          );
        }
        break;

      case 'accounts-count':
        {
          const accountsCount = parseInt(input);
        if (isNaN(accountsCount) || accountsCount < 0) {
          addBotMessage("Please enter a valid number (0 or more).");
          return;
        }
        
        if (accountsCount === 0) {
          addBotMessage(
            "No email accounts to deactivate.\n\n📅 **Final Timeline**\n\nWhat's your final vacate date? (When will the space be completely empty?) MM/DD/YYYY format.",
            'final-vacate-date'
          );
        } else {
          addBotMessage(
            `${accountsCount} email accounts to handle.\n\nCan you list the staff members and their email addresses? Like this:\n"John Smith - jsmith@bronxworks.org"\n"Jane Doe - jdoe@bronxworks.org"\n\nJust list them however is easiest for you.`,
            'accounts-details'
          );
        }
        }
        break;

      case 'accounts-details':
        {
          const accountLines = input.split('\n').filter(line => line.trim());
          const m365Accounts = accountLines.map((line, index) => {
          const parts = line.split('-').map(p => p.trim());
          return {
            id: (Date.now() + index).toString(),
            employeeName: parts[0] || line.trim(),
            email: parts[1] || '',
            userName: parts[1] || '',
            dataBackupRequired: true,
            backupInstructions: ''
          };
        });
        
          setCloseoutData(prev => ({ ...prev, m365Accounts }));
          addBotMessage(
            "Perfect! I've recorded all the email accounts.\n\n📅 **Final Timeline**\n\nWhat's your final vacate date? (When will the space be completely empty?) MM/DD/YYYY format.",
            'final-vacate-date'
          );
        }
        break;

      case 'final-vacate-date':
        {
          const datePattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(\d{4})$/;
          if (!datePattern.test(input)) {
            addBotMessage("Please enter the date in MM/DD/YYYY format (e.g., 02/28/2025).");
            return;
          }
          const finalVacateDate = new Date(input);
          setCloseoutData(prev => ({
            ...prev,
            timeline: { 
              finalVacateDate,
              equipmentPickupDate: prev.timeline?.equipmentPickupDate,
              furniturePickupDate: prev.timeline?.furniturePickupDate,
              keyReturnDate: prev.timeline?.keyReturnDate
            }
          }));
        }
        addBotMessage(
          "Almost done! \n\n📝 **Special Requirements**\n\nAre there any special requirements, access restrictions, or important notes I should include in the report? (Or just type 'none' if there aren't any)",
          'special-requirements'
        );
        break;

      case 'special-requirements':
        {
          if (input.toLowerCase() !== 'none') {
            setCloseoutData(prev => ({ ...prev, specialRequirements: input }));
          }
          
          // Generate summary and move to review
          const summary = generateSummary();
          addBotMessage(
            `Excellent! I have all the information I need. Here's a summary:\n\n${summary}\n\nDoes this look correct? Type 'yes' to generate your PDF report, or 'edit' if you need to make changes.`,
            'review'
          );
        }
        break;

      case 'review':
        if (input.toLowerCase().includes('yes') || input.toLowerCase().includes('correct') || 
            input.toLowerCase().includes('good') || input.toLowerCase().includes('generate')) {
          addBotMessage(
            "🎉 Perfect! Generating your comprehensive closeout report now...",
            'complete'
          );
        } else {
          addBotMessage(
            "No problem! Let me know what needs to be changed and I'll help you update it. What would you like to modify?"
          );
        }
        break;

      default:
        addBotMessage("I'm not sure how to help with that. Let me know if you need assistance!");
    }
  };

  const generateSummary = () => {
    return `📋 **${closeoutData.programName}** (${closeoutData.programType})
👥 ${closeoutData.totalStaff} staff members
🏢 ${closeoutData.location?.building} - ${closeoutData.location?.address}
📞 Contact: ${closeoutData.primaryContact?.name} (${closeoutData.primaryContact?.email})
💻 ${closeoutData.equipment?.length || 0} pieces of equipment
🪑 ${closeoutData.furniture?.length || 0} furniture items  
👤 ${closeoutData.m365Accounts?.length || 0} email accounts
📅 Final vacate: ${closeoutData.timeline?.finalVacateDate?.toLocaleDateString()}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      processUserInput();
    }
  };

  const ConversationInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-pink-500 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BronxWorks Closeout Assistant</h1>
              <p className="text-sm text-gray-600">Guided program closure process</p>
            </div>
          </div>
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <div className="bg-gradient-to-r from-teal-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-teal-500 text-white ml-12'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              {message.type === 'user' && (
                <div className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-teal-600" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="bg-gradient-to-r from-teal-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={processUserInput}
              disabled={!userInput.trim() || isTyping}
              className="bg-gradient-to-r from-teal-500 to-pink-500 hover:from-teal-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CompletionScreen = () => {
    const completeData = closeoutData as CloseoutDetails;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-pink-50 flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Closeout Complete!</h1>
                <p className="text-sm text-gray-600">Your report is ready for download</p>
              </div>
            </div>
            <button
              onClick={handleStartNew}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Start New
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="bg-gradient-to-r from-teal-500 to-pink-500 w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 All Done!
            </h2>
            <p className="text-gray-600 mb-8">
              Your comprehensive closeout report for <strong>{completeData?.programName}</strong> is ready. 
              This PDF contains all the information IT and Operations need for a smooth closure.
            </p>
            
            <div className="space-y-4">
              <PDFDownloadLink
                document={<CloseoutPDF data={completeData} />}
                fileName={`${completeData?.programName?.replace(/\s+/g, '_')}_Closeout_${new Date().toISOString().split('T')[0]}.pdf`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-pink-600 transition-all w-full justify-center"
              >
                {({ loading }) => (
                  <>
                    <Download className="w-5 h-5" />
                    {loading ? 'Generating PDF...' : 'Download PDF Report'}
                  </>
                )}
              </PDFDownloadLink>
              
              <button
                onClick={handleStartNew}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all w-full justify-center"
              >
                <RefreshCw className="w-5 h-5" />
                Start Another Closeout
              </button>
            </div>

            <div className="mt-8 p-4 bg-teal-50 rounded-xl text-left">
              <h4 className="font-semibold text-gray-900 mb-2">📧 Next Steps:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Email the PDF to IT Operations (it-ops@bronxworks.org)</li>
                <li>• Share with your administrative team</li>
                <li>• Schedule equipment pickup coordination</li>
                <li>• Monitor progress and provide updates as needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return currentStep === 'complete' && closeoutData.programName ? (
    <CompletionScreen />
  ) : (
    <ConversationInterface />
  );
}

export default App;