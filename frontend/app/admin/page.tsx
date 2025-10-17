"use client"

import { AdminGuard } from "@/components/admin-guard"
import { useAdmin } from "@/hooks/use-admin"
import { AdminHeader, AdminStats, AdminApplicationsTable } from "@/components/admin"

export default function AdminPage() {
  const { applications, loading, user, handleLogout, refetch } = useAdmin()

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted/30">
        <AdminHeader user={user} onLogout={handleLogout} />
        
        <div className="container mx-auto px-4 py-8">
          <AdminStats applications={applications} />
          <AdminApplicationsTable 
            applications={applications} 
            loading={loading} 
            onUpdate={refetch} 
          />
        </div>
      </div>
    </AdminGuard>
  )
}
