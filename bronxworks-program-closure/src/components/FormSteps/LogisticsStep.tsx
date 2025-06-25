import { Truck, Lightbulb } from 'lucide-react';

export function LogisticsStep() {

  return (
    <div className="space-y-8">
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Logistics & Moving Guidance</h3>
        </div>
        <p className="text-blue-800">
          Plan the physical aspects of program closure including moving, packing, and transportation.
        </p>
      </div>

      <div className="text-center py-12">
        <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Logistics & Moving Requirements</h3>
        <p className="text-gray-500 mb-6">
          This step will collect information about physical moving requirements, packing needs, and coordination.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-800 text-sm">
            <strong>Coming Soon:</strong> Comprehensive logistics planning and coordination requirements.
          </p>
        </div>
      </div>
    </div>
  );
}