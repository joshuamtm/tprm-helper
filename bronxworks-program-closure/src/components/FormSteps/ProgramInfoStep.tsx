import { useFormContext } from 'react-hook-form';
import { Building, Calendar, FileText, AlertCircle, Lightbulb } from 'lucide-react';
import type { ProgramClosureData } from '../../types/program-closure';

export function ProgramInfoStep() {
  const { register, formState: { errors }, watch } = useFormContext<ProgramClosureData>();
  
  const watchedClosureDate = watch('programDetails.closureDate');
  const watchedLastServiceDate = watch('programDetails.lastServiceDate');

  return (
    <div className="space-y-8">
      {/* Guidance Panel */}
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Program Information Guidance</h3>
        </div>
        <p className="text-blue-800 mb-3">
          This information helps us understand your program and coordinate the closure timeline with all departments.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• <strong>Program Name:</strong> Official name as it appears in organizational records</li>
          <li>• <strong>Program Type:</strong> Category that best describes your program's function</li>
          <li>• <strong>Last Service Date:</strong> When you'll stop serving clients/participants</li>
          <li>• <strong>Closure Date:</strong> When all activities and presence will end</li>
          <li>• <strong>Staff Count:</strong> Total number of people who work in this program</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Program Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-bronx-600" />
            <h3 className="text-xl font-semibold text-gray-900">Program Details</h3>
          </div>

          <div>
            <label className="form-label">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('programDetails.programName')}
              className="form-input"
              placeholder="e.g., Youth Development Center"
            />
            {errors.programDetails?.programName && (
              <p className="form-error">{errors.programDetails.programName.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Program Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('programDetails.programType')}
              className="form-input"
            >
              <option value="">Select program type...</option>
              <option value="youth-services">Youth Services</option>
              <option value="adult-education">Adult Education</option>
              <option value="workforce-development">Workforce Development</option>
              <option value="social-services">Social Services</option>
              <option value="community-programs">Community Programs</option>
              <option value="health-wellness">Health & Wellness</option>
              <option value="senior-services">Senior Services</option>
              <option value="housing-assistance">Housing Assistance</option>
              <option value="food-nutrition">Food & Nutrition</option>
              <option value="other">Other</option>
            </select>
            {errors.programDetails?.programType && (
              <p className="form-error">{errors.programDetails.programType.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Program Description
            </label>
            <textarea
              {...register('programDetails.description')}
              className="form-input h-24 resize-none"
              placeholder="Brief description of the program's purpose and activities..."
            />
            <p className="form-help">
              This helps teams understand the program's function and any special considerations.
            </p>
            {errors.programDetails?.description && (
              <p className="form-error">{errors.programDetails.description.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Staff Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              {...register('programDetails.staffCount', { valueAsNumber: true })}
              className="form-input"
              placeholder="0"
            />
            <p className="form-help">
              Total number of staff members working in this program.
            </p>
            {errors.programDetails?.staffCount && (
              <p className="form-error">{errors.programDetails.staffCount.message}</p>
            )}
          </div>
        </div>

        {/* Timeline and Additional Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Timeline Information</h3>
          </div>

          <div>
            <label className="form-label">
              Last Service Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('programDetails.lastServiceDate', { valueAsDate: true })}
              className="form-input"
            />
            <p className="form-help">
              The last day this program will provide services to clients/participants.
            </p>
            {errors.programDetails?.lastServiceDate && (
              <p className="form-error">{errors.programDetails.lastServiceDate.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Program Closure Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('programDetails.closureDate', { valueAsDate: true })}
              className="form-input"
            />
            <p className="form-help">
              When all program activities will cease and the space will be vacated.
            </p>
            {errors.programDetails?.closureDate && (
              <p className="form-error">{errors.programDetails.closureDate.message}</p>
            )}
          </div>

          {/* Timeline Warning */}
          {watchedLastServiceDate && watchedClosureDate && 
           new Date(watchedClosureDate) < new Date(watchedLastServiceDate) && (
            <div className="warning-panel">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-warning-800 font-semibold">Timeline Check</p>
                  <p className="text-warning-700 text-sm">
                    The closure date should typically be on or after the last service date to allow for proper wind-down activities.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="form-label">
              Organizational Structure
            </label>
            <textarea
              {...register('programDetails.organizationalStructure')}
              className="form-input h-20 resize-none"
              placeholder="Describe reporting structure, teams, or departments within this program..."
            />
            <p className="form-help">
              Information about how the program is organized (optional but helpful).
            </p>
            {errors.programDetails?.organizationalStructure && (
              <p className="form-error">{errors.programDetails.organizationalStructure.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Compliance Requirements
            </label>
            <textarea
              {...register('programDetails.complianceRequirements')}
              className="form-input h-20 resize-none"
              placeholder="Any specific regulatory, licensing, or compliance requirements..."
            />
            <p className="form-help">
              Special compliance considerations that may affect closure procedures.
            </p>
          </div>
        </div>
      </div>

      {/* Success Tips */}
      <div className="success-panel">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-success-900 mb-2">Why This Information Matters</h4>
            <ul className="text-success-800 text-sm space-y-1">
              <li>• Program details help IT and Operations understand the scope and complexity</li>
              <li>• Timeline information ensures proper coordination between departments</li>
              <li>• Staff count helps estimate equipment, furniture, and user account quantities</li>
              <li>• Compliance requirements ensure all regulatory obligations are met</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}