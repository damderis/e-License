"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface AgreementStepProps {
  formData: {
    agreedToTerms: boolean
  }
  updateFormData: (field: string, value: any) => void
}

export function AgreementStep({ formData, updateFormData }: AgreementStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Bahagian V: Perjanjian Permohonan</h3>
      <div className="border rounded-lg p-6 bg-muted/50">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Dengan menghantar permohonan ini, saya mengisytiharkan bahawa semua maklumat yang diberikan adalah benar dan tepat 
            mengikut pengetahuan saya. Saya memahami bahawa memberikan maklumat palsu mungkin mengakibatkan 
            penolakan permohonan saya atau pembatalan lesen saya.
          </p>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => updateFormData("agreedToTerms", checked)}
            />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              Saya telah membaca dan bersetuju dengan terma dan syarat, dan saya mengesahkan bahawa semua maklumat
              yang diberikan dalam permohonan ini adalah tepat dan lengkap.
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
