const TOKEN_KEY = "token"

/**
 * Save JWT token
 */
export function setToken(
  token: string
) {

  localStorage.setItem(
    TOKEN_KEY,
    token
  )
}

/**
 * Get JWT token
 */
export function getToken() {

  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(
    TOKEN_KEY
  )
}

/**
 * Remove JWT token
 */
export function removeToken() {

  localStorage.removeItem(
    TOKEN_KEY
  )
}

/**
 * Check authentication status
 */
export function isAuthenticated() {

  return !!getToken()
}