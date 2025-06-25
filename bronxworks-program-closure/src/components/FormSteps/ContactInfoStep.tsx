import { useFormContext } from 'react-hook-form';
import { Users, Phone, UserPlus, Lightbulb, CheckCircle } from 'lucide-react';
import type { ProgramClosureData } from '../../types/program-closure';

export function ContactInfoStep() {
  const { register, formState: { errors }, watch } = useFormContext<ProgramClosureData>();
  
  const hasAlternateContact = watch('alternateContact.name');

  return (
    <div className="space-y-8">
      {/* Guidance Panel */}
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Contact Information Guidance</h3>
        </div>
        <p className="text-blue-800 mb-3">
          We need reliable contact information to coordinate closure activities and ask questions as they arise.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• <strong>Primary Contact:</strong> The main person responsible for closure coordination</li>
          <li>• <strong>Alternate Contact:</strong> Backup person in case primary contact is unavailable</li>
          <li>• <strong>Availability:</strong> When you're typically available for calls or meetings</li>
          <li>• <strong>Communication Preference:</strong> How you prefer to be contacted</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Primary Contact */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-bronx-600" />
            <h3 className="text-xl font-semibold text-gray-900">Primary Contact</h3>
            <span className="text-red-500 text-sm">* Required</span>
          </div>

          <div>
            <label className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('primaryContact.name')}
              className="form-input"
              placeholder="e.g., Jane Smith"
            />
            {errors.primaryContact?.name && (
              <p className="form-error">{errors.primaryContact.name.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('primaryContact.title')}
              className="form-input"
              placeholder="e.g., Program Director"
            />
            {errors.primaryContact?.title && (
              <p className="form-error">{errors.primaryContact.title.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('primaryContact.email')}
              className="form-input"
              placeholder="e.g., jane.smith@bronxworks.org"
            />
            {errors.primaryContact?.email && (
              <p className="form-error">{errors.primaryContact.email.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register('primaryContact.phone')}
              className="form-input"
              placeholder="e.g., (718) 555-0123"
            />
            <p className="form-help">
              Include extension if applicable (e.g., (718) 555-0123 ext. 456)
            </p>
            {errors.primaryContact?.phone && (
              <p className="form-error">{errors.primaryContact.phone.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Department
            </label>
            <input
              type="text"
              {...register('primaryContact.department')}
              className="form-input"
              placeholder="e.g., Youth Services"
            />
            <p className="form-help">
              Department or division within BronxWorks
            </p>
          </div>

          <div>
            <label className="form-label">
              Availability
            </label>
            <input
              type="text"
              {...register('primaryContact.availability')}
              className="form-input"
              placeholder="e.g., Monday-Friday 9am-5pm, best before 3pm"
            />
            <p className="form-help">
              When you're typically available for coordination calls or meetings
            </p>
          </div>

          <div>
            <label className="form-label">
              Preferred Contact Method
            </label>
            <select
              {...register('primaryContact.preferredContact')}
              className="form-input"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="both">Both Email and Phone</option>
            </select>
            <p className="form-help">
              How you prefer to be contacted for updates and questions
            </p>
          </div>
        </div>

        {/* Alternate Contact */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Alternate Contact</h3>
            <span className="text-gray-500 text-sm">Optional but Recommended</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Why Provide an Alternate Contact?</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Ensures continuity if primary contact becomes unavailable</li>
                  <li>• Provides backup for urgent questions or coordination needs</li>
                  <li>• Reduces delays in the closure process</li>
                  <li>• Gives peace of mind that closure will proceed smoothly</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">
              Full Name
            </label>
            <input
              type="text"
              {...register('alternateContact.name')}
              className="form-input"
              placeholder="e.g., John Doe"
            />
            {errors.alternateContact?.name && (
              <p className="form-error">{errors.alternateContact.name.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Job Title
            </label>
            <input
              type="text"
              {...register('alternateContact.title')}
              className="form-input"
              placeholder="e.g., Assistant Program Director"
            />
            {errors.alternateContact?.title && (
              <p className="form-error">{errors.alternateContact.title.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              {...register('alternateContact.email')}
              className="form-input"
              placeholder="e.g., john.doe@bronxworks.org"
            />
            {errors.alternateContact?.email && (
              <p className="form-error">{errors.alternateContact.email.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('alternateContact.phone')}
              className="form-input"
              placeholder="e.g., (718) 555-0124"
            />
            {errors.alternateContact?.phone && (
              <p className="form-error">{errors.alternateContact.phone.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Department
            </label>
            <input
              type="text"
              {...register('alternateContact.department')}
              className="form-input"
              placeholder="e.g., Youth Services"
            />
          </div>

          <div>
            <label className="form-label">
              Availability
            </label>
            <input
              type="text"
              {...register('alternateContact.availability')}
              className="form-input"
              placeholder="e.g., Monday-Friday 8am-4pm"
            />
          </div>

          <div>
            <label className="form-label">
              Preferred Contact Method
            </label>
            <select
              {...register('alternateContact.preferredContact')}
              className="form-input"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="both">Both Email and Phone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Success Tips */}
      <div className="success-panel">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-success-900 mb-2">Contact Information Best Practices</h4>
            <ul className="text-success-800 text-sm space-y-1">
              <li>• Double-check email addresses and phone numbers for accuracy</li>
              <li>• Include direct phone numbers when possible to avoid delays</li>
              <li>• Specify your availability to help us coordinate at convenient times</li>
              <li>• Consider providing a colleague as alternate contact for continuity</li>
              <li>• Update contact information if it changes during the closure process</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Summary */}
      {hasAlternateContact && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Contact Information Complete</h4>
          </div>
          <p className="text-green-800 text-sm">
            Great! You've provided both primary and alternate contact information, which helps ensure 
            smooth coordination throughout the closure process.
          </p>
        </div>
      )}
    </div>
  );
}