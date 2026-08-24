import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface MobileStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

interface Step {
  id: number;
  title: string;
  icon: ReactNode;
  shortTitle: string;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'cyan';
}

export function MobileStepper({ currentStep, onStepChange }: MobileStepperProps) {
  const steps: Step[] = [
    {
      id: 1,
      title: 'اطلاعات گزارش',
      icon: '①',
      shortTitle: 'اطلاعات',
      color: 'blue'
    },
    {
      id: 2,
      title: 'آمار فروش',
      icon: '②',
      shortTitle: 'فروش',
      color: 'green'
    },
    {
      id: 3,
      title: 'شیفت‌ها',
      icon: '③',
      shortTitle: 'شیفت',
      color: 'purple'
    },
    {
      id: 4,
      title: 'نکات امروز',
      icon: '④',
      shortTitle: 'نکات',
      color: 'amber'
    },
    {
      id: 5,
      title: 'نظافت',
      icon: '⑤',
      shortTitle: 'نظافت',
      color: 'cyan'
    }
  ];

  const isStepCompleted = (stepId: number) => stepId < currentStep;
  const isCurrentStep = (stepId: number) => stepId === currentStep;

  return (
    <div className="lg:hidden mb-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <button
              onClick={() => onStepChange(step.id)}
              className={`
                relative flex items-center justify-center 
                w-10 h-10 rounded-full 
                transition-all duration-300 
                ${isCurrentStep(step.id) 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 scale-110 shadow-lg shadow-blue-500/30' 
                  : isStepCompleted(step.id)
                  ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md'
                  : 'bg-gray-100 border border-gray-200'
                }
              `}
            >
              <span className={`
                font-bold text-sm
                ${isCurrentStep(step.id) || isStepCompleted(step.id) 
                  ? 'text-white' 
                  : 'text-gray-400'
                }
              `}>
                {step.icon}
              </span>
              
              {/* Completed checkmark */}
              {isStepCompleted(step.id) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </button>

            {/* Connector line (except for last step) */}
            {index < steps.length - 1 && (
              <div className="w-12 h-1 mx-1 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full 
                    transition-all duration-300
                    ${isStepCompleted(step.id) ? 'w-full' : 'w-0'}
                  `}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="flex justify-center items-center gap-4 mb-6 px-4">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`
              flex flex-col items-center justify-center 
              px-3 py-2 rounded-xl 
              transition-all duration-200
              min-w-[60px]
              ${isCurrentStep(step.id)
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm'
                : 'hover:bg-gray-50'
              }
            `}
          >
            <span className={`
              text-sm font-bold mb-1
              ${isCurrentStep(step.id) 
                ? 'text-blue-700' 
                : isStepCompleted(step.id)
                ? 'text-gray-600'
                : 'text-gray-400'
              }
            `}>
              {step.shortTitle}
            </span>
            <div className={`
              w-8 h-1 rounded-full
              ${isCurrentStep(step.id)
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                : isStepCompleted(step.id)
                ? 'bg-blue-400'
                : 'bg-gray-200'
              }
            `}></div>
          </button>
        ))}
      </div>

      {/* Current Step Info */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {steps.find(s => s.id === currentStep)?.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          مرحله {currentStep} از ۵
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 mt-8">
        {currentStep > 1 && (
          <button
            onClick={() => onStepChange(currentStep - 1)}
            className={`
              flex items-center justify-center gap-2 
              px-5 py-3 rounded-xl 
              bg-gradient-to-r from-gray-100 to-gray-50 
              border border-gray-200
              text-gray-700 font-medium
              transition-all duration-200
              hover:bg-gradient-to-r hover:from-gray-50 hover:to-white
              hover:border-gray-300 hover:shadow-sm
              min-h-[48px]
              flex-1
            `}
          >
            <ChevronRight className="w-5 h-5" />
            <span>مرحله قبل</span>
          </button>
        )}
        
        {currentStep < 5 && (
          <button
            onClick={() => onStepChange(currentStep + 1)}
            className={`
              flex items-center justify-center gap-2 
              px-5 py-3 rounded-xl 
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white font-bold
              transition-all duration-200
              hover:shadow-lg hover:shadow-blue-500/30
              hover:from-blue-600 hover:to-indigo-700
              min-h-[48px]
              ${currentStep > 1 ? 'flex-1' : 'w-full'}
            `}
          >
            <span>مرحله بعد</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        {currentStep === 5 && (
          <button
            onClick={() => onStepChange(1)} // Return to step 1 for completion
            className={`
              flex items-center justify-center gap-2 
              px-5 py-3 rounded-xl 
              bg-gradient-to-r from-green-500 to-emerald-600
              text-white font-bold
              transition-all duration-200
              hover:shadow-lg hover:shadow-green-500/30
              hover:from-green-600 hover:to-emerald-700
              min-h-[48px]
              w-full
            `}
          >
            <CheckCircle className="w-5 h-5" />
            <span>تکمیل گزارش ✓</span>
          </button>
        )}
      </div>
    </div>
  );
}