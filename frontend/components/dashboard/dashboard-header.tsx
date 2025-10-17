"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, LogOut } from "lucide-react"
import { User } from "firebase/auth"

interface DashboardHeaderProps {
  user: User | null
  onLogout: () => void
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Portal Kerajaan</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Keluar
          </Button>
        </div>
      </div>
    </header>
  )
}
