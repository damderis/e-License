import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "1. Hantar Permohonan",
    description: "Isi borang dalam talian dengan maklumat peribadi dan keperluan lesen anda"
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "2. Proses Semakan",
    description: "Pasukan kami akan menyemak permohonan anda dan mengesahkan semua dokumen yang dihantar"
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "3. Dapatkan Kelulusan",
    description: "Terima notifikasi kelulusan lesen dan muat turun lesen rasmi anda"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Langkah Permohonan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
