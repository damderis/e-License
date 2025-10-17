import { useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { isUserAdmin } from "@/lib/admin"
import { useToast } from "@/hooks/use-toast"

export interface AuthFormData {
  email: string
  password: string
  resetEmail: string
}

export function useAuthActions() {
  const [authLoading, setAuthLoading] = useState(false)
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    resetEmail: "",
  })
  
  const { toast } = useToast()
  const router = useRouter()

  const updateFormData = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetFormData = () => {
    setFormData({ email: "", password: "", resetEmail: "" })
  }

  const handleLogin = async () => {
    setAuthLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      
      resetFormData()
      
      // Redirect regular users to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async () => {
    setAuthLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      toast({
        title: "Success",
        description: "Account created successfully",
      })
      
      resetFormData()
      
      // Redirect regular users to dashboard
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setAuthLoading(true)

    try {
      await sendPasswordResetEmail(auth, formData.resetEmail)
      toast({
        title: "Success",
        description: "Password reset email sent",
      })
      updateFormData("resetEmail", "")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  const handleAdminLogin = async () => {
    setAuthLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user
      
      if (!isUserAdmin(user)) {
        toast({
          title: "Access Denied",
          description: "This account does not have admin privileges.",
          variant: "destructive",
        })
        await auth.signOut()
        return
      }
      
      toast({
        title: "Success",
        description: "Admin access granted",
      })
      
      resetFormData()
      
      // Redirect admin to admin dashboard
      router.push("/admin")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      })
    } finally {
      setAuthLoading(false)
    }
  }

  return {
    authLoading,
    formData,
    updateFormData,
    resetFormData,
    handleLogin,
    handleRegister,
    handlePasswordReset,
    handleAdminLogin,
  }
}
