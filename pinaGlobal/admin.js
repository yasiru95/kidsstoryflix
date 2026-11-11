import { defineStore } from "pinia"
import { ref } from "vue"
import { navigateTo, useCookie } from "#app"

export const useAdminStore = defineStore("adminStore", () => {
  // Secret token requested by user
  const ADMIN_SECRET_TOKEN = "yasiru123"
  const DEFAULT_ADMIN_EMAIL = "admin@kidsstoryflix.co.uk"
  const DEFAULT_ADMIN_PASSWORD = "Admin@1234"

  const isAdminLoggedIn = ref(false)
  const adminUser = ref(null)
  const adminToken = ref(null)

  // Initialize Auth (runs on SSR & Client)
  const initAdminAuth = () => {
    const tokenCookie = useCookie("admin_token")
    const userCookie = useCookie("admin_user")

    let token = tokenCookie.value
    let user = userCookie.value

    // Fallback to localStorage on client if cookie wasn't read
    if (import.meta.client && (!token || !user)) {
      const lsToken = localStorage.getItem("admin_token")
      const lsUser = localStorage.getItem("admin_user")
      if (lsToken) token = lsToken
      if (lsUser) {
        try {
          user = typeof lsUser === "string" ? JSON.parse(lsUser) : lsUser
        } catch {
          user = null
        }
      }
    }

    if (token === ADMIN_SECRET_TOKEN && user) {
      isAdminLoggedIn.value = true
      adminToken.value = token
      adminUser.value = typeof user === "string" ? JSON.parse(user) : user
      return true
    } else {
      isAdminLoggedIn.value = false
      adminToken.value = null
      adminUser.value = null
      return false
    }
  }

  // Admin Login Action
  const loginAdmin = ({ email, password, token }) => {
    const trimmedEmail = (email || "").trim().toLowerCase()
    const trimmedPassword = (password || "").trim()
    const trimmedToken = (token || "").trim()

    // Validate token first
    if (trimmedToken !== ADMIN_SECRET_TOKEN) {
      return {
        success: false,
        message: "Invalid Security Token! Please provide the correct admin token (yasiru123)."
      }
    }

    // Validate admin credentials
    if (trimmedEmail !== DEFAULT_ADMIN_EMAIL.toLowerCase() || trimmedPassword !== DEFAULT_ADMIN_PASSWORD) {
      return {
        success: false,
        message: "Invalid Admin Email or Password!"
      }
    }

    // Success
    const profile = {
      id: "admin-1",
      name: "KidsStoryFlix Admin",
      email: DEFAULT_ADMIN_EMAIL,
      role: "admin",
      loginTime: new Date().toISOString()
    }

    isAdminLoggedIn.value = true
    adminToken.value = ADMIN_SECRET_TOKEN
    adminUser.value = profile

    // Set Cookies (1 week expiration)
    const tokenCookie = useCookie("admin_token", { maxAge: 60 * 60 * 24 * 7, path: "/" })
    const userCookie = useCookie("admin_user", { maxAge: 60 * 60 * 24 * 7, path: "/" })
    tokenCookie.value = ADMIN_SECRET_TOKEN
    userCookie.value = JSON.stringify(profile)

    // Set localStorage for client persistence
    if (import.meta.client) {
      localStorage.setItem("admin_token", ADMIN_SECRET_TOKEN)
      localStorage.setItem("admin_user", JSON.stringify(profile))
    }

    return {
      success: true,
      message: "Admin Login Successful!",
      token: ADMIN_SECRET_TOKEN,
      user: profile
    }
  }

  // Admin Logout Action
  const logoutAdmin = () => {
    isAdminLoggedIn.value = false
    adminToken.value = null
    adminUser.value = null

    const tokenCookie = useCookie("admin_token", { path: "/" })
    const userCookie = useCookie("admin_user", { path: "/" })
    tokenCookie.value = null
    userCookie.value = null

    if (import.meta.client) {
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_user")
    }

    return navigateTo("/admin/login")
  }

  return {
    ADMIN_SECRET_TOKEN,
    DEFAULT_ADMIN_EMAIL,
    DEFAULT_ADMIN_PASSWORD,
    isAdminLoggedIn,
    adminUser,
    adminToken,
    initAdminAuth,
    loginAdmin,
    logoutAdmin
  }
})

