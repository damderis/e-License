"use client"

import { useState } from "react"
import { doc, updateDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Eye, CheckCircle, XCircle, Download } from "lucide-react"
import type { Application } from "@/lib/types"

interface AdminTableProps {
  applications: Application[]
  onUpdate: () => void
}

export function AdminTable({ applications, onUpdate }: AdminTableProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStatusUpdate = async (appId: string, status: "approved" | "rejected", adminEmail: string) => {
    setLoading(appId)
    try {
      const appRef = doc(db, "applications", appId)
      await updateDoc(appRef, {
        status,
        reviewedBy: adminEmail,
        reviewedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      })
      onUpdate()
    } catch (error) {
      console.error("[v0] Update error:", error)
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  const exportToPDF = (app: Application) => {
    // Create a simple text representation for PDF export
    const content = `
LICENSE APPLICATION
==================

Personal Information:
- Name: ${app.personalInfo.fullName}
- IC Number: ${app.personalInfo.icNumber}
- Address: ${app.personalInfo.address}
- Phone: ${app.personalInfo.phone}
- Race: ${app.personalInfo.race}
- Gender: ${app.personalInfo.gender}

Market License:
- Type: ${app.marketLicense?.marketType || "N/A"}
- Location: ${app.marketLicense?.location || "N/A"}
- Product: ${app.marketLicense?.productType || "N/A"}

Hawker License:
- Type: ${app.hawkerLicense?.hawkerType || "N/A"}
- Address: ${app.hawkerLicense?.address || "N/A"}
- Product: ${app.hawkerLicense?.product || "N/A"}
- Hours: ${app.hawkerLicense?.workingHours || "N/A"}
- Vehicle: ${app.hawkerLicense?.vehicleType || "N/A"} (${app.hawkerLicense?.vehicleRegNo || "N/A"})

Status: ${app.status.toUpperCase()}
Submitted: ${app.createdAt?.toLocaleDateString()}
${app.reviewedAt ? `Reviewed: ${app.reviewedAt.toLocaleDateString()}` : ""}
${app.reviewedBy ? `Reviewed By: ${app.reviewedBy}` : ""}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `license-${app.personalInfo.icNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Success",
      description: "License exported successfully",
    })
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>IC Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>License Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.personalInfo.fullName}</TableCell>
                  <TableCell>{app.personalInfo.icNumber}</TableCell>
                  <TableCell>{app.userEmail}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {app.marketLicense?.marketType && <div>Market</div>}
                      {app.hawkerLicense?.hawkerType && <div>Hawker</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(app.status)} className="capitalize">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.createdAt?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedApp(app)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>Review the complete application information</DialogDescription>
                          </DialogHeader>
                          {selectedApp && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="font-semibold mb-3 text-foreground">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Name:</span>
                                    <p className="text-foreground">{selectedApp.personalInfo.fullName}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">IC Number:</span>
                                    <p className="text-foreground">{selectedApp.personalInfo.icNumber}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <span className="text-muted-foreground">Address:</span>
                                    <p className="text-foreground">{selectedApp.personalInfo.address}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Phone:</span>
                                    <p className="text-foreground">{selectedApp.personalInfo.phone}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Race:</span>
                                    <p className="text-foreground">{selectedApp.personalInfo.race}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Gender:</span>
                                    <p className="text-foreground capitalize">{selectedApp.personalInfo.gender}</p>
                                  </div>
                                </div>
                              </div>

                              {selectedApp.marketLicense && (
                                <div>
                                  <h3 className="font-semibold mb-3 text-foreground">Market License</h3>
                                  <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Type:</span>
                                      <p className="text-foreground">{selectedApp.marketLicense.marketType}</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Location:</span>
                                      <p className="text-foreground">{selectedApp.marketLicense.location}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">Product Type:</span>
                                      <p className="text-foreground">{selectedApp.marketLicense.productType}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedApp.hawkerLicense && (
                                <div>
                                  <h3 className="font-semibold mb-3 text-foreground">Hawker License</h3>
                                  <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Type:</span>
                                      <p className="text-foreground">{selectedApp.hawkerLicense.hawkerType}</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Product:</span>
                                      <p className="text-foreground">{selectedApp.hawkerLicense.product}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <span className="text-muted-foreground">Address:</span>
                                      <p className="text-foreground">{selectedApp.hawkerLicense.address}</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Working Hours:</span>
                                      <p className="text-foreground">{selectedApp.hawkerLicense.workingHours}</p>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Vehicle:</span>
                                      <p className="text-foreground">
                                        {selectedApp.hawkerLicense.vehicleType} (
                                        {selectedApp.hawkerLicense.vehicleRegNo})
                                      </p>
                                    </div>
                                    {selectedApp.hawkerLicense.placeImageUrl && (
                                      <div className="col-span-2">
                                        <span className="text-muted-foreground">Place Image:</span>
                                        <img
                                          src={selectedApp.hawkerLicense.placeImageUrl || "/placeholder.svg"}
                                          alt="Place of operation"
                                          className="mt-2 rounded-lg max-h-64 object-cover"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="pt-4 border-t">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Status:</span>
                                  <Badge variant={getStatusVariant(selectedApp.status)} className="capitalize">
                                    {selectedApp.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {app.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(app.id, "approved", app.userEmail)}
                            disabled={loading === app.id}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(app.id, "rejected", app.userEmail)}
                            disabled={loading === app.id}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}

                      {app.status === "approved" && (
                        <Button variant="ghost" size="sm" onClick={() => exportToPDF(app)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
