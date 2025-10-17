import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import type { Application } from "@/lib/types"

interface ApplicationItemProps {
  application: Application
}

export function ApplicationItem({ application }: ApplicationItemProps) {
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

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "approved":
        return "default"
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
          {getStatusIcon(application.status)}
          <span>{getStatusText(application.status)}</span>
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-1">Lesen Pasar</p>
          <p className="text-foreground">
            {application.pasarLicense ? 
              `${application.pasarLicense.jenisPasar} - ${application.pasarLicense.lokasiPasar}` : 
              "N/A"
            }
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Lesen Penjaja</p>
          <p className="text-foreground">{application.hawkerLicense?.hawkerType || "N/A"}</p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
        <span>Dihantar: {application.createdAt?.toLocaleDateString()}</span>
        {application.reviewedAt && (
          <span>Disemak: {application.reviewedAt.toLocaleDateString()}</span>
        )}
      </div>
    </div>
  )
}
