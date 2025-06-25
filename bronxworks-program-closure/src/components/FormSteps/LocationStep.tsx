import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Building, Key, Shield, Plus, X, Lightbulb } from 'lucide-react';
import type { ProgramClosureData } from '../../types/program-closure';

export function LocationStep() {
  const { register, formState: { errors }, watch, setValue, getValues } = useFormContext<ProgramClosureData>();
  const [newRoom, setNewRoom] = useState('');
  
  const roomNumbers = watch('location.roomNumbers') || [];
  const keyReturnRequired = watch('location.keyReturnRequired');

  const addRoom = () => {
    if (newRoom.trim()) {
      const currentRooms = getValues('location.roomNumbers') || [];
      setValue('location.roomNumbers', [...currentRooms, newRoom.trim()]);
      setNewRoom('');
    }
  };

  const removeRoom = (index: number) => {
    const currentRooms = getValues('location.roomNumbers') || [];
    setValue('location.roomNumbers', currentRooms.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Guidance Panel */}
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Location Information Guidance</h3>
        </div>
        <p className="text-blue-800 mb-3">
          Accurate location details help our teams plan equipment pickup, furniture removal, and ensure proper access.
        </p>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• <strong>Building:</strong> Specific building name or identifier</li>
          <li>• <strong>Rooms:</strong> All rooms/spaces your program occupies</li>
          <li>• <strong>Access:</strong> Any restrictions or special requirements for entry</li>
          <li>• <strong>Security:</strong> Special security considerations teams should know about</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Location Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-bronx-600" />
            <h3 className="text-xl font-semibold text-gray-900">Location Details</h3>
          </div>

          <div>
            <label className="form-label">
              Building Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('location.building')}
              className="form-input"
              placeholder="e.g., Main Building, Annex, Community Center"
            />
            <p className="form-help">
              Official building name or identifier used by BronxWorks
            </p>
            {errors.location?.building && (
              <p className="form-error">{errors.location.building.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">
              Floor
            </label>
            <input
              type="text"
              {...register('location.floor')}
              className="form-input"
              placeholder="e.g., 2nd Floor, Ground Level, Basement"
            />
            <p className="form-help">
              Floor or level where your program is located
            </p>
          </div>

          <div>
            <label className="form-label">
              Room Numbers <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {/* Add new room */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="form-input flex-1"
                  placeholder="e.g., 201, 202A, Conference Room"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRoom())}
                />
                <button
                  type="button"
                  onClick={addRoom}
                  className="btn-primary px-4 py-2 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              
              {/* Room list */}
              {roomNumbers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Rooms/Spaces:</p>
                  <div className="flex flex-wrap gap-2">
                    {roomNumbers.map((room, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 bg-bronx-100 text-bronx-800 px-3 py-1 rounded-full text-sm"
                      >
                        {room}
                        <button
                          type="button"
                          onClick={() => removeRoom(index)}
                          className="text-bronx-600 hover:text-bronx-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="form-help">
                Add all rooms, offices, or spaces your program occupies
              </p>
              {errors.location?.roomNumbers && (
                <p className="form-error">{errors.location.roomNumbers.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('location.address')}
              className="form-input h-20 resize-none"
              placeholder="e.g., 975 Westchester Ave, Bronx, NY 10459"
            />
            <p className="form-help">
              Complete street address including zip code
            </p>
            {errors.location?.address && (
              <p className="form-error">{errors.location.address.message}</p>
            )}
          </div>
        </div>

        {/* Access and Security */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Access & Security</h3>
          </div>

          <div>
            <label className="form-label">
              Access Restrictions
            </label>
            <textarea
              {...register('location.accessRestrictions')}
              className="form-input h-24 resize-none"
              placeholder="e.g., Requires key card access, Building locked after 6pm, Ring buzzer at main entrance..."
            />
            <p className="form-help">
              Any special requirements for accessing the building or program space
            </p>
          </div>

          <div>
            <label className="form-label">
              Security Requirements
            </label>
            <textarea
              {...register('location.securityRequirements')}
              className="form-input h-24 resize-none"
              placeholder="e.g., Must sign in at security desk, Photo ID required, Escort needed for certain areas..."
            />
            <p className="form-help">
              Security protocols our teams need to follow
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-bronx-600" />
              <h4 className="font-medium text-gray-900">Key Return</h4>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('location.keyReturnRequired')}
                className="w-4 h-4 text-bronx-600 border-gray-300 rounded focus:ring-bronx-500"
              />
              <label className="text-gray-700">
                Key return is required for this program
              </label>
            </div>

            {keyReturnRequired && (
              <div>
                <label className="form-label">
                  Key Return Date
                </label>
                <input
                  type="date"
                  {...register('location.keyReturnDate', { valueAsDate: true })}
                  className="form-input"
                />
                <p className="form-help">
                  When keys need to be returned
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Summary */}
      <div className="success-panel">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-success-900 mb-2">Why Location Details Are Important</h4>
            <ul className="text-success-800 text-sm space-y-1">
              <li>• <strong>Equipment Pickup:</strong> IT teams need to know exactly where to find equipment</li>
              <li>• <strong>Furniture Removal:</strong> Operations teams plan logistics based on location and access</li>
              <li>• <strong>Security Coordination:</strong> Ensures teams can access spaces safely and properly</li>
              <li>• <strong>Timeline Planning:</strong> Access restrictions affect when work can be done</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}