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
    placeImageFile?: File | null
  }
  updateFormData: (field: string, value: any) => void
}

export function HawkerLicenseStep({ formData, updateFormData }: HawkerLicenseStepProps) {
  // Generate time options (every 30 minutes from 6 AM to 11 PM)
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
        options.push({ value: timeString, label: displayTime })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  // Parse current working hours
  const parseWorkingHours = (hours: string) => {
    if (!hours) return { start: '', end: '' }
    
    const match = hours.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/)
    if (match) {
      return { start: match[1], end: match[2] }
    }
    
    // If it's just a single time (no dash), treat it as start time
    const singleTimeMatch = hours.match(/(\d{2}:\d{2})/)
    if (singleTimeMatch) {
      return { start: singleTimeMatch[1], end: '' }
    }
    
    return { start: '', end: '' }
  }

  const currentHours = parseWorkingHours(formData.workingHours)

  const handleTimeChange = (type: 'start' | 'end', value: string) => {
    const newHours = { ...currentHours, [type]: value }
    
    if (newHours.start && newHours.end) {
      // Both times selected, concatenate them properly
      updateFormData("workingHours", `${newHours.start} - ${newHours.end}`)
    } else if (newHours.start || newHours.end) {
      // Only one time selected, store just that time
      updateFormData("workingHours", newHours.start || newHours.end)
    } else {
      // No times selected, clear the field
      updateFormData("workingHours", "")
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Bahagian III: Maklumat Lesen Penjaja</h3>
      
      {/* First row: Type and Product */}
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
              <SelectItem value="Penjaja Bergerak">Penjaja Bergerak</SelectItem>
              <SelectItem value="Penjaja Tetap">Penjaja Tetap</SelectItem>
              <SelectItem value="Food Truck">Food Truck</SelectItem>
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
      </div>

      {/* Second row: Address */}
      <div className="space-y-2">
        <Label htmlFor="hawkerAddress">Alamat Operasi</Label>
        <Textarea
          id="hawkerAddress"
          value={formData.hawkerAddress}
          onChange={(e) => updateFormData("hawkerAddress", e.target.value)}
          placeholder="Masukkan alamat operasi anda"
          rows={3}
        />
      </div>

      {/* Third row: Working Hours */}
      <div className="space-y-2">
        <Label>Waktu Operasi</Label>
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-sm font-medium">Mula</Label>
            <Select
              value={currentHours.start}
              onValueChange={(value) => handleTimeChange('start', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih masa mula" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-sm font-medium">Tamat</Label>
            <Select
              value={currentHours.end}
              onValueChange={(value) => handleTimeChange('end', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih masa tamat" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Fourth row: Vehicle Type and Registration */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleRegNo">Nombor Pendaftaran Kenderaan</Label>
          <Input
            id="vehicleRegNo"
            value={formData.vehicleRegNo}
            onChange={(e) => updateFormData("vehicleRegNo", e.target.value)}
            placeholder="ABC1234"
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
              <SelectItem value="Motosikal">Motosikal</SelectItem>
              <SelectItem value="Van">Van</SelectItem>
              <SelectItem value="Lori">Lori</SelectItem>
              <SelectItem value="Gerai">Gerai</SelectItem>
              <SelectItem value="Kereta">Kereta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fifth row: File Upload */}
      <div className="space-y-2">
        <Label>Gambar Tempat Operasi</Label>
        <FileUpload
          onFileSelect={(file) => updateFormData("placeImageFile", file)}
          currentFile={formData.placeImageFile}
        />
      </div>
    </div>
  )
}
