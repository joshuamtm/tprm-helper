import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { CloseoutDetails } from '../types/closeout';
import { ProgramInfoStep } from './FormSteps/ProgramInfoStep';
import { ContactInfoStep } from './FormSteps/ContactInfoStep';
import { EquipmentStep } from './FormSteps/EquipmentStep';
import { FurnitureStep } from './FormSteps/FurnitureStep';
import { M365AccountsStep } from './FormSteps/M365AccountsStep';
import { TimelineStep } from './FormSteps/TimelineStep';
import { ChevronLeft, ChevronRight, FileText, Save } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Program Info', component: ProgramInfoStep },
  { id: 2, name: 'Contacts', component: ContactInfoStep },
  { id: 3, name: 'IT Equipment', component: EquipmentStep },
  { id: 4, name: 'Furniture', component: FurnitureStep },
  { id: 5, name: 'M365 Accounts', component: M365AccountsStep },
  { id: 6, name: 'Timeline', component: TimelineStep },
];

interface CloseoutFormProps {
  onSubmit: (data: CloseoutDetails) => void;
  onSaveDraft?: (data: CloseoutDetails) => void;
}

export function CloseoutForm({ onSubmit, onSaveDraft }: CloseoutFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Load saved draft from localStorage
  const getSavedDraft = () => {
    const savedDraft = localStorage.getItem('closeoutDraft');
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (e) {
        console.error('Error parsing saved draft:', e);
      }
    }
    return null;
  };

  const savedDraft = getSavedDraft();
  
  const methods = useForm<CloseoutDetails>({
    defaultValues: savedDraft || {
      equipment: [],
      furniture: [],
      m365Accounts: [],
      networkingRequirements: {
        wifiAccessPoints: 0,
        networkPrinters: 0,
        sharedDrives: [],
      },
      physicalMoveRequirements: {
        packingRequired: false,
        elevatorRequired: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const data = methods.getValues();
      localStorage.setItem('closeoutDraft', JSON.stringify({
        ...data,
        updatedAt: new Date(),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [methods]);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = methods.handleSubmit((data) => {
    onSubmit({
      ...data,
      updatedAt: new Date(),
    });
  });

  const handleSaveDraft = () => {
    const data = methods.getValues();
    if (onSaveDraft) {
      onSaveDraft({
        ...data,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'}`}
                >
                  {step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs">
            {STEPS.map((step) => (
              <span
                key={step.id}
                className={`${currentStep === step.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                {step.name}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <CurrentStepComponent />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md
              ${currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {onSaveDraft && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
            )}

            {currentStep === STEPS.length ? (
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FileText className="w-4 h-4" />
                Generate PDF Report
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}