import { useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';
import { Building, MapPin, Calendar, Users as UsersIcon, Info } from 'lucide-react';

export function ProgramInfoStep() {
  const { register, formState: { errors } } = useFormContext<CloseoutDetails>();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-bronx-teal-100 to-bronx-pink-100 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
          <Building className="w-10 h-10 text-bronx-teal-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Program Information</h2>
        <p className="text-lg text-gray-600">Let's start with the essential details about your program and location</p>
      </div>

      {/* Program Details Section */}
      <div className="bg-gradient-to-r from-bronx-teal-50 to-bronx-teal-100 rounded-2xl p-8 border border-bronx-teal-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="bg-bronx-teal-500 p-2 rounded-lg">
            <Info className="w-5 h-5 text-white" />
          </div>
          Program Details
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Program Name *
            </label>
            <input
              {...register('programName', { required: 'Program name is required' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-teal-500 focus:ring-2 focus:ring-bronx-teal-100 transition-all bg-white shadow-sm"
              placeholder="e.g., Early Childhood Education Center"
            />
            {errors.programName && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.programName.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Program Type *
            </label>
            <input
              {...register('programType', { required: 'Program type is required' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-teal-500 focus:ring-2 focus:ring-bronx-teal-100 transition-all bg-white shadow-sm"
              placeholder="e.g., Education, Social Services, Youth Development"
            />
            {errors.programType && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.programType.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-bronx-teal-600" />
              Total Staff Count *
            </label>
            <input
              type="number"
              {...register('totalStaff', { 
                required: 'Staff count is required',
                min: { value: 1, message: 'Must have at least 1 staff member' }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-teal-500 focus:ring-2 focus:ring-bronx-teal-100 transition-all bg-white shadow-sm"
              placeholder="10"
              min="1"
            />
            {errors.totalStaff && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.totalStaff.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gradient-to-r from-bronx-pink-50 to-bronx-pink-100 rounded-2xl p-8 border border-bronx-pink-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="bg-bronx-pink-500 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          Important Dates
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Last Operational Date *
            </label>
            <p className="text-xs text-gray-600 mb-2">When will the program stop serving clients?</p>
            <input
              type="date"
              {...register('lastOperationalDate', { required: 'Last operational date is required' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-pink-500 focus:ring-2 focus:ring-bronx-pink-100 transition-all bg-white shadow-sm"
            />
            {errors.lastOperationalDate && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.lastOperationalDate.message}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Target Closeout Date *
            </label>
            <p className="text-xs text-gray-600 mb-2">When should everything be completely closed?</p>
            <input
              type="date"
              {...register('closeoutDate', { required: 'Closeout date is required' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-pink-500 focus:ring-2 focus:ring-bronx-pink-100 transition-all bg-white shadow-sm"
            />
            {errors.closeoutDate && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.closeoutDate.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="bg-gradient-to-r from-bronx-teal-500 to-bronx-pink-500 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          Location Details
        </h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Building Name *
              </label>
              <input
                {...register('location.building', { required: 'Building name is required' })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-teal-500 focus:ring-2 focus:ring-bronx-teal-100 transition-all bg-white shadow-sm"
                placeholder="e.g., Main Building, Community Center"
              />
              {errors.location?.building && (
                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.location.building.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Floor (Optional)
              </label>
              <input
                {...register('location.floor')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-bronx-teal-500 focus:ring-2 focus:ring-bronx-teal-100 transition-all bg-white shadow-sm"
                placeholder="e.g., 3rd Floor, Ground Level"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Full Address *
            </label>
            <p className="text-xs text-gray-600 mb-2">Complete address for pickup coordination</p>
            <textarea
              {...register('location.address', { required: 'Address is required' })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-colors bg-white resize-none"
              rows={3}
              placeholder="123 Main Street, Bronx, NY 10001"
            />
            {errors.location?.address && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                {errors.location.address.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-gradient-to-r from-bronx-teal-50 to-bronx-pink-50 border border-bronx-teal-200 rounded-xl p-6">
        <p className="text-sm text-gray-800 flex items-start gap-3">
          <div className="bg-gradient-to-r from-bronx-teal-500 to-bronx-pink-500 p-1 rounded-full flex-shrink-0 mt-0.5">
            <Info className="w-3 h-3 text-white" />
          </div>
          <span>
            <strong className="text-bronx-teal-700">Pro Tip:</strong> Accurate dates and location details help our IT and Operations teams plan the most efficient closeout process. 
            If you're unsure about exact dates, provide your best estimate – we can always adjust as needed.
          </span>
        </p>
      </div>
    </div>
  );
}