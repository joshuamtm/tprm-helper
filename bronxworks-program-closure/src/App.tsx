import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ProgramClosureForm } from './components/ProgramClosureForm';
import { ReportViewer } from './components/ReportViewer';
import { WelcomeScreen } from './components/WelcomeScreen';
import type { ProgramClosureData, ReportData } from './types/program-closure';

type AppState = 'welcome' | 'form' | 'report';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleStartForm = () => {
    setAppState('form');
  };

  const handleFormSubmit = (data: ProgramClosureData) => {
    const report: ReportData = {
      programClosure: data,
      generatedAt: new Date(),
      generatedBy: data.createdBy,
      reportType: 'comprehensive',
    };
    
    setReportData(report);
    setAppState('report');
  };

  const handleBackToForm = () => {
    setAppState('form');
  };

  const handleStartOver = () => {
    setReportData(null);
    setAppState('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bronx-50 via-white to-blue-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {appState === 'welcome' && (
        <WelcomeScreen onStart={handleStartForm} />
      )}
      
      {appState === 'form' && (
        <ProgramClosureForm 
          onSubmit={handleFormSubmit}
          onCancel={handleStartOver}
        />
      )}
      
      {appState === 'report' && reportData && (
        <ReportViewer 
          report={reportData}
          onBack={handleBackToForm}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;