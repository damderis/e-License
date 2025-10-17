import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function QuickActions() {
  return (
    <div className="mb-6">
      <Link href="/apply">
        <Button size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Permohonan Baru
        </Button>
      </Link>
    </div>
  )
}
