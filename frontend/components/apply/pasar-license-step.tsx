"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUpload } from "@/components/file-upload"

interface PasarLicenseStepProps {
  formData: {
    applyForPasar: boolean
    jenisPasar: string
    lokasiPasar: string
    jenisJualan: Array<{ category: string; description: string }>
    pelanPasar: string
    jumlahLot: string
  }
  updateFormData: (field: string, value: any) => void
  addJenisJualan: () => void
  updateJenisJualan: (index: number, field: 'category' | 'description', value: string) => void
  removeJenisJualan: (index: number) => void
}

export function PasarLicenseStep({ 
  formData, 
  updateFormData, 
  addJenisJualan, 
  updateJenisJualan, 
  removeJenisJualan 
}: PasarLicenseStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Bahagian II: Permohonan Lesen Pasar</h3>
      
      {/* Conditional checkbox */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="applyForPasar"
            checked={formData.applyForPasar}
            onCheckedChange={(checked) => updateFormData("applyForPasar", checked)}
          />
          <Label htmlFor="applyForPasar" className="text-sm font-normal cursor-pointer">
            Adakah pemohon ingin memohon lesen Pasar (Pagi / Malam / Lambak / Sehari)?
          </Label>
        </div>

        {!formData.applyForPasar && (
          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="text-sm text-muted-foreground">
              Bahagian ini tidak perlu diisi.
            </p>
          </div>
        )}

        {formData.applyForPasar && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jenisPasar">Jenis Pasar</Label>
                <Select
                  value={formData.jenisPasar}
                  onValueChange={(value) => updateFormData("jenisPasar", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis pasar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pasar-pagi">Pasar Pagi</SelectItem>
                    <SelectItem value="pasar-malam">Pasar Malam</SelectItem>
                    <SelectItem value="pasar-lambak">Pasar Lambak</SelectItem>
                    <SelectItem value="pasar-sehari">Pasar Sehari</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jumlahLot">Jumlah Lot (1-10)</Label>
                <Input
                  id="jumlahLot"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.jumlahLot}
                  onChange={(e) => updateFormData("jumlahLot", e.target.value)}
                  placeholder="Masukkan jumlah lot"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lokasiPasar">Lokasi Pasar</Label>
              <Textarea
                id="lokasiPasar"
                value={formData.lokasiPasar}
                onChange={(e) => updateFormData("lokasiPasar", e.target.value)}
                placeholder="Masukkan lokasi pasar (maksimum 3 lokasi, dipisahkan dengan koma)"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Contoh: Pasar Chow Kit, Pasar Seni, Pasar Besar Kuala Lumpur
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Jenis Jualan</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addJenisJualan}
                >
                  + Tambah Jualan
                </Button>
              </div>
              
              {formData.jenisJualan.map((item, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-3 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateJenisJualan(index, 'category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="makanan">Makanan</SelectItem>
                        <SelectItem value="minuman">Minuman</SelectItem>
                        <SelectItem value="lain-lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Penerangan</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateJenisJualan(index, 'description', e.target.value)}
                      placeholder="Contoh: Nasi Lemak, Teh Tarik"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeJenisJualan(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Pelan Pasar</Label>
              <FileUpload
                onUploadComplete={(url) => updateFormData("pelanPasar", url)}
                currentFile={formData.pelanPasar}
              />
              <p className="text-xs text-muted-foreground">
                Muat naik gambar atau PDF pelan pasar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
