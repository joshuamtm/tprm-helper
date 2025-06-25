import { useState } from 'react';
import { CloseoutForm } from './components/CloseoutForm';
import type { CloseoutDetails } from './types/closeout';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CloseoutPDF } from './components/CloseoutPDF';
import { FileText, RefreshCw } from 'lucide-react';
import './App.css';

function App() {
  const [closeoutData, setCloseoutData] = useState<CloseoutDetails | null>(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const handleSubmit = (data: CloseoutDetails) => {
    setCloseoutData(data);
    localStorage.setItem('closeoutDraft', JSON.stringify(data));
  };

  const handleSaveDraft = (data: CloseoutDetails) => {
    localStorage.setItem('closeoutDraft', JSON.stringify(data));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handleStartNew = () => {
    if (window.confirm('Are you sure you want to start a new closeout? Any unsaved data will be lost.')) {
      setCloseoutData(null);
      localStorage.removeItem('closeoutDraft');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                BronxWorks Program Closeout Assistant
              </h1>
            </div>
            {closeoutData && (
              <button
                onClick={handleStartNew}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
                Start New Closeout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!closeoutData ? (
          <>
            {isDraftSaved && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
                Draft saved successfully!
              </div>
            )}
            <CloseoutForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Closeout Report Ready!</h2>
            <p className="text-gray-600 mb-6">
              Your program closeout report has been generated and is ready for download.
            </p>
            
            <div className="flex gap-4 justify-center">
              <PDFDownloadLink
                document={<CloseoutPDF data={closeoutData} />}
                fileName={`${closeoutData.programName.replace(/\s+/g, '_')}_Closeout_${new Date().toISOString().split('T')[0]}.pdf`}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {({ loading }) => (
                  loading ? 'Generating PDF...' : 'Download PDF Report'
                )}
              </PDFDownloadLink>
              
              <button
                onClick={handleStartNew}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Create Another Closeout
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Next Steps:</h3>
              <ol className="text-left text-sm text-gray-700 space-y-1">
                <li>1. Download and review the PDF report</li>
                <li>2. Share with IT and Operations departments</li>
                <li>3. Coordinate pickup dates and logistics</li>
                <li>4. Ensure all deadlines are communicated</li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
