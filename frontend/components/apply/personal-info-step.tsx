"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoStepProps {
  formData: {
    fullName: string
    icNumber: string
    address: string
    phone: string
    race: string
    gender: string
  }
  updateFormData: (field: string, value: any) => void
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Bahagian I: Maklumat Peribadi</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama Penuh</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e.target.value)}
            placeholder="Masukkan nama penuh anda"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icNumber">Nombor Kad Pengenalan</Label>
          <Input
            id="icNumber"
            value={formData.icNumber}
            onChange={(e) => updateFormData("icNumber", e.target.value)}
            placeholder="123456-78-9012"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Alamat</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData("address", e.target.value)}
            placeholder="Masukkan alamat penuh anda"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Nombor Telefon</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="+60123456789"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="race">Bangsa</Label>
          <Select value={formData.race} onValueChange={(value) => updateFormData("race", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih bangsa" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="Melayu">Melayu</SelectItem>
            <SelectItem value="Cina">Cina</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="Lain-lain">Lain-lain</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Jantina</Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jantina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lelaki">Lelaki</SelectItem>
              <SelectItem value="Wanita">Wanita</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
