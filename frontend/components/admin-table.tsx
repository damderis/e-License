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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-firebase"
import { CheckCircle, XCircle, Download, MoreHorizontal } from "lucide-react"
import type { Application } from "@/lib/types"
import { usePdfGenerator } from "@/hooks/use-pdf-generator"

interface AdminTableProps {
  applications: Application[]
  onUpdate: () => void
}

export function AdminTable({ applications, onUpdate }: AdminTableProps) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const { user } = useAuth()
  const { generatePdf, generating } = usePdfGenerator()

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
      console.error("Update error:", error)
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
    const licenseType = app.applyForPasar && app.pasarLicense ? "PASAR" : app.hawkerLicense ? "PENJAJA" : "TIDAK DIKETAHUI"
    
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

License Type: ${licenseType}

${app.applyForPasar && app.pasarLicense ? `
Market License Details:
- Jenis Pasar: ${app.pasarLicense.jenisPasar}
- Lokasi Pasar: ${app.pasarLicense.lokasiPasar}
- Jumlah Lot: ${app.pasarLicense.jumlahLot}
- Jenis Jualan: ${app.pasarLicense.jenisJualan.map(item => `${item.category}: ${item.description}`).join(', ')}
` : app.hawkerLicense ? `
Hawker License Details:
- Type: ${app.hawkerLicense.hawkerType}
- Address: ${app.hawkerLicense.address}
- Product: ${app.hawkerLicense.product}
- Hours: ${app.hawkerLicense.workingHours}
- Vehicle: ${app.hawkerLicense.vehicleType} (${app.hawkerLicense.vehicleRegNo})
` : ''}

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

  const getStatusVariant = (status: string): "green" | "secondary" | "destructive" => {
    switch (status) {
      case "pending":
        return "secondary"
      case "approved":
        return "green"
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
              <TableHead>Nama Penuh</TableHead>
              <TableHead>No. Kad Pengenalan</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Jenis Lesen</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tarikh Permohonan</TableHead>
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
                      {app.applyForPasar && app.pasarLicense ? (
                        <div>Lesen Pasar dan Penjaja</div>
                      ) : app.hawkerLicense ? (
                        <div>Lesen Penjaja</div>
                      ) : (
                        <div className="text-muted-foreground">Tidak Diketahui</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(app.status)} className="capitalize">
                      {app.status === "pending" ? "Menunggu" : app.status === "approved" ? "Disahkan" : "Ditolak"}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.createdAt?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Approve/Reject buttons - only for pending applications */}
                      {app.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(app.id, "approved", user?.email || "admin")}
                            disabled={loading === app.id}
                            title="Approve Application"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(app.id, "rejected", user?.email || "admin")}
                            disabled={loading === app.id}
                            title="Reject Application"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}

                      {/* Dropdown menu for View Details and Download actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem 
                                onSelect={(e) => {
                                  e.preventDefault()
                                  setSelectedApp(app)
                                }}
                              >
                                Lihat Butiran
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Butiran Permohonan</DialogTitle>
                                <DialogDescription>Semak butiran permohonan lengkap</DialogDescription>
                              </DialogHeader>
                              
                              {selectedApp && (
                                <div className="space-y-6">
                                  <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Status:</span>
                                      <Badge variant={getStatusVariant(selectedApp.status)} className="capitalize">
                                        {selectedApp.status === "pending" ? "Menunggu" : selectedApp.status === "approved" ? "Disahkan" : "Ditolak"}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-3 text-foreground">Maklumat Peribadi</h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Nama Penuh:</span>
                                        <p className="text-foreground">{selectedApp.personalInfo.fullName}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">No. Kad Pengenalan:</span>
                                        <p className="text-foreground">{selectedApp.personalInfo.icNumber}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <span className="text-muted-foreground">Alamat:</span>
                                        <p className="text-foreground">{selectedApp.personalInfo.address}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">No. Telefon:</span>
                                        <p className="text-foreground">{selectedApp.personalInfo.phone}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Bangsa:</span>
                                        <p className="text-foreground">{selectedApp.personalInfo.race}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Jantina:</span>
                                        <p className="text-foreground capitalize">{selectedApp.personalInfo.gender}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {selectedApp.applyForPasar && selectedApp.pasarLicense && (
                                    <div>
                                      <h3 className="font-semibold mb-3 text-foreground">Lesen Pasar dan Penjaja</h3>
                                      <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">Jenis Pasar:</span>
                                          <p className="text-foreground">{selectedApp.pasarLicense.jenisPasar}</p>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Jumlah Lot:</span>
                                          <p className="text-foreground">{selectedApp.pasarLicense.jumlahLot}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="text-muted-foreground">Lokasi Pasar:</span>
                                          <p className="text-foreground">{selectedApp.pasarLicense.jenisPasar}</p>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Jumlah Lot:</span>
                                          <p className="text-foreground">{selectedApp.pasarLicense.jumlahLot}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="text-muted-foreground">Lokasi Pasar:</span>
                                          <p className="text-foreground">{selectedApp.pasarLicense.lokasiPasar}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="text-muted-foreground">Jenis Jualan:</span>
                                          <div className="space-y-1">
                                            {selectedApp.pasarLicense.jenisJualan.map((item, index) => (
                                              <p key={index} className="text-foreground">
                                                {item.category}: {item.description}
                                              </p>
                                            ))}
                                          </div>
                                          {selectedApp.pasarLicense.pelanPasar && (
                                          <div className="col-span-2">
                                            <span className="text-muted-foreground">Pelan Pasar:</span>
                                            <img
                                              src={selectedApp.pasarLicense.pelanPasar || "/placeholder.svg"}
                                              alt="Place of operation"
                                              className="mt-2 rounded-lg max-h-64 object-cover"
                                            />
                                          </div>
                                        )}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {selectedApp.hawkerLicense && (
                                    <div>
                                      <h3 className="font-semibold mb-3 text-foreground">Lesen Penjaja</h3>
                                      <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <span className="text-muted-foreground">Jenis Penjaja:</span>
                                          <p className="text-foreground">{selectedApp.hawkerLicense.hawkerType}</p>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Produk/Perkhidmatan:</span>
                                          <p className="text-foreground">{selectedApp.hawkerLicense.product}</p>
                                        </div>
                                        <div className="col-span-2">
                                          <span className="text-muted-foreground">Alamat Operasi:</span>
                                          <p className="text-foreground">{selectedApp.hawkerLicense.address}</p>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Waktu Operasi:</span>
                                          <p className="text-foreground">{selectedApp.hawkerLicense.workingHours}</p>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Jenis Kenderaan:</span>
                                          <p className="text-foreground">
                                            {selectedApp.hawkerLicense.vehicleType} (
                                            {selectedApp.hawkerLicense.vehicleRegNo})
                                          </p>
                                        </div>
                                        {selectedApp.hawkerLicense.placeImageUrl && (
                                          <div className="col-span-2">
                                            <span className="text-muted-foreground">Gambar Lokasi Operasi:</span>
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
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* PDF Generation - Only show for approved applications */}
                          {app.status === "approved" && (
                            <>
                              {app.applyForPasar && app.pasarLicense && (
                                <DropdownMenuItem
                                  onClick={() => generatePdf(app, 'pasar')}
                                  disabled={generating}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Lesen Pasar
                                </DropdownMenuItem>
                              )}

                              {app.hawkerLicense && (
                                <DropdownMenuItem
                                  onClick={() => generatePdf(app, 'hawker')}
                                  disabled={generating}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Lesen Penjaja
                                </DropdownMenuItem>
                              )}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
