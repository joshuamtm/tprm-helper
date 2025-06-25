import { useState } from 'react';
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  RotateCcw, 
  Users, 
  Monitor, 
  Building, 
  Clock,
  CheckCircle,
  Share2,
  Printer
} from 'lucide-react';
import type { ReportData } from '../types/program-closure';

interface ReportViewerProps {
  report: ReportData;
  onBack: () => void;
  onStartOver: () => void;
}

type ReportType = 'comprehensive' | 'it-operations' | 'admin-operations' | 'timeline' | 'compliance';

export function ReportViewer({ report, onBack, onStartOver }: ReportViewerProps) {
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('comprehensive');

  const reportTypes = [
    {
      id: 'comprehensive' as ReportType,
      name: 'Comprehensive Report',
      icon: FileText,
      description: 'Complete overview for all stakeholders',
      audience: 'All Teams'
    },
    {
      id: 'it-operations' as ReportType,
      name: 'IT Operations Report',
      icon: Monitor,
      description: 'Equipment, accounts, and technical details',
      audience: 'IT Operations Team'
    },
    {
      id: 'admin-operations' as ReportType,
      name: 'Administrative Report',
      icon: Building,
      description: 'Furniture, logistics, and coordination',
      audience: 'Administrative/Operations Team'
    },
    {
      id: 'timeline' as ReportType,
      name: 'Timeline & Checklist',
      icon: Clock,
      description: 'Key dates and action items',
      audience: 'Program Director'
    },
    {
      id: 'compliance' as ReportType,
      name: 'Compliance Documentation',
      icon: CheckCircle,
      description: 'Audit trail and regulatory requirements',
      audience: 'Compliance/Audit'
    }
  ];

  const selectedReport = reportTypes.find(r => r.id === selectedReportType);

  const handleDownloadPDF = () => {
    // This would integrate with @react-pdf/renderer
    console.log(`Downloading ${selectedReportType} report as PDF`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log(`Sharing ${selectedReportType} report`);
  };

  const renderReportContent = () => {
    const { programClosure } = report;

    switch (selectedReportType) {
      case 'comprehensive':
        return (
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Closure Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Program Details</h3>
                  <p><strong>Name:</strong> {programClosure.programDetails.programName}</p>
                  <p><strong>Type:</strong> {programClosure.programDetails.programType}</p>
                  <p><strong>Staff Count:</strong> {programClosure.programDetails.staffCount}</p>
                  <p><strong>Closure Date:</strong> {new Date(programClosure.programDetails.closureDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Primary Contact</h3>
                  <p><strong>Name:</strong> {programClosure.primaryContact.name}</p>
                  <p><strong>Title:</strong> {programClosure.primaryContact.title}</p>
                  <p><strong>Email:</strong> {programClosure.primaryContact.email}</p>
                  <p><strong>Phone:</strong> {programClosure.primaryContact.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Building:</strong> {programClosure.location.building}</p>
                {programClosure.location.floor && <p><strong>Floor:</strong> {programClosure.location.floor}</p>}
                <p><strong>Rooms:</strong> {programClosure.location.roomNumbers.join(', ')}</p>
                <p><strong>Address:</strong> {programClosure.location.address}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assets Overview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-blue-900">{programClosure.itEquipment.length}</p>
                  <p className="text-blue-700 text-sm">IT Equipment Items</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-900">{programClosure.furniture.length}</p>
                  <p className="text-green-700 text-sm">Furniture Items</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold text-purple-900">{programClosure.userAccounts.length}</p>
                  <p className="text-purple-700 text-sm">User Accounts</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-bronx-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-bronx-600" />
                  <span className="text-bronx-900">IT Operations team will be notified for equipment coordination</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-900">Administrative team will coordinate furniture and logistics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">Timeline coordination will begin based on specified dates</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'it-operations':
        return (
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">IT Operations Report</h2>
              <p className="text-gray-600">Equipment, accounts, and technical coordination details</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Action Items for IT Operations</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  Schedule equipment pickup from {programClosure.location.building}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  Coordinate data backup and security wipe procedures
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  Plan user account deactivation ({programClosure.userAccounts.length} accounts)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  Review network infrastructure requirements
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Total IT Equipment Items:</strong> {programClosure.itEquipment.length}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Detailed equipment inventory and specifications will be provided in the full technical report.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Primary Contact:</strong> {programClosure.primaryContact.name}</p>
                <p><strong>Email:</strong> {programClosure.primaryContact.email}</p>
                <p><strong>Phone:</strong> {programClosure.primaryContact.phone}</p>
                <p><strong>Preferred Contact:</strong> {programClosure.primaryContact.preferredContact}</p>
              </div>
            </div>
          </div>
        );

      case 'admin-operations':
        return (
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Administrative Operations Report</h2>
              <p className="text-gray-600">Furniture, logistics, and coordination requirements</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Action Items for Administrative Team</h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Coordinate furniture removal and disposition
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Plan physical moving and logistics coordination
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Schedule final space inspection and key return
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Coordinate with facilities for space preparation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p><strong>Building:</strong> {programClosure.location.building}</p>
                <p><strong>Floor:</strong> {programClosure.location.floor || 'Not specified'}</p>
                <p><strong>Rooms:</strong> {programClosure.location.roomNumbers.join(', ')}</p>
                <p><strong>Access Requirements:</strong> {programClosure.location.accessRestrictions || 'Standard access'}</p>
                <p><strong>Key Return Required:</strong> {programClosure.location.keyReturnRequired ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline & Checklist</h2>
              <p className="text-gray-600">Key dates and action items for program director</p>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Key Dates</h3>
                <div className="space-y-2 text-yellow-800">
                  <p><strong>Last Service Date:</strong> {new Date(programClosure.programDetails.lastServiceDate).toLocaleDateString()}</p>
                  <p><strong>Program Closure Date:</strong> {new Date(programClosure.programDetails.closureDate).toLocaleDateString()}</p>
                  <p><strong>Final Vacate Date:</strong> {new Date(programClosure.timeline.finalVacateDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Closure Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-bronx-600" />
                    <span>Notify all staff of closure timeline</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-bronx-600" />
                    <span>Coordinate with IT for equipment collection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-bronx-600" />
                    <span>Schedule furniture removal with Operations</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-bronx-600" />
                    <span>Complete final space cleaning and inspection</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="w-4 h-4 text-bronx-600" />
                    <span>Return keys and access cards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Documentation</h2>
              <p className="text-gray-600">Audit trail and regulatory compliance information</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Closure Documentation</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p><strong>Request ID:</strong> {programClosure.id}</p>
                <p><strong>Submitted:</strong> {new Date(programClosure.submittedAt || new Date()).toLocaleString()}</p>
                <p><strong>Created By:</strong> {programClosure.createdBy}</p>
                <p><strong>Status:</strong> {programClosure.status}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Trail</h3>
              <div className="space-y-2">
                {programClosure.auditTrail.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-bronx-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.action}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.timestamp).toLocaleString()} - {event.user}
                      </p>
                      {event.notes && <p className="text-sm text-gray-500">{event.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Report content not available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bronx-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Program Closure Reports</h1>
              <p className="text-gray-600 mt-2">
                Generated on {report.generatedAt.toLocaleString()} for {report.programClosure.programDetails.programName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Form
              </button>
              <button
                onClick={onStartOver}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </div>

          {/* Report Type Selector */}
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((reportType) => {
              const Icon = reportType.icon;
              const isSelected = selectedReportType === reportType.id;
              
              return (
                <button
                  key={reportType.id}
                  onClick={() => setSelectedReportType(reportType.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isSelected
                      ? 'bg-bronx-100 text-bronx-800 border-bronx-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {reportType.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-bronx-500 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedReport && (
                  <>
                    <selectedReport.icon className="w-6 h-6" />
                    <div>
                      <h2 className="text-xl font-semibold">{selectedReport.name}</h2>
                      <p className="text-blue-100">{selectedReport.description}</p>
                      <p className="text-sm text-blue-200">For: {selectedReport.audience}</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  title="Share Report"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  title="Print Report"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Report Body */}
          <div className="p-8">
            {renderReportContent()}
          </div>
        </div>

        {/* Success Message */}
        <div className="success-panel mt-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-success-900 mb-2">Program Closure Request Submitted Successfully</h4>
              <p className="text-success-800 text-sm">
                Your program closure request has been submitted and all relevant departments have been notified. 
                You can download these reports and refer to them throughout the closure process. 
                Each stakeholder team will receive their specific report automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}