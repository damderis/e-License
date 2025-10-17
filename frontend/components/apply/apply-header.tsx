"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function ApplyHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Portal Kerajaan</span>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>
    </header>
  )
}
