"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  loading: boolean
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
}

export function FormNavigation({ 
  currentStep, 
  totalSteps, 
  loading, 
  onPrevious, 
  onNext, 
  onSubmit 
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={isFirstStep || loading}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Sebelum
      </Button>
      
      {!isLastStep ? (
        <Button onClick={onNext} disabled={loading}>
          Seterusnya
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Menghantar..." : "Hantar Permohonan"}
        </Button>
      )}
    </div>
  )
}
