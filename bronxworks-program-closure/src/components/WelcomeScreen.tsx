import { 
  Building2, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  FileText,
  AlertCircle,
  Lightbulb,
  Target
} from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bronx-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-bronx-500 to-blue-600 p-3 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              BronxWorks Program Closure Coordination
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Efficiently coordinate program closures across multiple departments while ensuring 
            nothing is missed, no resources are wasted, and all stakeholders have the information they need.
          </p>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card p-6 text-center">
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete Information Capture</h3>
            <p className="text-gray-600">
              Guided process ensures 100% of required information is captured for successful program closure.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="bg-bronx-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-bronx-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Department Coordination</h3>
            <p className="text-gray-600">
              Automatically generates appropriate outputs for IT, Operations, and Administrative teams.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Efficient</h3>
            <p className="text-gray-600">
              Complete the entire process in 15-20 minutes with smart guidance and validation.
            </p>
          </div>
        </div>

        {/* Process Overview */}
        <div className="card p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-bronx-600" />
            <h2 className="text-2xl font-bold text-gray-900">What This Process Will Accomplish</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-bronx-600" />
                Information We'll Collect
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Program details and operational timeline
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Contact information and communication preferences
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Complete IT equipment and asset inventory
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Furniture and physical asset details
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Digital assets and user account information
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Logistics and coordination requirements
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Reports We'll Generate
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Comprehensive report for IT Operations team
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Summary for Administrative/Operations team
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Timeline and checklist for program director
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Documentation for compliance and audit
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                  Stakeholder notification summaries
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guidance Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="guidance-panel">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Before You Begin</h3>
            </div>
            <p className="text-blue-800 mb-3">
              Having this information ready will help you complete the process efficiently:
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Program closure and final service dates</li>
              <li>• Contact information for primary and backup contacts</li>
              <li>• Building and room location details</li>
              <li>• Rough inventory of IT equipment and furniture</li>
              <li>• List of user accounts needing deactivation</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Quality Assurance</h3>
            </div>
            <p className="text-green-800 mb-3">
              Our system includes built-in validation to ensure:
            </p>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• All required information is provided</li>
              <li>• Dates and timelines are realistic</li>
              <li>• Contact information is valid</li>
              <li>• Nothing critical is missed or overlooked</li>
              <li>• Compliance requirements are addressed</li>
            </ul>
          </div>
        </div>

        {/* Important Notice */}
        <div className="warning-panel mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-warning-900 mb-2">Important Notice</h3>
              <p className="text-warning-800">
                This system handles sensitive organizational information. All data is processed securely 
                and in compliance with BronxWorks policies. Your session will automatically save progress, 
                and you can return to complete the form later if needed.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-bronx-500 to-blue-600 hover:from-bronx-600 hover:to-blue-700 text-white font-semibold px-12 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Begin Program Closure Process
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            This process typically takes 15-20 minutes to complete
          </p>
        </div>
      </div>
    </div>
  );
}