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
            Mohon Lesen
          </Button>
        </Link>
      )
    }

    return (
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="text-lg px-8">
            Mula Sekarang
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Masuk Pengguna</DialogTitle>
            <DialogDescription>
              Log masuk ke akaun anda untuk memohon lesen
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Log Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
              <TabsTrigger value="reset">Reset</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-login-email">Emel</Label>
                  <Input
                    id="hero-login-email"
                    type="email"
                    placeholder="anda@emel.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-login-password">Kata Laluan</Label>
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
                  {authLoading ? "Sedang log masuk..." : "Log Masuk"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-register-email">Emel</Label>
                  <Input
                    id="hero-register-email"
                    type="email"
                    placeholder="anda@emel.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-register-password">Kata Laluan</Label>
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
                  {authLoading ? "Mencipta akaun..." : "Cipta Akaun"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="reset">
              <form onSubmit={(e) => handleSubmit(e, 'reset')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-reset-email">Emel</Label>
                  <Input
                    id="hero-reset-email"
                    type="email"
                    placeholder="anda@emel.com"
                    value={formData.resetEmail}
                    onChange={(e) => updateFormData("resetEmail", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={authLoading}>
                  {authLoading ? "Menghantar..." : "Hantar Pautan Reset"}
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
          Portal Permohonan Lesen
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Mohon lesen Pasar dan Penjaja secara dalam talian. Permudahkan proses permohonan lesen anda dengan portal digital yang selamat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {renderCTAButton()}
        </div>
      </div>
    </section>
  )
}
