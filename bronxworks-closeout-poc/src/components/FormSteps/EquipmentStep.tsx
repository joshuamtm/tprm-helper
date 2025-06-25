import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';
import { Plus, Trash2 } from 'lucide-react';

export function EquipmentStep() {
  const { register, control, formState: { errors } } = useFormContext<CloseoutDetails>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipment'
  });

  const addEquipment = () => {
    append({
      id: Date.now().toString(),
      type: 'computer',
      description: '',
      quantity: 1,
      assetTag: '',
      location: '',
      specialInstructions: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">IT Equipment Inventory</h2>
        <button
          type="button"
          onClick={addEquipment}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Equipment
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No equipment added yet</p>
          <button
            type="button"
            onClick={addEquipment}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add First Equipment
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
                    Equipment Type *
                  </label>
                  <select
                    {...register(`equipment.${index}.type` as const, { required: 'Type is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="computer">Desktop Computer</option>
                    <option value="laptop">Laptop</option>
                    <option value="monitor">Monitor</option>
                    <option value="printer">Printer</option>
                    <option value="phone">Phone</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    {...register(`equipment.${index}.quantity` as const, { 
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Minimum quantity is 1' }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue={1}
                  />
                  {errors.equipment?.[index]?.quantity && (
                    <span className="text-red-500 text-sm">{errors.equipment[index]?.quantity?.message}</span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <input
                    {...register(`equipment.${index}.description` as const, { required: 'Description is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., Dell OptiPlex 7090, HP LaserJet Pro"
                  />
                  {errors.equipment?.[index]?.description && (
                    <span className="text-red-500 text-sm">{errors.equipment[index]?.description?.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Asset Tag(s)
                  </label>
                  <input
                    {...register(`equipment.${index}.assetTag` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., BW-IT-001234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    {...register(`equipment.${index}.location` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., Room 301"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    {...register(`equipment.${index}.specialInstructions` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={2}
                    placeholder="e.g., Contains sensitive data - requires secure wiping"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Networking Equipment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              WiFi Access Points
            </label>
            <input
              type="number"
              {...register('networkingRequirements.wifiAccessPoints')}
              className="w-full px-3 py-2 border rounded-md"
              defaultValue={0}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Network Printers
            </label>
            <input
              type="number"
              {...register('networkingRequirements.networkPrinters')}
              className="w-full px-3 py-2 border rounded-md"
              defaultValue={0}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Special Network Requirements
            </label>
            <textarea
              {...register('networkingRequirements.specialNetworkNeeds')}
              className="w-full px-3 py-2 border rounded-md"
              rows={2}
              placeholder="e.g., Dedicated server room equipment, special cabling requirements"
            />
          </div>
        </div>
      </div>
    </div>
  );
}