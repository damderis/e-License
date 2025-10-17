/**
 * Admin utility functions for role management and authorization
 */

// Admin email configuration
export const ADMIN_EMAILS = [
  'awanaics@gmail.com',
  // Add more admin emails here as needed
  // 'admin2@example.com',
] as const

/**
 * Check if a user has admin privileges based on their email
 * @param email - User's email address
 * @returns boolean indicating if user is admin
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email as any)
}

/**
 * Check if the current authenticated user is an admin
 * @param user - Firebase user object
 * @returns boolean indicating if user is admin
 */
export function isUserAdmin(user: any): boolean {
  return isAdminEmail(user?.email)
}

/**
 * Get admin role information for display purposes
 */
export function getAdminInfo() {
  return {
    emails: ADMIN_EMAILS,
    count: ADMIN_EMAILS.length,
  }
}
