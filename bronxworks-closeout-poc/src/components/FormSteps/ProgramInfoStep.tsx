import { useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';

export function ProgramInfoStep() {
  const { register, formState: { errors } } = useFormContext<CloseoutDetails>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Program Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Program Name *
          </label>
          <input
            {...register('programName', { required: 'Program name is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., Early Childhood Education Center"
          />
          {errors.programName && (
            <span className="text-red-500 text-sm">{errors.programName.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Program Type *
          </label>
          <input
            {...register('programType', { required: 'Program type is required' })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., Education, Social Services, etc."
          />
          {errors.programType && (
            <span className="text-red-500 text-sm">{errors.programType.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Staff Count *
          </label>
          <input
            type="number"
            {...register('totalStaff', { 
              required: 'Staff count is required',
              min: { value: 1, message: 'Must have at least 1 staff member' }
            })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="10"
          />
          {errors.totalStaff && (
            <span className="text-red-500 text-sm">{errors.totalStaff.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Last Operational Date *
          </label>
          <input
            type="date"
            {...register('lastOperationalDate', { required: 'Last operational date is required' })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.lastOperationalDate && (
            <span className="text-red-500 text-sm">{errors.lastOperationalDate.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Target Closeout Date *
          </label>
          <input
            type="date"
            {...register('closeoutDate', { required: 'Closeout date is required' })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.closeoutDate && (
            <span className="text-red-500 text-sm">{errors.closeoutDate.message}</span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Location Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Building Name *
            </label>
            <input
              {...register('location.building', { required: 'Building name is required' })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Main Building"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Floor
            </label>
            <input
              {...register('location.floor')}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="3rd Floor"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Full Address *
          </label>
          <textarea
            {...register('location.address', { required: 'Address is required' })}
            className="w-full px-3 py-2 border rounded-md"
            rows={2}
            placeholder="123 Main St, Bronx, NY 10001"
          />
          {errors.location?.address && (
            <span className="text-red-500 text-sm">{errors.location.address.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}