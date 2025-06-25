import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CloseoutDetails } from '../../types/closeout';
import { Plus, Trash2 } from 'lucide-react';

export function M365AccountsStep() {
  const { register, control } = useFormContext<CloseoutDetails>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'm365Accounts'
  });

  const addAccount = () => {
    append({
      id: Date.now().toString(),
      email: '',
      userName: '',
      employeeName: '',
      dataBackupRequired: false,
      backupInstructions: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Microsoft 365 Accounts</h2>
        <button
          type="button"
          onClick={addAccount}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg">
        <p className="text-sm text-amber-800">
          List all Microsoft 365 accounts that need to be deactivated. Include any special data backup requirements.
        </p>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No M365 accounts added yet</p>
          <button
            type="button"
            onClick={addAccount}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add First Account
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
                    Employee Name *
                  </label>
                  <input
                    {...register(`m365Accounts.${index}.employeeName` as const, { required: 'Employee name is required' })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register(`m365Accounts.${index}.email` as const, { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="john.doe@bronxworks.org"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    {...register(`m365Accounts.${index}.userName` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="jdoe"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register(`m365Accounts.${index}.dataBackupRequired` as const)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Data backup required</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Backup Instructions / Special Notes
                  </label>
                  <textarea
                    {...register(`m365Accounts.${index}.backupInstructions` as const)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={2}
                    placeholder="e.g., Archive all emails to shared drive, transfer OneDrive files to supervisor"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Shared Resources</h3>
        <div>
          <label className="block text-sm font-medium mb-1">
            Shared Drives / Network Folders
          </label>
          <textarea
            {...register('networkingRequirements.sharedDrives')}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="List any shared drives or network folders that need to be archived or transferred"
          />
        </div>
      </div>
    </div>
  );
}