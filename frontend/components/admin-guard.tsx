"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-firebase"
import { isUserAdmin } from "@/lib/admin"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Home } from "lucide-react"
import Link from "next/link"

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not authenticated, redirect to auth
        router.push("/")
        return
      }

      if (!isUserAdmin(user)) {
        // User authenticated but not admin, show access denied
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to access this page.",
          variant: "destructive",
        })
        router.push("/")
      }
    }
  }, [user, loading, router, toast])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  // Show loading while redirecting unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  // Show access denied for non-admin users
  if (!isUserAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-xl">Access Denied</CardTitle>
            <CardDescription>
              You don&apos;t have admin privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>Only authorized administrators can access this area.</p>
              <p className="mt-2">Contact your system administrator if you believe this is an error.</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/apply">
                  Apply for License
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // User is authenticated and is admin, render the protected content
  return <>{children}</>
}
