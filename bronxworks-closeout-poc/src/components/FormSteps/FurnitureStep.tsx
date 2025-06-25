import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';
import { Plus, Trash2 } from 'lucide-react';

export function FurnitureStep() {
  const { register, control, formState: { errors } } = useFormContext<CloseoutDetails>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'furniture'
  });

  const addFurniture = () => {
    append({
      id: Date.now().toString(),
      type: 'desk',
      description: '',
      quantity: 1,
      location: '',
      condition: 'good',
      disposition: 'transfer'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Furniture Inventory</h2>
        <button
          type="button"
          onClick={addFurniture}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Furniture
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No furniture added yet</p>
          <button
            type="button"
            onClick={addFurniture}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Furniture Type *
                  </label>
                  <select
                    {...register(`furniture.${index}.type` as const, { required: 'Type is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="desk">Desk</option>
                    <option value="chair">Chair</option>
                    <option value="table">Table</option>
                    <option value="cabinet">Cabinet/Storage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    {...register(`furniture.${index}.quantity` as const, { 
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Minimum quantity is 1' }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue={1}
                  />
                  {errors.furniture?.[index]?.quantity && (
                    <span className="text-red-500 text-sm">{errors.furniture[index]?.quantity?.message}</span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <input
                    {...register(`furniture.${index}.description` as const, { required: 'Description is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., Executive desk, Ergonomic office chair"
                  />
                  {errors.furniture?.[index]?.description && (
                    <span className="text-red-500 text-sm">{errors.furniture[index]?.description?.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    {...register(`furniture.${index}.location` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., Room 301"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Condition
                  </label>
                  <select
                    {...register(`furniture.${index}.condition` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Disposition *
                  </label>
                  <select
                    {...register(`furniture.${index}.disposition` as const, { required: 'Disposition is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="transfer">Transfer to Another Program</option>
                    <option value="surplus">Surplus/Donate</option>
                    <option value="dispose">Dispose</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">Physical Move Requirements</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('physicalMoveRequirements.packingRequired')}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Packing services required</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('physicalMoveRequirements.elevatorRequired')}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Elevator access required</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Access Restrictions
            </label>
            <input
              {...register('physicalMoveRequirements.accessRestrictions')}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., Limited hours, security clearance needed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Special Handling Instructions
            </label>
            <textarea
              {...register('physicalMoveRequirements.specialHandling')}
              className="w-full px-3 py-2 border rounded-md"
              rows={2}
              placeholder="e.g., Fragile items, heavy equipment requiring special movers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}