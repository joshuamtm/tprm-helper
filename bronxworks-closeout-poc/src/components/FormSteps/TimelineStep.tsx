import { useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';

export function TimelineStep() {
  const { register, formState: { errors } } = useFormContext<CloseoutDetails>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Timeline & Additional Information</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Important Dates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Equipment Pickup Date
              </label>
              <input
                type="date"
                {...register('timeline.equipmentPickupDate')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Furniture Pickup Date
              </label>
              <input
                type="date"
                {...register('timeline.furniturePickupDate')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Final Vacate Date *
              </label>
              <input
                type="date"
                {...register('timeline.finalVacateDate', { required: 'Final vacate date is required' })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.timeline?.finalVacateDate && (
                <span className="text-red-500 text-sm">{errors.timeline.finalVacateDate.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Key Return Date
              </label>
              <input
                type="date"
                {...register('timeline.keyReturnDate')}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Additional Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Special Requirements
              </label>
              <textarea
                {...register('specialRequirements')}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Any special requirements or considerations for the closeout process"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Additional Notes
              </label>
              <textarea
                {...register('additionalNotes')}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                placeholder="Any other information that IT or Operations should know"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Labeling Instructions
              </label>
              <textarea
                {...register('physicalMoveRequirements.labelingInstructions')}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
                placeholder="How should items be labeled for pickup? Any specific tagging requirements?"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2">Ready for Review</h3>
          <p className="text-sm text-green-800">
            Once you've completed all sections, you can preview your closeout report before generating the final PDF.
            Make sure all critical information is accurate as this will be used by IT and Operations for planning.
          </p>
        </div>
      </div>
    </div>
  );
}