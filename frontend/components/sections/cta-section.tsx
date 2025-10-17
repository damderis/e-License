import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Create an account and submit your license application today
        </p>
        <Button size="lg" className="text-lg px-8">
          Get Started
        </Button>
      </div>
    </section>
  )
}
