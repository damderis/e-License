import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LicenseType {
  title: string
  description: string
  features: string[]
}

const licenseTypes: LicenseType[] = [
  {
    title: "Lesen Pasar",
    description: "Untuk peniaga yang beroperasi di lokasi pasar yang ditetapkan. Termasuk peruntukan lot dan pendaftaran jenis produk.",
    features: [
      "Pemilihan jenis pasar (Pagi/Malam/Lambak/Sehari)",
      "Pemilihan lokasi pasar", 
      "Pendaftaran jenis jualan",
      "Peruntukan lot tapak",
      "Muat naik pelan pasar"
    ]
  },
  {
    title: "Lesen Penjaja",
    description: "Untuk peniaga bergerak dan penjaja. Termasuk pendaftaran kenderaan dan spesifikasi waktu operasi.",
    features: [
      "Spesifikasi jenis penjaja (Bergerak/Tetap/Food Truck)",
      "Pendaftaran kenderaan",
      "Waktu operasi dan lokasi",
      "Muat naik gambar tempat operasi"
    ]
  }
]

export function LicenseTypesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Jenis Lesen Yang Tersedia</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {licenseTypes.map((license, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{license.title}</CardTitle>
                <CardDescription>{license.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {license.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
