import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminTable } from "@/components/admin-table"
import type { Application } from "@/lib/types"

interface AdminApplicationsTableProps {
  applications: Application[]
  loading: boolean
  onUpdate: () => void
}

export function AdminApplicationsTable({ applications, loading, onUpdate }: AdminApplicationsTableProps) {
  const pendingApps = applications.filter((app) => app.status === "pending")
  const approvedApps = applications.filter((app) => app.status === "approved")
  const rejectedApps = applications.filter((app) => app.status === "rejected")

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Lesen</CardTitle>
          <CardDescription>Semak dan uruskan semua permohonan lesen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Memuatkan permohonan...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permohonan Lesen</CardTitle>
        <CardDescription>Semak dan uruskan semua permohonan lesen</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Semua ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">Menunggu ({pendingApps.length})</TabsTrigger>
            <TabsTrigger value="approved">Diluluskan ({approvedApps.length})</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak ({rejectedApps.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <AdminTable applications={applications} onUpdate={onUpdate} />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <AdminTable applications={pendingApps} onUpdate={onUpdate} />
          </TabsContent>
          <TabsContent value="approved" className="mt-6">
            <AdminTable applications={approvedApps} onUpdate={onUpdate} />
          </TabsContent>
          <TabsContent value="rejected" className="mt-6">
            <AdminTable applications={rejectedApps} onUpdate={onUpdate} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
