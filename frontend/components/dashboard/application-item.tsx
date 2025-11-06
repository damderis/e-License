import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, FileText, Download } from "lucide-react"
import type { Application } from "@/lib/types"
import { usePdfGenerator } from "@/hooks/use-pdf-generator"

interface ApplicationItemProps {
  application: Application
}

export function ApplicationItem({ application }: ApplicationItemProps) {
  const { generatePdf, generating } = usePdfGenerator()
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string): "green" | "secondary" | "destructive" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "approved":
        return "green"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Menunggu"
      case "approved":
        return "Diluluskan"
      case "rejected":
        return "Ditolak"
      default:
        return status
    }
  }

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            {application.personalInfo.fullName}
          </h3>
          <p className="text-sm text-muted-foreground">
            IC: {application.personalInfo.icNumber}
          </p>
        </div>
        <Badge variant={getStatusVariant(application.status)} className="flex items-center gap-1">
          {application.status === "pending" ? "Menunggu" : application.status === "approved" ? "Disahkan" : "Ditolak"}
        </Badge>
      </div>
      
      <div className="text-sm">
        {application.applyForPasar && application.pasarLicense ? (
          <div>
            <p className="text-muted-foreground mb-1">Lesen Pasar</p>
            <p className="text-foreground">
              {application.pasarLicense.jenisPasar} - {application.pasarLicense.lokasiPasar}
            </p>
          </div>
        ) : application.hawkerLicense ? (
          <div>
            <p className="text-muted-foreground mb-1">Lesen Penjaja</p>
            <p className="text-foreground">{application.hawkerLicense.hawkerType}</p>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-1">Jenis Lesen</p>
            <p className="text-foreground">Tidak Diketahui</p>
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Dihantar: {application.createdAt?.toLocaleDateString()}</span>
          {application.reviewedAt && (
            <span>Disemak: {application.reviewedAt.toLocaleDateString()}</span>
          )}
        </div>
        
        {/* PDF Generation Buttons - Only show for approved applications */}
        {application.status === "approved" && (
          <div className="flex gap-2">
            {application.applyForPasar && application.pasarLicense && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => generatePdf(application, 'pasar')}
                disabled={generating}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Lesen Pasar
              </Button>
            )}
            {application.hawkerLicense && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => generatePdf(application, 'hawker')}
                disabled={generating}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Lesen Penjaja
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
