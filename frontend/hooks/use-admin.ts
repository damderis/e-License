import { useEffect, useState } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { db, auth } from "@/lib/firebase"
import { useAuth } from "@/hooks/use-firebase"
import { useToast } from "@/hooks/use-toast"
import type { Application } from "@/lib/types"

export function useAdmin() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  const fetchApplications = async () => {
    try {
      // Simple query without orderBy to avoid index requirement for prototype
      const q = query(collection(db, "applications"))
      const querySnapshot = await getDocs(q)
      const apps: Application[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        apps.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          reviewedAt: data.reviewedAt?.toDate(),
        } as Application)
      })

      // Sort in JavaScript instead of Firestore for prototype
      apps.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      setApplications(apps)
    } catch (error) {
      console.error("[Admin] Fetch error:", error)
      toast({
        title: "Ralat",
        description: "Gagal memuatkan permohonan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Gagal log keluar",
        variant: "destructive",
      })
    }
  }

  return {
    applications,
    loading,
    user,
    handleLogout,
    refetch: fetchApplications,
  }
}
