'use client'
import { AuthGuard } from "@/components/auth-guard"
import { useDashboard } from "@/hooks/use-dashboard"
import { DashboardHeader, DashboardStats, ApplicationsList, QuickActions } from "@/components/dashboard"

export default function DashboardPage() {
  const { applications, loading, user, handleLogout } = useDashboard()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        <DashboardHeader user={user} onLogout={handleLogout} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Selamat Datang ke Dashboard Anda</h1>
            <p className="text-muted-foreground">Uruskan permohonan lesen anda dan jejak status mereka</p>
          </div>

          <DashboardStats applications={applications} />
          <QuickActions />
          <ApplicationsList applications={applications} loading={loading} />
        </div>
      </div>
    </AuthGuard>
  )
}
