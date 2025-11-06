"use client"

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useToast } from '@/hooks/use-toast'
import type { Application } from '@/lib/types'

interface UsePdfGeneratorReturn {
  generatePdf: (application: Application, licenseType: 'pasar' | 'hawker') => Promise<void>
  generating: boolean
}

export function usePdfGenerator(): UsePdfGeneratorReturn {
  const [generating, setGenerating] = useState(false)
  const { toast } = useToast()

  const generatePdf = async (application: Application, licenseType: 'pasar' | 'hawker') => {
    try {
      setGenerating(true)

      // Dynamic import to avoid SSR issues
      const { LicenseTemplate } = await import('@/components/pdf/license-template')
      
      // Generate license number
      const licenseNumber = `${licenseType.toUpperCase()}-${application.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`
      
      // Create PDF blob
      const blob = await pdf(<LicenseTemplate application={application} licenseType={licenseType} />).toBlob()
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Lesen-${licenseType}-${application.personalInfo.fullName}-${licenseNumber}.pdf`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(url)
      
      toast({
        title: "PDF Dihasilkan",
        description: `PDF Lesen untuk ${application.personalInfo.fullName} telah dihasilkan.`,
      })
    } catch (error) {
      console.error('PDF generation error:', error)
      toast({
        title: "Ralat",
        description: "Gagal menghasilkan PDF. Sila cuba lagi.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  return {
    generatePdf,
    generating,
  }
}
