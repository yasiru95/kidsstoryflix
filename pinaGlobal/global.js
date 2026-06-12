import { defineStore } from "pinia"
import { ref } from "vue"
import api from "../services/Api.js"
import { navigateTo } from "#app"

export const globalStore = defineStore("appStore", () => {

  // 🌍 GLOBAL STATE
  const isLoggedIn = ref(false)
  const mobileMenu = ref(false)
  const isKidSubscribed = ref(false)
  const userLogin = ref(null)


  const checkSubscription = async () => {

  console.log("Checking subscription for user:" + userLogin.value.token)

try {
  const response = await api.get('/subscription', {
    headers: {
      Authorization: `Bearer ${userLogin.value.token}`
    },
    params: {
      user_id: userLogin.value.id,
    }
  })

  // console.log('Subscription data:', response.data.has_subscription)
  userLogin.value.isKidSubscribed = response.data.has_subscription
  return response.data;
  // console.log("Updated subscription status in global store:", userLogin.isKidSubscribed)

} catch (error) {

  // Laravel responded with an error
  if (error.response) {

    console.error('Status:', error.response.status)
    console.error('Backend Error:', error.response.data)

    // Validation errors (422)
    if (error.response.status === 422) {
      console.log(error.response.data.errors)
    }

    // Unauthorized (401)
    else if (error.response.status === 401) {
      alert(error.response.data.message || 'Unauthorized')
    }

    // Forbidden (403)
    else if (error.response.status === 403) {
      alert(error.response.data.message || 'Access denied')
    }

    // Not found (404)
    else if (error.response.status === 404) {
      alert(error.response.data.message || 'Resource not found')
    }

    // Server error (500)
    else if (error.response.status === 500) {
      alert(error.response.data.message || 'Server error')
    }

  }
  // No response from server
  else if (error.request) {
    console.error('No response from server')
    alert('Cannot connect to server')
  }
  // Other error
  else {
    console.error(error.message)
    alert(error.message)
  }
}


}

  // 🔐 LOGIN
  const login = (user, token) => {

 userLogin.value = {
    ...user,
    isKidSubscribed: isKidSubscribed.value,
    isLoggedIn: true,
    token
  }
    // save to localStorage
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    alert("Logged in successfully!!!")
    navigateTo("/")
  }

  // 🚪 LOGOUT
  const logout = () => {
    isLoggedIn.value = false
    mobileMenu.value = false
    isKidSubscribed.value = false
    userLogin.value = null

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigateTo("/")
  }

  // 🔄 RESTORE SESSION (IMPORTANT)
  const initAuth = () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    

    if (token && user) {
    isLoggedIn.value = true

    const userData = JSON.parse(user)

    userLogin.value = {
      ...userData,
      token,
      isLoggedIn: true,
      isKidSubscribed: isKidSubscribed.value
    }
  }
  
    }

  return {
    checkSubscription,
    userLogin,
    isLoggedIn,
    mobileMenu,
    isKidSubscribed,
    login,
    logout,
    initAuth
  }
})