import { Clock, Lightbulb } from 'lucide-react';

export function TimelineStep() {

  return (
    <div className="space-y-8">
      <div className="guidance-panel">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Timeline & Scheduling Guidance</h3>
        </div>
        <p className="text-blue-800">
          Coordinate key dates and scheduling requirements across all departments and activities.
        </p>
      </div>

      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Timeline & Key Dates</h3>
        <p className="text-gray-500 mb-6">
          This step will coordinate all closure activities with specific dates and scheduling requirements.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-yellow-800 text-sm">
            <strong>Coming Soon:</strong> Comprehensive timeline coordination and scheduling system.
          </p>
        </div>
      </div>
    </div>
  );
}