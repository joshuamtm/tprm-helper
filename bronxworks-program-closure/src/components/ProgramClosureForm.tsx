import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Save, 
  Building, 
  Users, 
  MapPin,
  Monitor, 
  Armchair, 
  Database,
  Network,
  Truck,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';

import type { ProgramClosureData, FormStep } from '../types/program-closure';
import { programClosureSchema } from '../utils/validation';

import { ProgramInfoStep } from './FormSteps/ProgramInfoStep';
import { ContactInfoStep } from './FormSteps/ContactInfoStep';
import { LocationStep } from './FormSteps/LocationStep';
import { ITEquipmentStep } from './FormSteps/ITEquipmentStep';
import { FurnitureStep } from './FormSteps/FurnitureStep';
import { DigitalAssetsStep } from './FormSteps/DigitalAssetsStep';
import { NetworkingStep } from './FormSteps/NetworkingStep';
import { LogisticsStep } from './FormSteps/LogisticsStep';
import { TimelineStep } from './FormSteps/TimelineStep';
import { ReviewStep } from './FormSteps/ReviewStep';

const FORM_STEPS = [
  {
    id: 'program-info' as FormStep,
    name: 'Program Information',
    shortName: 'Program',
    component: ProgramInfoStep,
    icon: Building,
    description: 'Basic program details and closure information',
    guidance: 'Tell us about your program and when it will be closing'
  },
  {
    id: 'contacts' as FormStep,
    name: 'Contact Information',
    shortName: 'Contacts',
    component: ContactInfoStep,
    icon: Users,
    description: 'Primary and alternate contact details',
    guidance: 'Who should we contact for questions and coordination?'
  },
  {
    id: 'location' as FormStep,
    name: 'Location Details',
    shortName: 'Location',
    component: LocationStep,
    icon: MapPin,
    description: 'Physical location and access information',
    guidance: 'Where is your program located and how do we access it?'
  },
  {
    id: 'it-equipment' as FormStep,
    name: 'IT Equipment',
    shortName: 'IT Assets',
    component: ITEquipmentStep,
    icon: Monitor,
    description: 'Computers, printers, phones, and network devices',
    guidance: 'What IT equipment needs to be collected or handled?'
  },
  {
    id: 'furniture' as FormStep,
    name: 'Furniture & Assets',
    shortName: 'Furniture',
    component: FurnitureStep,
    icon: Armchair,
    description: 'Desks, chairs, and other physical assets',
    guidance: 'What furniture and physical assets need disposition?'
  },
  {
    id: 'digital-assets' as FormStep,
    name: 'Digital Assets',
    shortName: 'Digital',
    component: DigitalAssetsStep,
    icon: Database,
    description: 'User accounts, shared drives, and data',
    guidance: 'What digital assets and user accounts need attention?'
  },
  {
    id: 'networking' as FormStep,
    name: 'Network & Infrastructure',
    shortName: 'Network',
    component: NetworkingStep,
    icon: Network,
    description: 'Network equipment and connectivity requirements',
    guidance: 'What network infrastructure needs to be addressed?'
  },
  {
    id: 'logistics' as FormStep,
    name: 'Logistics & Moving',
    shortName: 'Logistics',
    component: LogisticsStep,
    icon: Truck,
    description: 'Physical moving and coordination requirements',
    guidance: 'How should we coordinate the physical aspects of closure?'
  },
  {
    id: 'timeline' as FormStep,
    name: 'Timeline & Dates',
    shortName: 'Timeline',
    component: TimelineStep,
    icon: Clock,
    description: 'Key dates and scheduling requirements',
    guidance: 'When do different closure activities need to happen?'
  },
  {
    id: 'review' as FormStep,
    name: 'Review & Submit',
    shortName: 'Review',
    component: ReviewStep,
    icon: CheckCircle,
    description: 'Review all information and submit request',
    guidance: 'Review everything and submit your closure request'
  },
];

interface ProgramClosureFormProps {
  onSubmit: (data: ProgramClosureData) => void;
  onCancel: () => void;
}

