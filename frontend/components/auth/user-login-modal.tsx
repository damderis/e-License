"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
import { useAuthActions } from "@/hooks/use-auth-actions"

interface UserLoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
}

export function UserLoginModal({ open, onOpenChange, children }: UserLoginModalProps) {
  const {
    authLoading,
    formData,
    updateFormData,
    handleLogin,
    handleRegister,
    handlePasswordReset,
  } = useAuthActions()

  const handleSubmit = (e: React.FormEvent, action: 'login' | 'register' | 'reset') => {
    e.preventDefault()
    
    switch (action) {
      case 'login':
        handleLogin()
        break
      case 'register':
        handleRegister()
        break
      case 'reset':
        handlePasswordReset()
        break
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Login</DialogTitle>
          <DialogDescription>
            Sign in to your account to apply for licenses
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="reset">Reset</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="reset">
            <form onSubmit={(e) => handleSubmit(e, 'reset')} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.resetEmail}
                  onChange={(e) => updateFormData("resetEmail", e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={authLoading}>
                {authLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
