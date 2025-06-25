import { useFormContext } from 'react-hook-form';
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import type { ProgramClosureData } from '../../types/program-closure';

export function ReviewStep() {
  const { watch, formState: { errors } } = useFormContext<ProgramClosureData>();
  
  const formData = watch();
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-8">
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Review & Submission</h3>
        </div>
        <p className="text-blue-800">
          Review all information for accuracy before submitting your program closure request.
        </p>
      </div>

      {hasErrors ? (
        <div className="warning-panel">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-warning-900 mb-2">Please Complete Required Fields</h4>
              <p className="text-warning-800 text-sm">
                Some required information is missing. Please go back and complete all required fields before submitting.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="success-panel">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <h4 className="font-semibold text-success-900">Ready to Submit</h4>
          </div>
          <p className="text-success-800 text-sm mt-2">
            All required information has been provided. You can submit your program closure request.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Program Information</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Program Name:</strong> {formData.programDetails?.programName || 'Not provided'}</p>
            <p><strong>Program Type:</strong> {formData.programDetails?.programType || 'Not provided'}</p>
            <p><strong>Staff Count:</strong> {formData.programDetails?.staffCount || 0}</p>
            <p><strong>Closure Date:</strong> {formData.programDetails?.closureDate ? new Date(formData.programDetails.closureDate).toLocaleDateString() : 'Not provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Primary Contact</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Name:</strong> {formData.primaryContact?.name || 'Not provided'}</p>
            <p><strong>Title:</strong> {formData.primaryContact?.title || 'Not provided'}</p>
            <p><strong>Email:</strong> {formData.primaryContact?.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> {formData.primaryContact?.phone || 'Not provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Location</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p><strong>Building:</strong> {formData.location?.building || 'Not provided'}</p>
            <p><strong>Floor:</strong> {formData.location?.floor || 'Not provided'}</p>
            <p><strong>Rooms:</strong> {formData.location?.roomNumbers?.join(', ') || 'None listed'}</p>
            <p><strong>Address:</strong> {formData.location?.address || 'Not provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              After submission, you will receive:
            </p>
            <ul className="text-blue-700 text-sm mt-2 space-y-1">
              <li>• Comprehensive closure coordination reports</li>
              <li>• Stakeholder notification summaries</li>
              <li>• Timeline and checklist for tracking progress</li>
              <li>• Compliance documentation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Submit?</h3>
          <p className="text-gray-600 mb-6">
            By submitting this form, you're initiating the program closure coordination process. 
            All relevant departments will be notified and coordination will begin based on your provided timeline.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              <strong>What happens next:</strong> You'll receive comprehensive reports for each stakeholder team, 
              and the closure coordination process will begin according to your specified timeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}