export interface FirebaseUserInfo {
  displayName: string | null
  email: string | null
  emailVerified: boolean
  isAnonymous: boolean
  metadata: {
    creationTime: number
    lastSignInTime: number
  }
  multiFactor?: {
    enrolledFactors: any[]
  }
  phoneNumber: string | null
  photoURL: string | null
  providerData: any[]
  providerId: string
  tenantId: string | null
  uid: string
}
