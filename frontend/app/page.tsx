import { AppHeader, AppFooter } from "@/components/layout"
import { HeroSection, FeaturesSection, LicenseTypesSection, CTASection } from "@/components/sections"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <HeroSection />
      <FeaturesSection />
      <LicenseTypesSection />
      <CTASection />
      <AppFooter />
    </div>
  )
}
