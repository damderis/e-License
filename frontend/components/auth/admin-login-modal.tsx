"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthActions } from "@/hooks/use-auth-actions"

interface AdminLoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
}

export function AdminLoginModal({ open, onOpenChange, children }: AdminLoginModalProps) {
  const {
    authLoading,
    formData,
    updateFormData,
    handleAdminLogin,
  } = useAuthActions()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAdminLogin()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Sign in with admin credentials to access the admin portal
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={authLoading}>
            {authLoading ? "Signing in..." : "Sign in as Admin"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