export function ProgramClosureForm({ onSubmit, onCancel }: ProgramClosureFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentStep = FORM_STEPS[currentStepIndex];
  const CurrentStepComponent = currentStep?.component;

  if (!currentStep) {
    return <div>Invalid step</div>;
  }

  const getSavedDraft = () => {
    const savedDraft = localStorage.getItem('programClosureDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        return {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt),
          programDetails: {
            ...parsed.programDetails,
            lastServiceDate: new Date(parsed.programDetails.lastServiceDate),
            closureDate: new Date(parsed.programDetails.closureDate),
          },
          timeline: {
            ...parsed.timeline,
            finalVacateDate: new Date(parsed.timeline.finalVacateDate),
            equipmentPickupDate: parsed.timeline.equipmentPickupDate ? new Date(parsed.timeline.equipmentPickupDate) : undefined,
            furniturePickupDate: parsed.timeline.furniturePickupDate ? new Date(parsed.timeline.furniturePickupDate) : undefined,
            digitalAssetDeactivationDate: parsed.timeline.digitalAssetDeactivationDate ? new Date(parsed.timeline.digitalAssetDeactivationDate) : undefined,
            keyReturnDate: parsed.timeline.keyReturnDate ? new Date(parsed.timeline.keyReturnDate) : undefined,
            auditDate: parsed.timeline.auditDate ? new Date(parsed.timeline.auditDate) : undefined,
            documentationDueDate: parsed.timeline.documentationDueDate ? new Date(parsed.timeline.documentationDueDate) : undefined,
            coordinationMeetingDate: parsed.timeline.coordinationMeetingDate ? new Date(parsed.timeline.coordinationMeetingDate) : undefined,
          },
        };
      } catch (e) {
        console.error('Error parsing saved draft:', e);
        localStorage.removeItem('programClosureDraft');
      }
    }
    return null;
  };

  const savedDraft = getSavedDraft();

  const methods = useForm<ProgramClosureData>({
    resolver: zodResolver(programClosureSchema),
    defaultValues: savedDraft || {
      id: crypto.randomUUID(),
      status: 'draft',
      programDetails: {
        programName: '',
        programType: '',
        description: '',
        lastServiceDate: new Date(),
        closureDate: new Date(),
        staffCount: 0,
        organizationalStructure: '',
        complianceRequirements: [],
      },
      primaryContact: {
        name: '',
        title: '',
        email: '',
        phone: '',
        department: '',
        availability: '',
        preferredContact: 'email',
      },
      location: {
        building: '',
        floor: '',
        roomNumbers: [],
        address: '',
        accessRestrictions: '',
        securityRequirements: '',
        keyReturnRequired: false,
      },
      itEquipment: [],
      furniture: [],
      digitalAssets: [],
      userAccounts: [],
      networkingRequirements: {
        wifiAccessPoints: 0,
        networkPrinters: 0,
        sharedDrives: [],
        networkDrops: 0,
        phoneLines: 0,
        internetCircuits: [],
        vpnAccess: [],
        specialNetworkNeeds: '',
        firewallRules: [],
      },
      logisticsRequirements: {
        packingRequired: false,
        labelingInstructions: '',
        elevatorRequired: false,
        loadingDockAccess: false,
        truckAccessRequired: false,
        storageNeeded: false,
        specialHandling: '',
        hazardousMaterials: '',
        insuranceRequired: false,
        transportationNeeds: '',
      },
      timeline: {
        finalVacateDate: new Date(),
      },
      qualityChecks: {
        informationComplete: false,
        contactsVerified: false,
        assetsInventoried: false,
        timelineConfirmed: false,
        stakeholdersNotified: false,
        complianceReviewed: false,
        risksAssessed: false,
      },
      stakeholderCommunication: {
        itOperationsNotified: false,
        adminOperationsNotified: false,
        securityNotified: false,
        facilitiesNotified: false,
        hrNotified: false,
        financeNotified: false,
        customStakeholders: [],
      },
      additionalNotes: '',
      specialRequirements: '',
      riskAssessment: '',
      budgetConsiderations: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user',
      lastModifiedBy: 'current-user',
      auditTrail: [{
        id: crypto.randomUUID(),
        timestamp: new Date(),
        action: 'created',
        user: 'current-user',
        notes: 'Form started',
      }],
    },
  });

  const { watch } = methods;
  const watchedValues = watch();

  useEffect(() => {
    setHasUnsavedChanges(true);
    const interval = setInterval(() => {
      if (hasUnsavedChanges) {
        const data = methods.getValues();
        localStorage.setItem('programClosureDraft', JSON.stringify({
          ...data,
          updatedAt: new Date(),
        }));
        setHasUnsavedChanges(false);
        toast.success('Progress saved automatically', { duration: 2000 });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [methods, hasUnsavedChanges, watchedValues]);

  const handleNext = async () => {
    setIsValidating(true);
    
    try {
      const currentStepValid = await methods.trigger();
      if (currentStepValid && currentStepIndex < FORM_STEPS.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!currentStepValid) {
        toast.error('Please complete all required fields before continuing');
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('There was an error validating the form');
    } finally {
      setIsValidating(false);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const submissionData: ProgramClosureData = {
        ...data,
        status: 'submitted',
        updatedAt: new Date(),
        submittedAt: new Date(),
        auditTrail: [
          ...data.auditTrail,
          {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            action: 'submitted',
            user: data.createdBy,
            notes: 'Form submitted for processing',
          },
        ],
      };

      localStorage.removeItem('programClosureDraft');
      toast.success('Program closure request submitted successfully!');
      onSubmit(submissionData);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('There was an error submitting the form');
    }
  });

  const handleSaveDraft = () => {
    const data = methods.getValues();
    localStorage.setItem('programClosureDraft', JSON.stringify({
      ...data,
      updatedAt: new Date(),
    }));
    toast.success('Draft saved successfully');
  };

  const handleCancel = () => {
    if (hasUnsavedChanges || localStorage.getItem('programClosureDraft')) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        localStorage.removeItem('programClosureDraft');
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const progress = ((currentStepIndex + 1) / FORM_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bronx-50 via-white to-blue-50">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 py-6 shadow-sm">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-bronx-500 to-blue-600 p-3 rounded-xl shadow-lg">
                    {React.createElement(currentStep.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Step {currentStepIndex + 1} of {FORM_STEPS.length}: {currentStep.name}
                    </h2>
                    <p className="text-gray-600">{currentStep.guidance}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-bronx-500 to-blue-600 bg-clip-text text-transparent">
                      {Math.round(progress)}%
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Complete</div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3 relative z-10">
                  {FORM_STEPS.map((step, index) => {
                    const StepIcon = step.icon;
                    const isCompleted = currentStepIndex > index;
                    const isCurrent = currentStepIndex === index;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-success-500 border-success-500 text-white scale-110'
                              : isCurrent
                              ? 'bg-gradient-to-r from-bronx-500 to-blue-600 border-transparent text-white scale-125 shadow-lg'
                              : 'bg-white border-gray-300 text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`text-xs mt-2 font-medium transition-colors hidden lg:block ${
                          isCurrent ? 'text-bronx-600' : isCompleted ? 'text-success-600' : 'text-gray-500'
                        }`}>
                          {step.shortName}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 -z-10">
                  <div 
                    className="h-full bg-gradient-to-r from-bronx-500 to-blue-600 transition-all duration-500 ease-out"
                    style={{ width: `${(currentStepIndex / (FORM_STEPS.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="card p-8 mb-8">
              {CurrentStepComponent && <CurrentStepComponent />}
            </div>

            {/* Navigation */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStepIndex === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'btn-secondary hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-xl transition-all hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    Save Draft
                  </button>

                  {currentStepIndex === FORM_STEPS.length - 1 ? (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white font-semibold rounded-xl hover:from-success-600 hover:to-success-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <FileText className="w-5 h-5" />
                      Submit Request
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isValidating}
                      className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-bronx-500 to-blue-600 text-white font-semibold rounded-xl hover:from-bronx-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
              {currentStepIndex < FORM_STEPS.length - 1 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium text-bronx-600">Next:</span>
                    {React.createElement(FORM_STEPS[currentStepIndex + 1]?.icon || Clock, { className: "w-4 h-4 text-blue-500" })}
                    <span className="font-semibold">{FORM_STEPS[currentStepIndex + 1]?.name}</span>
                    <span>- {FORM_STEPS[currentStepIndex + 1]?.description}</span>
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