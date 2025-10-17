"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-firebase"
import { useAuthActions } from "@/hooks/use-auth-actions"

export function HeroSection() {
  const { user, loading } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
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

  const renderCTAButton = () => {
    if (loading) {
      return <div className="w-40 h-12 bg-muted animate-pulse rounded-md"></div>
    }

    if (user) {
      return (
        <Link href="/apply">
          <Button size="lg" className="text-lg px-8">
            Apply for License
          </Button>
        </Link>
      )
    }

    return (
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="text-lg px-8">
            Get Started
          </Button>
        </DialogTrigger>
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
                  <Label htmlFor="hero-login-email">Email</Label>
                  <Input
                    id="hero-login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-login-password">Password</Label>
                  <Input
                    id="hero-login-password"
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
                  <Label htmlFor="hero-register-email">Email</Label>
                  <Input
                    id="hero-register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-register-password">Password</Label>
                  <Input
                    id="hero-register-password"
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
                  <Label htmlFor="hero-reset-email">Email</Label>
                  <Input
                    id="hero-reset-email"
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

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          Apply for Market and Hawker Licenses Online
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Streamline your license application process with our secure online portal. Submit applications, track
          status, and receive approvals digitally.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {renderCTAButton()}
        </div>
      </div>
    </section>
  )
}
