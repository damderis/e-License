"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"

interface HawkerLicenseStepProps {
  formData: {
    hawkerType: string
    hawkerAddress: string
    hawkerProduct: string
    workingHours: string
    vehicleType: string
    vehicleRegNo: string
    placeImageUrl: string
  }
  updateFormData: (field: string, value: any) => void
}

export function HawkerLicenseStep({ formData, updateFormData }: HawkerLicenseStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Bahagian III: Maklumat Lesen Penjaja</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hawkerType">Jenis Penjaja</Label>
          <Select
            value={formData.hawkerType}
            onValueChange={(value) => updateFormData("hawkerType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis penjaja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Penjaja Bergerak</SelectItem>
              <SelectItem value="stationary">Penjaja Tetap</SelectItem>
              <SelectItem value="food-truck">Trak Makanan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hawkerProduct">Produk/Perkhidmatan</Label>
          <Input
            id="hawkerProduct"
            value={formData.hawkerProduct}
            onChange={(e) => updateFormData("hawkerProduct", e.target.value)}
            placeholder="Apa yang akan anda jual?"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="hawkerAddress">Alamat Operasi</Label>
          <Textarea
            id="hawkerAddress"
            value={formData.hawkerAddress}
            onChange={(e) => updateFormData("hawkerAddress", e.target.value)}
            placeholder="Masukkan alamat operasi anda"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workingHours">Waktu Operasi</Label>
          <Input
            id="workingHours"
            value={formData.workingHours}
            onChange={(e) => updateFormData("workingHours", e.target.value)}
            placeholder="Contoh: 8:00 AM - 6:00 PM"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Jenis Kenderaan</Label>
          <Select
            value={formData.vehicleType}
            onValueChange={(value) => updateFormData("vehicleType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis kenderaan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="motorcycle">Motosikal</SelectItem>
              <SelectItem value="van">Van</SelectItem>
              <SelectItem value="truck">Lori</SelectItem>
              <SelectItem value="cart">Gerai</SelectItem>
              <SelectItem value="none">Tiada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleRegNo">Nombor Pendaftaran Kenderaan</Label>
          <Input
            id="vehicleRegNo"
            value={formData.vehicleRegNo}
            onChange={(e) => updateFormData("vehicleRegNo", e.target.value)}
            placeholder="ABC1234"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Gambar Tempat Operasi</Label>
          <FileUpload
            onUploadComplete={(url) => updateFormData("placeImageUrl", url)}
            currentFile={formData.placeImageUrl}
          />
        </div>
      </div>
    </div>
  )
}
