"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
}

interface FormStepperProps {
  steps: Step[]
  currentStep: number
}

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Background connector line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted-foreground/30" />
        
        <div className="flex items-start justify-between gap-4 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1 min-w-0">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors mb-4 flex-shrink-0 relative z-20",
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                      ? "border-primary text-primary bg-background"
                      : "border-muted-foreground/30 text-muted-foreground bg-background",
                )}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : <span className="font-semibold">{step.id}</span>}
              </div>
              
              {/* Step Content */}
              <div className="text-center w-full px-2">
                <p
                  className={cn(
                    "text-sm font-semibold leading-tight mb-1 break-words min-h-[2.5rem] flex items-center justify-center",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground leading-tight break-words min-h-[1.25rem]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
