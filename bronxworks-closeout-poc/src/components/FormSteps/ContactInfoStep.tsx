import { useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';

export function ContactInfoStep() {
  const { register, formState: { errors } } = useFormContext<CloseoutDetails>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Primary Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                {...register('primaryContact.name', { required: 'Primary contact name is required' })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="John Doe"
              />
              {errors.primaryContact?.name && (
                <span className="text-red-500 text-sm">{errors.primaryContact.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                {...register('primaryContact.title', { required: 'Title is required' })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Program Director"
              />
              {errors.primaryContact?.title && (
                <span className="text-red-500 text-sm">{errors.primaryContact.title.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                {...register('primaryContact.email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="john.doe@bronxworks.org"
              />
              {errors.primaryContact?.email && (
                <span className="text-red-500 text-sm">{errors.primaryContact.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone *
              </label>
              <input
                type="tel"
                {...register('primaryContact.phone', { required: 'Phone is required' })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="(555) 123-4567"
              />
              {errors.primaryContact?.phone && (
                <span className="text-red-500 text-sm">{errors.primaryContact.phone.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <input
                {...register('primaryContact.department')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Education Services"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Alternate Contact (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                {...register('alternateContact.name')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                {...register('alternateContact.title')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Assistant Director"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('alternateContact.email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="jane.smith@bronxworks.org"
              />
              {errors.alternateContact?.email && (
                <span className="text-red-500 text-sm">{errors.alternateContact.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                {...register('alternateContact.phone')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="(555) 123-4568"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <input
                {...register('alternateContact.department')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Education Services"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}