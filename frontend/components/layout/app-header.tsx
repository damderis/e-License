"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { LogIn, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-firebase"
import { UserLoginModal } from "@/components/auth/user-login-modal"
import { AdminLoginModal } from "@/components/auth/admin-login-modal"
import { isUserAdmin } from "@/lib/admin"

export function AppHeader() {
  const { user, loading } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false)

  const renderAuthButtons = () => {
    if (loading) {
      return <div className="w-20 h-9 bg-muted animate-pulse rounded-md"></div>
    }

    if (user) {
      return (
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      )
    }
    if (user && isUserAdmin(user)) {
      return (
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <LogIn className="h-4 w-4 mr-2" />
            Admin Dashboard
          </Button>
        </Link>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <UserLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </DialogTrigger>
        </UserLoginModal>
        
        <AdminLoginModal open={adminLoginModalOpen} onOpenChange={setAdminLoginModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Admin Login
            </Button>
          </DialogTrigger>
        </AdminLoginModal>
      </div>
    )
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/placeholder-logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-bold text-foreground">Portal Permohonan Lesen</span>
        </div>
        {renderAuthButtons()}
      </div>
    </header>
  )
}
