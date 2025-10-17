import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import type { Application } from "@/lib/types"

interface AdminStatsProps {
  applications: Application[]
}

export function AdminStats({ applications }: AdminStatsProps) {
  const totalApplications = applications.length
  const pendingApps = applications.filter((app) => app.status === "pending")
  const approvedApps = applications.filter((app) => app.status === "approved")
  const rejectedApps = applications.filter((app) => app.status === "rejected")

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-6">Dashboard Pentadbir</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Permohonan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalApplications}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingApps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Diluluskan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{approvedApps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{rejectedApps.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
