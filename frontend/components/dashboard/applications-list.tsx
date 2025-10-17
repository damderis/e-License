import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { ApplicationItem } from "./application-item"
import type { Application } from "@/lib/types"

interface ApplicationsListProps {
  applications: Application[]
  loading: boolean
}

export function ApplicationsList({ applications, loading }: ApplicationsListProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Anda</CardTitle>
          <CardDescription>Lihat dan jejak semua permohonan lesen anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Memuatkan permohonan...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Anda</CardTitle>
          <CardDescription>Lihat dan jejak semua permohonan lesen anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Tiada permohonan lagi</p>
            <Link href="/apply">
              <Button>Hantar Permohonan Pertama Anda</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permohonan Anda</CardTitle>
        <CardDescription>Lihat dan jejak semua permohonan lesen anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationItem key={app.id} application={app} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
