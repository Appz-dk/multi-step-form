import { ReactNode, useState } from "react";

export const useMultistepForm = (steps: ReactNode[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const nextStep = () => {
    if (isLastStep) return
    setCurrentStepIndex(prev => prev + 1)
  }

  const prevStep = () => {
    if (isFirstStep) return
    setCurrentStepIndex(prev => prev - 1)
  }

  const goToStep = (index: number) => {
    if (index >= steps.length || index < 0) return
    setCurrentStepIndex(index)
  }

  return {
    step: steps[currentStepIndex],
    steps,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep
  }
}