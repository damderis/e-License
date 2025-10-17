export type ApplicationStatus = "pending" | "approved" | "rejected"

export interface PersonalInfo {
  fullName: string
  icNumber: string
  address: string
  phone: string
  race: string
  gender: "male" | "female"
}

export interface MarketLicense {
  marketType: string
  location: string
  productType: string
}

export interface HawkerLicense {
  hawkerType: string
  address: string
  product: string
  workingHours: string
  vehicleType: string
  vehicleRegNo: string
  placeImageUrl?: string
}

export interface Application {
  id: string
  userId: string
  userEmail: string
  personalInfo: PersonalInfo
  marketLicense?: MarketLicense
  hawkerLicense?: HawkerLicense
  agreedToTerms: boolean
  status: ApplicationStatus
  createdAt: Date
  updatedAt: Date
  reviewedBy?: string
  reviewedAt?: Date
}
