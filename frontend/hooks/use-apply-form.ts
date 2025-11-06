import { useState } from "react"
import { useRouter } from "next/navigation"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/hooks/use-firebase"
import { useToast } from "@/hooks/use-toast"
import { uploadFileToStorage } from "@/lib/file-upload"

export interface ApplyFormData {
  // Personal Info
  fullName: string
  icNumber: string
  address: string
  phone: string
  race: string
  gender: string
  // Pasar License (conditional)
  applyForPasar: boolean
  jenisPasar: string
  lokasiPasar: string
  jenisJualan: Array<{ category: string; description: string }>
  pelanPasar: string
  pelanPasarFile?: File | null
  jumlahLot: string
  // Hawker License
  hawkerType: string
  hawkerAddress: string
  hawkerProduct: string
  workingHours: string
  vehicleType: string
  vehicleRegNo: string
  placeImageUrl: string
  placeImageFile?: File | null
  // Agreement
  agreedToTerms: boolean
}

const initialFormData: ApplyFormData = {
  // Personal Info
  fullName: "",
  icNumber: "",
  address: "",
  phone: "",
  race: "",
  gender: "",
  // Pasar License (conditional)
  applyForPasar: false,
  jenisPasar: "",
  lokasiPasar: "",
  jenisJualan: [],
  pelanPasar: "",
  jumlahLot: "",
  // Hawker License
  hawkerType: "",
  hawkerAddress: "",
  hawkerProduct: "",
  workingHours: "",
  vehicleType: "",
  vehicleRegNo: "",
  placeImageUrl: "",
  placeImageFile: null,
  // Agreement
  agreedToTerms: false,
}

export function useApplyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ApplyFormData>(initialFormData)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addJenisJualan = () => {
    setFormData((prev) => ({
      ...prev,
      jenisJualan: [...prev.jenisJualan, { category: "", description: "" }]
    }))
  }

  const updateJenisJualan = (index: number, field: 'category' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      jenisJualan: prev.jenisJualan.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeJenisJualan = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      jenisJualan: prev.jenisJualan.filter((_, i) => i !== index)
    }))
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (
          !formData.fullName ||
          !formData.icNumber ||
          !formData.address ||
          !formData.phone ||
          !formData.race ||
          !formData.gender
        ) {
          toast({
            title: "Ralat Pengesahan",
            description: "Sila isi semua maklumat peribadi",
            variant: "destructive",
          })
          return false
        }
        break
      case 2:
        // If user wants to apply for Pasar license, validate those fields
        if (formData.applyForPasar) {
          if (
            !formData.jenisPasar ||
            !formData.lokasiPasar ||
            !formData.jumlahLot ||
            formData.jenisJualan.length === 0 ||
            formData.jenisJualan.some(item => !item.category || !item.description)
          ) {
            toast({
              title: "Ralat Pengesahan",
              description: "Sila isi semua maklumat lesen pasar",
              variant: "destructive",
            })
            return false
          }
        }
        break
      case 3:
        if (
          !formData.hawkerType ||
          !formData.hawkerAddress ||
          !formData.hawkerProduct ||
          !formData.workingHours ||
          !formData.vehicleType ||
          !formData.vehicleRegNo
        ) {
          toast({
            title: "Ralat Pengesahan",
            description: "Sila isi semua maklumat lesen penjaja",
            variant: "destructive",
          })
          return false
        }
        break
      case 5:
        if (!formData.agreedToTerms) {
          toast({
            title: "Ralat Pengesahan",
            description: "Sila setujui terma dan syarat",
            variant: "destructive",
          })
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setLoading(true)
    try {
      // Upload image file if exists
      let imageUrl = formData.placeImageUrl
      if (formData.placeImageFile) {
        const timestamp = Date.now()
        const fileName = `${timestamp}_${formData.placeImageFile.name}`
        const uploadPath = `applications/${user?.uid}/${fileName}`
        
        imageUrl = await uploadFileToStorage(formData.placeImageFile, uploadPath, (progress) => {
          // You can add progress tracking here if needed
          console.log(`Upload progress: ${progress.progress}%`)
        })
      }

      // Upload pasar plan file if exists
      let pelanPasarUrl = formData.pelanPasar
      if (formData.pelanPasarFile) {
        const timestamp = Date.now()
        const fileName = `pasar_plan_${timestamp}_${formData.pelanPasarFile.name}`
        const uploadPath = `applications/${user?.uid}/${fileName}`
        
        pelanPasarUrl = await uploadFileToStorage(formData.pelanPasarFile, uploadPath, (progress) => {
          console.log(`Pasar plan upload progress: ${progress.progress}%`)
        })
      }

      await addDoc(collection(db, "applications"), {
        userId: user?.uid,
        userEmail: user?.email,
        personalInfo: {
          fullName: formData.fullName,
          icNumber: formData.icNumber,
          address: formData.address,
          phone: formData.phone,
          race: formData.race,
          gender: formData.gender,
        },
        // Pasar License (only if user wants to apply)
        applyForPasar: formData.applyForPasar,
        ...(formData.applyForPasar && {
          pasarLicense: {
            jenisPasar: formData.jenisPasar,
            lokasiPasar: formData.lokasiPasar,
            jenisJualan: formData.jenisJualan,
            pelanPasar: pelanPasarUrl,
            jumlahLot: formData.jumlahLot,
          }
        }),
        hawkerLicense: {
          hawkerType: formData.hawkerType,
          address: formData.hawkerAddress,
          product: formData.hawkerProduct,
          workingHours: formData.workingHours,
          vehicleType: formData.vehicleType,
          vehicleRegNo: formData.vehicleRegNo,
          placeImageUrl: imageUrl,
        },
        agreedToTerms: formData.agreedToTerms,
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      toast({
        title: "Berjaya",
        description: "Permohonan berjaya dihantar",
      })
      router.push("/dashboard")
    } catch (error: any) {
      console.error("[Apply] Submit error:", error)
      toast({
        title: "Ralat",
        description: "Gagal menghantar permohonan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    currentStep,
    loading,
    formData,
    updateFormData,
    addJenisJualan,
    updateJenisJualan,
    removeJenisJualan,
    handleNext,
    handlePrevious,
    handleSubmit,
  }
}
