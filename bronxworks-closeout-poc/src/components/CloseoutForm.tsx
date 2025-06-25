import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { CloseoutDetails } from '../types/closeout';
import { ProgramInfoStep } from './FormSteps/ProgramInfoStep';
import { ContactInfoStep } from './FormSteps/ContactInfoStep';
import { EquipmentStep } from './FormSteps/EquipmentStep';
import { FurnitureStep } from './FormSteps/FurnitureStep';
import { M365AccountsStep } from './FormSteps/M365AccountsStep';
import { TimelineStep } from './FormSteps/TimelineStep';
import { ChevronLeft, ChevronRight, FileText, Save, Building, Users, Monitor, Armchair, UserX, Clock, CheckCircle, Play } from 'lucide-react';

const STEPS = [
  { 
    id: 1, 
    name: 'Program Info', 
    shortName: 'Program',
    component: ProgramInfoStep,
    icon: Building,
    description: 'Basic program and location details'
  },
  { 
    id: 2, 
    name: 'Contact Info', 
    shortName: 'Contacts',
    component: ContactInfoStep,
    icon: Users,
    description: 'Primary and alternate contacts'
  },
  { 
    id: 3, 
    name: 'IT Equipment', 
    shortName: 'Equipment',
    component: EquipmentStep,
    icon: Monitor,
    description: 'Computers, printers, and devices'
  },
  { 
    id: 4, 
    name: 'Furniture', 
    shortName: 'Furniture',
    component: FurnitureStep,
    icon: Armchair,
    description: 'Desks, chairs, and office furniture'
  },
  { 
    id: 5, 
    name: 'M365 Accounts', 
    shortName: 'Accounts',
    component: M365AccountsStep,
    icon: UserX,
    description: 'User accounts and data backup'
  },
  { 
    id: 6, 
    name: 'Timeline', 
    shortName: 'Timeline',
    component: TimelineStep,
    icon: Clock,
    description: 'Key dates and requirements'
  },
];

interface CloseoutFormProps {
  onSubmit: (data: CloseoutDetails) => void;
  onSaveDraft?: (data: CloseoutDetails) => void;
}

export function CloseoutForm({ onSubmit, onSaveDraft }: CloseoutFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  
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
  const currentStepData = STEPS[currentStep - 1];

  // Auto-save every 30 seconds
  useEffect(() => {
    if (showForm) {
      const interval = setInterval(() => {
        const data = methods.getValues();
        localStorage.setItem('closeoutDraft', JSON.stringify({
          ...data,
          updatedAt: new Date(),
        }));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [methods, showForm]);

  const handleNext = async () => {
    setIsValidating(true);
    const isValid = await methods.trigger();
    setIsValidating(false);
    
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const StartButton = () => (
    <button
      onClick={() => setShowForm(true)}
      className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-pink-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg tracking-wide uppercase"
    >
      <Play className="w-6 h-6" />
      Begin Closeout Process
    </button>
  );

  if (!showForm) {
    return <StartButton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-pink-50">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          {/* Enhanced Progress Bar */}
          <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 py-6">
            <div className="max-w-5xl mx-auto px-4">
              {/* Progress Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-teal-500 to-pink-500 p-2 rounded-lg shadow-lg">
                    <currentStepData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                      Step {currentStep} of {STEPS.length}: {currentStepData.name}
                    </h2>
                    <p className="text-gray-600">{currentStepData.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent">
                    {Math.round((currentStep / STEPS.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Complete</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  {STEPS.map((step) => {
                    const StepIcon = step.icon;
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : isCurrent
                              ? 'bg-gradient-to-r from-teal-500 to-pink-500 border-transparent text-white scale-110 shadow-lg'
                              : 'bg-white border-gray-300 text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-6 h-6" />
                          )}
                        </div>
                        <span className={`text-xs mt-2 font-medium transition-colors hidden sm:block ${
                          isCurrent ? 'text-teal-600' : isCompleted ? 'text-emerald-600' : 'text-gray-500'
                        }`}>
                          {step.shortName}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-pink-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
              <CurrentStepComponent />
            </div>

            {/* Enhanced Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  {onSaveDraft && (
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-all hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      Save Draft
                    </button>
                  )}

                  {currentStep === STEPS.length ? (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-5 h-5" />
                      Generate PDF Report
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isValidating}
                      className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-500 to-pink-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isValidating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Validating...
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Next Step Preview */}
              {currentStep < STEPS.length && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium text-teal-600">Next:</span>
{React.createElement(STEPS[currentStep].icon, { className: "w-4 h-4 text-pink-500" })}
                    <span className="font-semibold">{STEPS[currentStep].name}</span>
                    <span>- {STEPS[currentStep].description}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}