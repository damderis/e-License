"use client"

import { AuthGuard } from "@/components/auth-guard"
import { FormStepper } from "@/components/form-stepper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplyForm } from "@/hooks/use-apply-form"
import { 
  ApplyHeader, 
  PersonalInfoStep, 
  PasarLicenseStep, 
  HawkerLicenseStep, 
  TermsStep, 
  AgreementStep, 
  FormNavigation 
} from "@/components/apply"

const steps = [
  { id: 1, title: "Maklumat Peribadi", description: "Butiran asas" },
  { id: 2, title: "Lesen Pasar", description: "Butiran pasar (pilihan)" },
  { id: 3, title: "Lesen Penjaja", description: "Butiran penjaja" },
  { id: 4, title: "Terma & Syarat", description: "Syarat-syarat" },
  { id: 5, title: "Hantar", description: "Perjanjian" },
]

export default function ApplyPage() {
  const {
    currentStep,
    loading,
    formData,
    updateFormData,
    addJenisJualan,
    updateJenisJualan,
    removeJenisJualan,
    handleNext,
    handlePrevious,
    handleSubmit,
  } = useApplyForm()

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return (
          <PasarLicenseStep
            formData={formData}
            updateFormData={updateFormData}
            addJenisJualan={addJenisJualan}
            updateJenisJualan={updateJenisJualan}
            removeJenisJualan={removeJenisJualan}
          />
        )
      case 3:
        return <HawkerLicenseStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <TermsStep />
      case 5:
        return <AgreementStep formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        <ApplyHeader />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Permohonan Lesen</CardTitle>
              <CardDescription>Lengkapkan semua langkah untuk menghantar permohonan anda</CardDescription>
            </CardHeader>
            <CardContent>
              <FormStepper steps={steps} currentStep={currentStep} />
              
              <div className="mt-8">
                {renderCurrentStep()}
              </div>

              <FormNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                loading={loading}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}