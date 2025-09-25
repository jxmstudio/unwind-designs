"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  isDisabled: boolean;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isSubmitting,
  isDisabled
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <m.div
      initial={isDisabled ? {} : { opacity: 0, y: 20 }}
      animate={isDisabled ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center justify-between mt-8 pt-6 border-t border-borderNeutral"
    >
      {/* Previous Button */}
      <div>
        {!isFirstStep && (
          <m.div
            initial={isDisabled ? {} : { opacity: 0, x: -20 }}
            animate={isDisabled ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={isSubmitting}
              className="border-2 border-brown-300 text-brown-600 hover:bg-brown-50 px-6 py-3 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </m.div>
        )}
      </div>

      {/* Step Info */}
      <div className="text-center text-body-small text-textSecondary">
        Step {currentStep} of {totalSteps}
      </div>

      {/* Next/Submit Button */}
      <div>
        <m.div
          initial={isDisabled ? {} : { opacity: 0, x: 20 }}
          animate={isDisabled ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={isDisabled ? {} : { scale: 1.02 }}
          whileTap={isDisabled ? {} : { scale: 0.98 }}
        >
          <Button
            type="button"
            onClick={onNext}
            disabled={isSubmitting}
            className="bg-brown-500 hover:bg-brown-600 text-white px-6 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : isLastStep ? (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </m.div>
      </div>
    </m.div>
  );
}
