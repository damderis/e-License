import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LicenseType {
  title: string
  description: string
  features: string[]
}

const licenseTypes: LicenseType[] = [
  {
    title: "Market License",
    description: "For vendors operating in designated market locations. Includes stall allocation and product type registration.",
    features: [
      "Market type selection",
      "Location preference", 
      "Product category registration"
    ]
  },
  {
    title: "Hawker License",
    description: "For mobile vendors and hawkers. Includes vehicle registration and operating hours specification.",
    features: [
      "Hawker type specification",
      "Vehicle registration",
      "Operating hours and location"
    ]
  }
]

export function LicenseTypesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Available License Types</h2>
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
