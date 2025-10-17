import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Application } from "@/lib/types"

interface DashboardStatsProps {
  applications: Application[]
}

export function DashboardStats({ applications }: DashboardStatsProps) {
  const totalApplications = applications.length
  const pendingCount = applications.filter((app) => app.status === "pending").length
  const approvedCount = applications.filter((app) => app.status === "approved").length

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Jumlah Permohonan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">{totalApplications}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Menunggu Semakan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diluluskan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">{approvedCount}</p>
        </CardContent>
      </Card>
    </div>
  )
}
