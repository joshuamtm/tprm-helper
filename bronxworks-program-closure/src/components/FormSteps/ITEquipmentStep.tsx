import { Monitor, Lightbulb } from 'lucide-react';

export function ITEquipmentStep() {

  return (
    <div className="space-y-8">
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">IT Equipment Guidance</h3>
        </div>
        <p className="text-blue-800">
          Help IT Operations plan equipment collection and data security procedures.
        </p>
      </div>

      <div className="text-center py-12">
        <Monitor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">IT Equipment Inventory</h3>
        <p className="text-gray-500 mb-6">
          This step will collect detailed information about computers, printers, phones, and network devices.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-800 text-sm">
            <strong>Coming Soon:</strong> Interactive equipment inventory form with guided data collection.
          </p>
        </div>
      </div>
    </div>
  );
}