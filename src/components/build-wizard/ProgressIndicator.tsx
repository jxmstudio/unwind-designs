"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  isDisabled: boolean;
}

export function ProgressIndicator({ steps, currentStep, isDisabled }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-shrink-0">
                <m.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-body-small font-medium border-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-brown-500 border-brown-500 text-white' 
                      : isCurrent 
                        ? 'bg-white border-brown-500 text-brown-500 shadow-lg' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}
                  initial={isDisabled ? {} : { scale: 0.8, opacity: 0 }}
                  animate={isDisabled ? {} : { scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={isDisabled ? {} : { scale: 1.05 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </m.div>
                
                {/* Step Info */}
                <div className="mt-3 text-center">
                  <m.div
                    className={`text-body-small font-medium transition-colors duration-300 ${
                      isCurrent ? 'text-brown-500' : isCompleted ? 'text-textPrimary' : 'text-textSecondary'
                    }`}
                    initial={isDisabled ? {} : { opacity: 0, y: 10 }}
                    animate={isDisabled ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  >
                    {step.title}
                  </m.div>
                  <m.div
                    className={`text-caption mt-1 transition-colors duration-300 ${
                      isCurrent ? 'text-brown-400' : 'text-textSecondary'
                    }`}
                    initial={isDisabled ? {} : { opacity: 0, y: 10 }}
                    animate={isDisabled ? {} : { opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                  >
                    {step.description}
                  </m.div>
                </div>
              </div>

              {/* Progress Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 mt-[-60px]">
                  <div className="relative">
                    <div className="h-0.5 bg-gray-300 rounded-full"></div>
                    <m.div
                      className="absolute top-0 left-0 h-0.5 bg-brown-500 rounded-full"
                      initial={isDisabled ? {} : { width: 0 }}
                      animate={isDisabled ? {} : { 
                        width: isCompleted ? "100%" : isCurrent ? "50%" : "0%" 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1 + 0.5,
                        ease: "easeInOut" 
                      }}
                    ></m.div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
